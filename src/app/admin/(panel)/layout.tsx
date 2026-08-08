import { redirect } from "next/navigation";
import { checkAdminAccess } from "@/lib/admin/access";
import { AdminSidebar } from "@/components/admin/sidebar";
import { signOut } from "@/app/admin/(panel)/actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await checkAdminAccess();
  if (access.reason === "unauthenticated") redirect("/admin/login");
  if (!access.ok || !access.role) {
    return <Unauthorized reason={access.reason} email={access.email} />;
  }

  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr] md:grid-cols-[260px_1fr] md:grid-rows-1">
      <AdminSidebar
        identity={{
          email: access.email,
          username: access.username,
          role: access.role,
        }}
      />
      <div className="min-w-0">
        <main className="mx-auto max-w-5xl p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}

function Unauthorized({
  reason,
  email,
}: {
  reason?: "unauthenticated" | "forbidden" | "disabled";
  email?: string | null;
}) {
  const disabled = reason === "disabled";
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div>
        <p className="kicker mb-3 justify-center">
          {disabled ? "Account disabled" : "Access denied"}
        </p>
        <h1 className="font-display text-2xl font-semibold text-mist">
          {disabled ? "This account has been disabled" : "Not authorized"}
        </h1>
        <p className="mt-2 max-w-sm text-sm text-sage">
          {email ? `${email} ` : "This account "}
          {disabled
            ? "no longer has access. Contact the site owner if you think this is a mistake."
            : "isn't a registered admin. Contact the site owner."}
        </p>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-full border border-line px-5 py-2.5 text-sm text-mist transition-colors hover:border-evergreen"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
