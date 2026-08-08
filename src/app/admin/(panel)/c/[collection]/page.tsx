import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/admin/collections";
import { adminList } from "@/lib/admin/data";
import { requireSection } from "@/lib/admin/guard";
import { can, sectionForCollection } from "@/lib/admin/permissions";
import { formatDate } from "@/lib/utils";
import {
  AdminHeader,
  Table,
  Th,
  Td,
  Pill,
  AdminLinkButton,
} from "@/components/admin/ui";

function cell(key: string, value: unknown) {
  if (key === "status") return <Pill status={value as string} />;
  if (key === "featured") return value ? "★" : "—";
  if (key === "published_at" || key === "created_at")
    return formatDate(value as string);
  return value == null || value === "" ? "—" : String(value);
}

export default async function CollectionListPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const cfg = getCollection(collection);
  const section = sectionForCollection(collection);
  if (!cfg || !section) notFound();

  const { role } = await requireSection(section);
  const canCreate = can(role!, section, "create");

  const rows = await adminList<Record<string, unknown>>(cfg.table, {
    order: cfg.order,
    ascending: cfg.ascending,
  });

  return (
    <>
      <AdminHeader
        title={cfg.label}
        description={`${rows.length} ${rows.length === 1 ? "item" : "items"}.`}
        action={
          canCreate ? (
            <AdminLinkButton href={`/admin/c/${collection}/new`} primary>
              New {cfg.singular.toLowerCase()}
            </AdminLinkButton>
          ) : undefined
        }
      />

      {rows.length ? (
        <Table>
          <thead>
            <tr>
              {cfg.list.map((c) => (
                <Th key={c.key}>{c.header}</Th>
              ))}
              <Th>{""}</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r.id)}>
                {cfg.list.map((c) => (
                  <Td key={c.key} className={c.key === "title" || c.key === "question" || c.key === "author" ? "text-mist" : ""}>
                    {cell(c.key, r[c.key])}
                  </Td>
                ))}
                <Td className="text-right">
                  <Link
                    href={`/admin/c/${collection}/${r.id}`}
                    className="text-emerald hover:underline"
                  >
                    Edit
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-sm text-slate">
          Nothing here yet — create your first {cfg.singular.toLowerCase()}.
        </p>
      )}
    </>
  );
}
