import Link from "next/link";
import { requireSection } from "@/lib/admin/guard";
import { AdminHeader } from "@/components/admin/ui";
import { InviteForm } from "@/components/admin/invite-form";

export default async function NewUserPage() {
  await requireSection("users");
  return (
    <>
      <AdminHeader
        title="Add admin"
        description="They set their own password via a one-time link — no password is ever typed or shared."
        action={
          <Link href="/admin/users" className="text-sm text-sage hover:text-mist">
            ← Team
          </Link>
        }
      />
      <InviteForm />
    </>
  );
}
