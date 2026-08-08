import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSection } from "@/lib/admin/guard";
import { getAdminUser } from "@/lib/admin/users-data";
import { AdminHeader } from "@/components/admin/ui";
import { UserEditForm } from "@/components/admin/user-edit-form";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const access = await requireSection("users");
  const user = await getAdminUser(id);
  if (!user) notFound();

  return (
    <>
      <AdminHeader
        title="Edit admin"
        description={user.email}
        action={
          <Link href="/admin/users" className="text-sm text-sage hover:text-mist">
            ← Team
          </Link>
        }
      />
      <UserEditForm user={user} isSelf={user.id === access.userId} />
    </>
  );
}
