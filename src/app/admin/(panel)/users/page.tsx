import { requireSection } from "@/lib/admin/guard";
import { listAdminUsers } from "@/lib/admin/users-data";
import { AdminHeader, AdminLinkButton } from "@/components/admin/ui";
import { UsersTable } from "@/components/admin/users-table";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const access = await requireSection("users");
  const users = await listAdminUsers();

  return (
    <>
      <AdminHeader
        title="Team"
        description="Admins and their roles. Only super admins see this."
        action={
          <AdminLinkButton href="/admin/users/new" primary>
            Add admin
          </AdminLinkButton>
        }
      />
      <UsersTable users={users} currentUserId={access.userId ?? ""} />
    </>
  );
}
