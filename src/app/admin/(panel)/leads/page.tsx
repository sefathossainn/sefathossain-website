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

type Lead = {
  id: string;
  name: string;
  email: string;
  need?: string;
  message: string;
  source_page?: string;
  created_at: string;
};

export default async function LeadsPage() {
  await requireSection("leads");
  const leads = await adminList<Lead>("leads", { order: "created_at" });

  return (
    <>
      <AdminHeader
        title="Leads"
        description={`${leads.length} enquir${leads.length === 1 ? "y" : "ies"} from the contact form.`}
        action={
          <AdminLinkButton href="/admin/export?type=leads">
            Export CSV
          </AdminLinkButton>
        }
      />

      {leads.length ? (
        <Table>
          <thead>
            <tr>
              <Th>Received</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Need</Th>
              <Th>Message</Th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="align-top">
                <Td className="whitespace-nowrap">{formatDate(l.created_at)}</Td>
                <Td className="text-mist">{l.name}</Td>
                <Td>
                  <a
                    href={`mailto:${l.email}`}
                    className="text-emerald hover:underline"
                  >
                    {l.email}
                  </a>
                </Td>
                <Td className="whitespace-nowrap">{l.need ?? "—"}</Td>
                <Td className="max-w-md text-sage">{l.message}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-sm text-slate">
          No leads yet — contact-form submissions will appear here.
        </p>
      )}
    </>
  );
}
