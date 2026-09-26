import { requireSection } from "@/lib/admin/guard";
import { getAnalytics } from "@/lib/admin/analytics";
import {
  AdminHeader,
  AdminCard,
  Stat,
  Table,
  Th,
  Td,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("en-US");

export default async function AnalyticsPage() {
  await requireSection("analytics");
  const a = await getAnalytics(30);

  if (!a.configured) {
    return (
      <>
        <AdminHeader
          title="Analytics"
          description="First-party, privacy-friendly visitor analytics."
        />
        <AdminCard>
          <p className="text-sm text-mist">
            The analytics table isn&apos;t set up yet.
          </p>
          <p className="mt-2 text-sm text-sage">
            Run the migration{" "}
            <code className="rounded bg-pine/60 px-1.5 py-0.5 font-mono text-xs text-mist">
              supabase/migrations/0005_page_views.sql
            </code>{" "}
            in your Supabase SQL editor, then reload this page. Visits are
            recorded from that point on.
          </p>
        </AdminCard>
      </>
    );
  }

  const maxDay = Math.max(1, ...a.byDay.map((d) => d.views));
  const totalDevices = Math.max(
    1,
    a.devices.reduce((s, d) => s + d.views, 0),
  );

  return (
    <>
      <AdminHeader
        title="Analytics"
        description={`Privacy-friendly first-party visitor data — last ${a.windowDays} days. No cookies, no IP stored.`}
      />

      {/* Totals */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Views (30d)" value={nf.format(a.totals.views)} />
        <Stat label="Unique visitors (30d)" value={nf.format(a.totals.visitors)} />
        <Stat label="Today" value={nf.format(a.totals.today)} />
        <Stat label="Last 7 days" value={nf.format(a.totals.last7)} />
      </div>

      {/* Views per day */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-mist">
          Views — last 14 days
        </h2>
        <AdminCard>
          {a.totals.views === 0 ? (
            <p className="text-sm text-slate">
              No visits recorded yet. Data appears here as people browse the
              live site.
            </p>
          ) : (
            <div className="flex h-40 items-end gap-1.5">
              {a.byDay.map((d) => (
                <div
                  key={d.date}
                  className="group flex flex-1 flex-col items-center justify-end gap-2"
                  title={`${d.date}: ${d.views} views`}
                >
                  <span className="text-[0.65rem] text-slate opacity-0 transition-opacity group-hover:opacity-100">
                    {d.views}
                  </span>
                  <div
                    className="w-full rounded-t bg-emerald/70 transition-colors group-hover:bg-emerald"
                    style={{ height: `${(d.views / maxDay) * 100}%`, minHeight: d.views ? "3px" : "0" }}
                  />
                  <span className="text-[0.6rem] text-slate">
                    {d.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </section>

      {/* Top pages */}
      <section className="mt-10">
        <h2 className="mb-3 font-display text-lg font-semibold text-mist">
          Top pages
        </h2>
        {a.topPages.length ? (
          <Table>
            <thead>
              <tr>
                <Th>Path</Th>
                <Th>Views</Th>
              </tr>
            </thead>
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

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Referrers */}
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">
            Top referrers
          </h2>
          {a.topReferrers.length ? (
            <Table>
              <thead>
                <tr>
                  <Th>Source</Th>
                  <Th>Views</Th>
                </tr>
              </thead>
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
            <p className="text-sm text-slate">
              No external referrers yet — most visits are direct.
            </p>
          )}
        </section>

        {/* Countries */}
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">
            Top countries
          </h2>
          {a.countries.length ? (
            <Table>
              <thead>
                <tr>
                  <Th>Country</Th>
                  <Th>Views</Th>
                </tr>
              </thead>
              <tbody>
                {a.countries.map((c) => (
                  <tr key={c.country}>
                    <Td className="text-mist">{c.country}</Td>
                    <Td>{nf.format(c.views)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-sm text-slate">No country data yet.</p>
          )}
        </section>
      </div>

      {/* Devices */}
      {a.devices.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">
            Devices
          </h2>
          <AdminCard>
            <div className="flex flex-wrap gap-6">
              {a.devices.map((d) => (
                <div key={d.device}>
                  <div className="font-display text-2xl font-semibold text-mist">
                    {Math.round((d.views / totalDevices) * 100)}%
                  </div>
                  <div className="kicker mt-1 text-slate">
                    {d.device} · {nf.format(d.views)}
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </section>
      )}

      <p className="mt-10 text-xs leading-relaxed text-slate">
        This is your own first-party data, stored in your Supabase — no cookies,
        no IP addresses, no third parties. For deeper reports (real-time,
        funnels, demographics), Google Analytics runs alongside once{" "}
        <code className="font-mono">NEXT_PUBLIC_GA_ID</code> is set.
      </p>
    </>
  );
}
