import { notFound, redirect } from "next/navigation";
import { getCollection } from "@/lib/admin/collections";
import { adminGet, adminList } from "@/lib/admin/data";
import { requireSection } from "@/lib/admin/guard";
import { can, sectionForCollection } from "@/lib/admin/permissions";
import { AdminHeader } from "@/components/admin/ui";
import { RecordForm } from "@/components/admin/record-form";
import { absoluteUrl } from "@/lib/utils";

export default async function CollectionEditPage({
  params,
}: {
  params: Promise<{ collection: string; id: string }>;
}) {
  const { collection, id } = await params;
  const cfg = getCollection(collection);
  const section = sectionForCollection(collection);
  if (!cfg || !section) notFound();

  const { role } = await requireSection(section);
  const isNew = id === "new";
  // A role that can't create shouldn't open the "new" form.
  if (isNew && !can(role!, section, "create")) redirect(`/admin/c/${collection}`);
  const canDelete = can(role!, section, "delete");
  const record = isNew
    ? {}
    : ((await adminGet<Record<string, unknown>>(cfg.table, id)) ?? {});

  let categoryOptions: { value: string; label: string }[] | undefined;
  if (cfg.categorySelect) {
    const cats = await adminList<{ id: string; name: string }>("categories", {
      order: "name",
      ascending: true,
    });
    categoryOptions = cats.map((c) => ({ value: c.id, label: c.name }));
  }

  return (
    <>
      <AdminHeader
        title={isNew ? `New ${cfg.singular.toLowerCase()}` : `Edit ${cfg.singular.toLowerCase()}`}
        description={cfg.label}
      />
      <RecordForm
        table={cfg.table}
        listHref={`/admin/c/${collection}`}
        fields={cfg.fields}
        record={record}
        categoryOptions={categoryOptions}
        canDelete={canDelete}
        seoContext={cfg.seo}
        siteUrl={absoluteUrl("")}
      />
    </>
  );
}
