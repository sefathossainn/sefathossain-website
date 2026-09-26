import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Row = {
  path: string;
  referrer: string | null;
  country: string | null;
  device: string | null;
  visitor_hash: string | null;
  created_at: string;
};

export type AnalyticsSummary = {
  configured: boolean;
  totals: { views: number; visitors: number; today: number; last7: number };
  byDay: { date: string; views: number }[];
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  devices: { device: string; views: number }[];
  countries: { country: string; views: number }[];
  windowDays: number;
};

const DAY = 86_400_000;

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

/** Aggregate the last `windowDays` of page views for the admin dashboard. */
export async function getAnalytics(windowDays = 30): Promise<AnalyticsSummary> {
  const empty: AnalyticsSummary = {
    configured: true,
    totals: { views: 0, visitors: 0, today: 0, last7: 0 },
    byDay: [],
    topPages: [],
    topReferrers: [],
    devices: [],
    countries: [],
    windowDays,
  };

  let rows: Row[] = [];
  try {
    const sb = await createSupabaseServerClient();
    const since = new Date(Date.now() - windowDays * DAY).toISOString();
    const { data, error } = await sb
      .from("page_views")
      .select("path,referrer,country,device,visitor_hash,created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(100_000);
    // Table not created yet → treat as "not configured" so the page can explain.
    if (error) return { ...empty, configured: false };
    rows = (data ?? []) as Row[];
  } catch {
    return { ...empty, configured: false };
  }

  const now = Date.now();
  const startOfToday = new Date(new Date().toISOString().slice(0, 10)).getTime();
  const visitors = new Set(rows.map((r) => r.visitor_hash).filter(Boolean));

  const today = rows.filter(
    (r) => new Date(r.created_at).getTime() >= startOfToday,
  ).length;
  const last7 = rows.filter(
    (r) => new Date(r.created_at).getTime() >= now - 7 * DAY,
  ).length;

  // Views per day for the last 14 days (oldest → newest), zero-filled.
  const days = 14;
  const byDay: { date: string; views: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * DAY).toISOString().slice(0, 10);
    byDay.push({ date: d, views: 0 });
  }
  const dayIndex = new Map(byDay.map((d, i) => [d.date, i]));
  for (const r of rows) {
    const d = r.created_at.slice(0, 10);
    const idx = dayIndex.get(d);
    if (idx !== undefined) byDay[idx].views++;
  }

  return {
    configured: true,
    totals: { views: rows.length, visitors: visitors.size, today, last7 },
    byDay,
    topPages: tally(rows, (r) => r.path)
      .slice(0, 10)
      .map(({ key, views }) => ({ path: key, views })),
    topReferrers: tally(rows, (r) => (r.referrer ? r.referrer : null))
      .slice(0, 8)
      .map(({ key, views }) => ({ referrer: key, views })),
    devices: tally(rows, (r) => r.device)
      .map(({ key, views }) => ({ device: key, views })),
    countries: tally(rows, (r) => r.country)
      .slice(0, 8)
      .map(({ key, views }) => ({ country: key, views })),
    windowDays,
  };
}
