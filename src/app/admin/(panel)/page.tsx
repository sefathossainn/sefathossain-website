import Link from "next/link";
import { adminList, adminCount } from "@/lib/admin/data";
import { requireSection } from "@/lib/admin/guard";
import { canAccessSection, isSuperAdmin, type Role } from "@/lib/admin/permissions";
import { formatDate } from "@/lib/utils";
import { AdminHeader, Stat, Table, Th, Td, Pill } from "@/components/admin/ui";

type Lead = { id: string; name: string; email: string; need?: string; created_at: string };
type Audit = {
  id: string; name: string; email: string; website_url: string; status?: string; created_at: string;
};
type Activity = {
  id: string; actor_email?: string; action: string; target_table?: string; detail?: string; created_at: string;
};

export default async function AdminDashboard() {
  const { role } = await requireSection("dashboard");
  const r = role as Role;
  const showInbox = canAccessSection(r, "leads") || canAccessSection(r, "audit");

  const [leads, audits, leadCount, auditCount, postCount, caseCount, activity] =
    await Promise.all([
      canAccessSection(r, "leads") ? adminList<Lead>("leads", { order: "created_at" }) : Promise.resolve([]),
      canAccessSection(r, "audit") ? adminList<Audit>("audit_requests", { order: "created_at" }) : Promise.resolve([]),
      canAccessSection(r, "leads") ? adminCount("leads") : Promise.resolve(0),
      canAccessSection(r, "audit") ? adminCount("audit_requests") : Promise.resolve(0),
      canAccessSection(r, "blog") ? adminCount("blog_posts") : Promise.resolve(0),
      canAccessSection(r, "case-studies") ? adminCount("case_studies") : Promise.resolve(0),
      isSuperAdmin(r) ? adminList<Activity>("activity_log", { order: "created_at" }) : Promise.resolve([]),
    ]);

  const stats = [
    canAccessSection(r, "leads") && { label: "Leads", value: leadCount },
    canAccessSection(r, "audit") && { label: "Audit requests", value: auditCount },
    canAccessSection(r, "blog") && { label: "Blog posts", value: postCount },
    canAccessSection(r, "case-studies") && { label: "Case studies", value: caseCount },
  ].filter(Boolean) as { label: string; value: number }[];

  return (
    <>
      <AdminHeader title="Dashboard" description="Recent activity and content at a glance." />

      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      )}

      {showInbox && canAccessSection(r, "leads") && (
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-mist">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm text-emerald">View all →</Link>
          </div>
          {leads.length ? (
            <Table>
              <thead><tr><Th>Name</Th><Th>Email</Th><Th>Need</Th><Th>Received</Th></tr></thead>
              <tbody>
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id}>
                    <Td className="text-mist">{l.name}</Td>
                    <Td>{l.email}</Td>
                    <Td>{l.need ?? "—"}</Td>
                    <Td>{formatDate(l.created_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-sm text-slate">No leads yet.</p>
          )}
        </section>
      )}

      {canAccessSection(r, "audit") && (
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-mist">Recent audit requests</h2>
            <Link href="/admin/audit" className="text-sm text-emerald">View all →</Link>
          </div>
          {audits.length ? (
            <Table>
              <thead><tr><Th>Name</Th><Th>Website</Th><Th>Status</Th><Th>Received</Th></tr></thead>
              <tbody>
                {audits.slice(0, 5).map((a) => (
                  <tr key={a.id}>
                    <Td className="text-mist">{a.name}</Td>
                    <Td>{a.website_url}</Td>
                    <Td><Pill status={a.status} /></Td>
                    <Td>{formatDate(a.created_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-sm text-slate">No audit requests yet.</p>
          )}
        </section>
      )}

      {isSuperAdmin(r) && activity.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-lg font-semibold text-mist">Recent activity</h2>
          <Table>
            <thead><tr><Th>When</Th><Th>Who</Th><Th>Action</Th><Th>Target</Th></tr></thead>
            <tbody>
              {activity.slice(0, 12).map((a) => (
                <tr key={a.id}>
                  <Td className="whitespace-nowrap">{formatDate(a.created_at)}</Td>
                  <Td>{a.actor_email ?? "—"}</Td>
                  <Td className="text-mist">{a.action}</Td>
                  <Td>{[a.target_table, a.detail].filter(Boolean).join(" · ") || "—"}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      )}
    </>
  );
}
