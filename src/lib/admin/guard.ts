import "server-only";
import { redirect } from "next/navigation";
import { checkAdminAccess, type AdminAccess } from "@/lib/admin/access";
import { canAccessSection, type Section } from "@/lib/admin/permissions";

/**
 * Page-level guard. The (panel) layout already gates auth + active-admin and
 * renders an "unauthorized" view for bad access, so by the time a page renders
 * `access.ok` is true; this adds the per-section check and sends disallowed
 * roles back to the dashboard (which every role can see).
 */
export async function requireSection(section: Section): Promise<AdminAccess> {
  const access = await checkAdminAccess();
  if (!access.ok || !access.role) redirect("/admin");
  if (!canAccessSection(access.role, section)) redirect("/admin");
  return access;
}
