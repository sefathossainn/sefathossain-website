import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Row = {
  path: string;
  referrer: string | null;
  country: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  visitor_id: string | null;
  visitor_hash: string | null;
  is_entry: boolean | null;
  created_at: string;
};

export type Kpi = { value: number; prev: number };

export type AnalyticsSummary = {
  configured: boolean;
  range: number;
  kpis: { views: Kpi; visitors: Kpi; sessions: Kpi; conversions: Kpi };
  today: number;
  convRate: number;
  newVisitors: number;
  returningVisitors: number;
  byDay: { date: string; views: number }[];
  byHour: { hour: number; views: number }[];
  byWeekday: { day: string; views: number }[];
  topPages: { path: string; views: number }[];
  entryPages: { path: string; views: number }[];
  sources: { label: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  campaigns: { campaign: string; source: string; views: number }[];
  browsers: { browser: string; views: number }[];
  os: { os: string; views: number }[];
  devices: { device: string; views: number }[];
  countries: { country: string; views: number }[];
};

const DAY = 86_400_000;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SEARCH = /google|bing|yahoo|duckduckgo|ecosia|baidu|yandex|brave/i;
const SOCIAL =
  /facebook|fb\.|instagram|twitter|x\.com|t\.co|linkedin|lnkd\.in|youtube|reddit|pinterest|tiktok|threads|whatsapp|telegram/i;

function sourceLabel(referrer: string | null): string {
  if (!referrer) return "Direct";
  if (SEARCH.test(referrer)) return "Search";
  if (SOCIAL.test(referrer)) return "Social";
  return "Referral";
}

function tally<T extends string>(
  rows: Row[],
  pick: (r: Row) => T | null | undefined,
): { key: T; views: number }[] {
  const m = new Map<T, number>();
  for (const r of rows) {
    const k = pick(r);
    if (!k) continue;
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()]
    .map(([key, views]) => ({ key, views }))
    .sort((a, b) => b.views - a.views);
}

const visitorKey = (r: Row) => r.visitor_id || r.visitor_hash || null;

async function countBetween(
  sb: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  table: string,
  sinceISO: string,
  untilISO?: string,
): Promise<number> {
  try {
    let q = sb
      .from(table)
      .select("id", { count: "exact", head: true })
      .gte("created_at", sinceISO);
    if (untilISO) q = q.lt("created_at", untilISO);
    const { count } = await q;
    return count ?? 0;
  } catch {
    return 0;
  }
}

/** Deep aggregation of the last `range` days, with previous-period deltas. */
export async function getAnalytics(range = 30): Promise<AnalyticsSummary> {
  const empty: AnalyticsSummary = {
    configured: true,
    range,
    kpis: {
      views: { value: 0, prev: 0 },
      visitors: { value: 0, prev: 0 },
      sessions: { value: 0, prev: 0 },
      conversions: { value: 0, prev: 0 },
    },
    today: 0,
    convRate: 0,
    newVisitors: 0,
    returningVisitors: 0,
    byDay: [],
    byHour: [],
    byWeekday: [],
    topPages: [],
    entryPages: [],
    sources: [],
    topReferrers: [],
    campaigns: [],
    browsers: [],
    os: [],
    devices: [],
    countries: [],
  };

  const now = Date.now();
  const curStart = new Date(now - range * DAY).toISOString();
  const prevStart = new Date(now - 2 * range * DAY).toISOString();

  let all: Row[] = [];
  let sb: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    sb = await createSupabaseServerClient();
    const { data, error } = await sb
      .from("page_views")
      .select(
        "path,referrer,country,device,browser,os,utm_source,utm_medium,utm_campaign,visitor_id,visitor_hash,is_entry,created_at",
      )
      .gte("created_at", prevStart)
      .order("created_at", { ascending: false })
      .limit(200_000);
    if (error) return { ...empty, configured: false };
    all = (data ?? []) as Row[];
  } catch {
    return { ...empty, configured: false };
  }

  const curThreshold = now - range * DAY;
  const cur = all.filter((r) => new Date(r.created_at).getTime() >= curThreshold);
  const prev = all.filter(
    (r) => new Date(r.created_at).getTime() < curThreshold,
  );

  // Conversions from real lead + audit-request tables.
  const [curLeads, curAudits, prevLeads, prevAudits] = await Promise.all([
    countBetween(sb, "leads", curStart),
    countBetween(sb, "audit_requests", curStart),
    countBetween(sb, "leads", prevStart, curStart),
    countBetween(sb, "audit_requests", prevStart, curStart),
  ]);
  const conversions = curLeads + curAudits;
  const prevConversions = prevLeads + prevAudits;

  const uniq = (rows: Row[]) =>
    new Set(rows.map(visitorKey).filter(Boolean)).size;
  const sessions = (rows: Row[]) => rows.filter((r) => r.is_entry).length;

  const startOfToday = new Date(new Date().toISOString().slice(0, 10)).getTime();
  const today = cur.filter(
    (r) => new Date(r.created_at).getTime() >= startOfToday,
  ).length;

  // New vs returning: a visitor seen on 2+ distinct days is "returning".
  const daysSeen = new Map<string, Set<string>>();
  for (const r of cur) {
    const k = visitorKey(r);
    if (!k) continue;
    let set = daysSeen.get(k);
    if (!set) {
      set = new Set();
      daysSeen.set(k, set);
    }
    set.add(r.created_at.slice(0, 10));
  }
  let returningVisitors = 0;
  for (const set of daysSeen.values()) if (set.size >= 2) returningVisitors++;
  const totalVisitors = daysSeen.size;
  const newVisitors = totalVisitors - returningVisitors;

  // Views per day across the range (zero-filled).
  const byDay: { date: string; views: number }[] = [];
  for (let i = range - 1; i >= 0; i--) {
    byDay.push({ date: new Date(now - i * DAY).toISOString().slice(0, 10), views: 0 });
  }
  const dayIdx = new Map(byDay.map((d, i) => [d.date, i]));
  for (const r of cur) {
    const idx = dayIdx.get(r.created_at.slice(0, 10));
    if (idx !== undefined) byDay[idx].views++;
  }

  // Hour-of-day (UTC) and weekday.
  const byHour = Array.from({ length: 24 }, (_, hour) => ({ hour, views: 0 }));
  const weekday = Array.from({ length: 7 }, () => 0);
  for (const r of cur) {
    const d = new Date(r.created_at);
    byHour[d.getUTCHours()].views++;
    weekday[d.getUTCDay()]++;
  }
  const byWeekday = weekday.map((views, i) => ({ day: WEEKDAYS[i], views }));

  const campaignRows = cur.filter((r) => r.utm_source || r.utm_campaign);
  const campaignMap = new Map<string, { source: string; views: number }>();
  for (const r of campaignRows) {
    const campaign = r.utm_campaign || "(no campaign)";
    const source = r.utm_source || r.utm_medium || "—";
    const key = `${campaign}|${source}`;
    const e = campaignMap.get(key) ?? { source, views: 0 };
    e.views++;
    campaignMap.set(key, e);
  }
  const campaigns = [...campaignMap.entries()]
    .map(([k, v]) => ({ campaign: k.split("|")[0], source: v.source, views: v.views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return {
    configured: true,
    range,
    kpis: {
      views: { value: cur.length, prev: prev.length },
      visitors: { value: uniq(cur), prev: uniq(prev) },
      sessions: { value: sessions(cur), prev: sessions(prev) },
      conversions: { value: conversions, prev: prevConversions },
    },
    today,
    convRate: totalVisitors ? (conversions / totalVisitors) * 100 : 0,
    newVisitors,
    returningVisitors,
    byDay,
    byHour,
    byWeekday,
    topPages: tally(cur, (r) => r.path)
      .slice(0, 10)
      .map(({ key, views }) => ({ path: key, views })),
    entryPages: tally(cur.filter((r) => r.is_entry), (r) => r.path)
      .slice(0, 8)
      .map(({ key, views }) => ({ path: key, views })),
    sources: tally(cur, (r) => sourceLabel(r.referrer)).map(({ key, views }) => ({
      label: key,
      views,
    })),
    topReferrers: tally(cur, (r) => (r.referrer ? r.referrer : null))
      .slice(0, 8)
      .map(({ key, views }) => ({ referrer: key, views })),
    campaigns,
    browsers: tally(cur, (r) => r.browser)
      .slice(0, 6)
      .map(({ key, views }) => ({ browser: key, views })),
    os: tally(cur, (r) => r.os)
      .slice(0, 6)
      .map(({ key, views }) => ({ os: key, views })),
    devices: tally(cur, (r) => r.device).map(({ key, views }) => ({
      device: key,
      views,
    })),
    countries: tally(cur, (r) => r.country)
      .slice(0, 8)
      .map(({ key, views }) => ({ country: key, views })),
  };
}
