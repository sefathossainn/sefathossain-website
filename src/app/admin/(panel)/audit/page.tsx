import { adminList } from "@/lib/admin/data";
import { requireSection } from "@/lib/admin/guard";
import { formatDate } from "@/lib/utils";
import {
  AdminHeader,
  Table,
  Th,
  Td,
  AdminLinkButton,
} from "@/components/admin/ui";
import { StatusSelect } from "@/components/admin/status-select";

type Audit = {
  id: string;
  name: string;
  email: string;
  website_url: string;
  status?: string;
  created_at: string;
};

const STATUSES = ["new", "reviewing", "sent", "closed"];

export default async function AuditPage() {
  await requireSection("audit");
  const rows = await adminList<Audit>("audit_requests", { order: "created_at" });

  return (
    <>
      <AdminHeader
        title="Audit requests"
        description={`${rows.length} security-audit request${rows.length === 1 ? "" : "s"}.`}
        action={
          <AdminLinkButton href="/admin/export?type=audit">
            Export CSV
          </AdminLinkButton>
        }
      />

      {rows.length ? (
        <Table>
          <thead>
            <tr>
              <Th>Received</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Website</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <Td className="whitespace-nowrap">{formatDate(a.created_at)}</Td>
                <Td className="text-mist">{a.name}</Td>
                <Td>
                  <a
                    href={`mailto:${a.email}`}
                    className="text-emerald hover:underline"
                  >
                    {a.email}
                  </a>
                </Td>
                <Td>
                  <a
                    href={a.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sage hover:text-mist"
                  >
                    {a.website_url}
                  </a>
                </Td>
                <Td>
                  <StatusSelect
                    table="audit_requests"
                    id={a.id}
                    value={a.status ?? "new"}
                    options={STATUSES}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-sm text-slate">
          No audit requests yet — lead-magnet submissions will appear here.
        </p>
      )}
    </>
  );
}
