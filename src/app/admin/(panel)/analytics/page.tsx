import Link from "next/link";
import { requireSection } from "@/lib/admin/guard";
import { getAnalytics, type Kpi } from "@/lib/admin/analytics";
import { AdminHeader, AdminCard, Table, Th, Td } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("en-US");
const RANGES = [7, 30, 90] as const;

function KpiTile({ label, kpi, suffix }: { label: string; kpi: Kpi; suffix?: string }) {
  const { value, prev } = kpi;
  const delta = prev > 0 ? ((value - prev) / prev) * 100 : value > 0 ? 100 : 0;
  const up = value >= prev;
  const show = prev > 0 || value > 0;
  return (
    <div className="panel p-5">
      <div className="font-display text-3xl font-semibold text-mist">
        {nf.format(value)}
        {suffix}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="kicker text-slate">{label}</span>
        {show && (
          <span
            className={cn(
              "font-mono text-[0.7rem]",
              up ? "text-signal" : "text-[#e88c7d]",
            )}
          >
            {up ? "▲" : "▼"} {Math.abs(delta).toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  );
}

/** Vertical bar chart (equal-width bars, zero-filled series). */
function BarChart({
  data,
  height = "h-40",
}: {
  data: { label: string; views: number }[];
  height?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.views));
  return (
    <div className={cn("flex items-end gap-1", height)}>
      {data.map((d, i) => (
        <div
          key={i}
          className="group flex flex-1 flex-col items-center justify-end gap-1.5"
          title={`${d.label}: ${d.views}`}
        >
          <span className="text-[0.6rem] text-slate opacity-0 transition-opacity group-hover:opacity-100">
            {d.views}
          </span>
          <div
            className="w-full rounded-t bg-emerald/70 transition-colors group-hover:bg-emerald"
            style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? "3px" : "0" }}
          />
          <span className="text-[0.55rem] text-slate">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Horizontal ranked distribution (label + bar + count). */
function DistBar({
  rows,
}: {
  rows: { label: string; views: number }[];
}) {
  const total = Math.max(1, rows.reduce((s, r) => s + r.views, 0));
  if (!rows.length) return <p className="text-sm text-slate">No data yet.</p>;
  return (
    <div className="grid gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="truncate text-mist">{r.label}</span>
            <span className="ml-3 shrink-0 text-slate">
              {nf.format(r.views)} · {Math.round((r.views / total) * 100)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-pine/50">
            <div
              className="h-full rounded-full bg-emerald/70"
              style={{ width: `${(r.views / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  await requireSection("analytics");
  const sp = await searchParams;
  const range = RANGES.includes(Number(sp.range) as (typeof RANGES)[number])
    ? Number(sp.range)
    : 30;
  const a = await getAnalytics(range);

  if (!a.configured) {
    return (
      <>
        <AdminHeader title="Analytics" description="First-party, privacy-friendly visitor analytics." />
        <AdminCard>
          <p className="text-sm text-mist">The analytics table isn&apos;t set up yet.</p>
          <p className="mt-2 text-sm text-sage">
            Run the migration{" "}
            <code className="rounded bg-pine/60 px-1.5 py-0.5 font-mono text-xs text-mist">
              supabase/migrations/0006_page_views_deep.sql
            </code>{" "}
            in your Supabase SQL editor, then reload. Visits are recorded from that point on.
          </p>
        </AdminCard>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title="Analytics"
        description="Privacy-friendly first-party data — no cookies, no IP stored. Google Analytics runs alongside once NEXT_PUBLIC_GA_ID is set."
        action={
          <div className="flex gap-1 rounded-full border border-line p-1">
            {RANGES.map((r) => (
              <Link
                key={r}
                href={`/admin/analytics?range=${r}`}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  r === range ? "bg-pine text-mist" : "text-sage hover:text-mist",
                )}
              >
                {r}d
              </Link>
            ))}
          </div>
        }
      />

      {/* KPIs vs previous period */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label={`Views · ${range}d`} kpi={a.kpis.views} />
        <KpiTile label="Unique visitors" kpi={a.kpis.visitors} />
        <KpiTile label="Sessions" kpi={a.kpis.sessions} />
        <KpiTile label="Conversions" kpi={a.kpis.conversions} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm text-slate">
        <span>
          Today: <span className="text-mist">{nf.format(a.today)}</span> views
        </span>
        <span>
          Conversion rate:{" "}
          <span className="text-mist">{a.convRate.toFixed(1)}%</span>
        </span>
        <span>
          New: <span className="text-mist">{nf.format(a.newVisitors)}</span> ·
          Returning:{" "}
          <span className="text-mist">{nf.format(a.returningVisitors)}</span>
        </span>
        <span className="text-slate/70">
          Conversions = contact + audit-request submissions
        </span>
      </div>

      {/* Views over time */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-mist">
          Views — last {range} days
        </h2>
        <AdminCard>
          {a.kpis.views.value === 0 ? (
            <p className="text-sm text-slate">
              No visits recorded yet in this window.
            </p>
          ) : (
            <BarChart
              data={a.byDay.map((d) => ({ label: d.date.slice(5), views: d.views }))}
            />
          )}
        </AdminCard>
      </section>

      {/* Sources + Top pages */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">Traffic sources</h2>
          <AdminCard>
            <DistBar rows={a.sources.map((s) => ({ label: s.label, views: s.views }))} />
          </AdminCard>
        </section>
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">Top pages</h2>
          {a.topPages.length ? (
            <Table>
              <thead><tr><Th>Path</Th><Th>Views</Th></tr></thead>
              <tbody>
                {a.topPages.map((p) => (
                  <tr key={p.path}>
                    <Td className="text-mist">{p.path}</Td>
                    <Td>{nf.format(p.views)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-sm text-slate">No page views yet.</p>
          )}
        </section>
      </div>

      {/* Entry pages + Referrers */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">Entry pages</h2>
          {a.entryPages.length ? (
            <Table>
              <thead><tr><Th>Landing path</Th><Th>Sessions</Th></tr></thead>
              <tbody>
                {a.entryPages.map((p) => (
                  <tr key={p.path}>
                    <Td className="text-mist">{p.path}</Td>
                    <Td>{nf.format(p.views)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-sm text-slate">No sessions yet.</p>
          )}
        </section>
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">Top referrers</h2>
          {a.topReferrers.length ? (
            <Table>
              <thead><tr><Th>Source</Th><Th>Views</Th></tr></thead>
              <tbody>
                {a.topReferrers.map((r) => (
                  <tr key={r.referrer}>
                    <Td className="text-mist">{r.referrer}</Td>
                    <Td>{nf.format(r.views)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-sm text-slate">Mostly direct traffic so far.</p>
          )}
        </section>
      </div>

      {/* Campaigns (only when UTM data exists) */}
      {a.campaigns.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">Campaigns (UTM)</h2>
          <Table>
            <thead><tr><Th>Campaign</Th><Th>Source</Th><Th>Views</Th></tr></thead>
            <tbody>
              {a.campaigns.map((c) => (
                <tr key={`${c.campaign}-${c.source}`}>
                  <Td className="text-mist">{c.campaign}</Td>
                  <Td>{c.source}</Td>
                  <Td>{nf.format(c.views)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      )}

      {/* When visitors come */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-mist">By hour (UTC)</h2>
          <AdminCard>
            <BarChart
              height="h-28"
              data={a.byHour.map((h) => ({
                label: h.hour % 6 === 0 ? String(h.hour) : "",
                views: h.views,
              }))}
            />
          </AdminCard>
        </section>
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-mist">By weekday</h2>
          <AdminCard>
            <BarChart
              height="h-28"
              data={a.byWeekday.map((d) => ({ label: d.day, views: d.views }))}
            />
          </AdminCard>
        </section>
      </div>

      {/* Tech + geo */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <h2 className="mb-3 font-display text-base font-semibold text-mist">Devices</h2>
          <AdminCard><DistBar rows={a.devices.map((d) => ({ label: d.device, views: d.views }))} /></AdminCard>
        </section>
        <section>
          <h2 className="mb-3 font-display text-base font-semibold text-mist">Browsers</h2>
          <AdminCard><DistBar rows={a.browsers.map((b) => ({ label: b.browser, views: b.views }))} /></AdminCard>
        </section>
        <section>
          <h2 className="mb-3 font-display text-base font-semibold text-mist">OS</h2>
          <AdminCard><DistBar rows={a.os.map((o) => ({ label: o.os, views: o.views }))} /></AdminCard>
        </section>
        <section>
          <h2 className="mb-3 font-display text-base font-semibold text-mist">Countries</h2>
          <AdminCard><DistBar rows={a.countries.map((c) => ({ label: c.country, views: c.views }))} /></AdminCard>
        </section>
      </div>
    </>
  );
}
