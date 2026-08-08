import "server-only";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ROLES, type Role } from "@/lib/admin/permissions";

export type AdminAccess = {
  ok: boolean;
  reason?: "unauthenticated" | "forbidden" | "disabled";
  role?: Role;
  userId?: string;
  username?: string | null;
  email?: string | null;
};

/**
 * Gate for /admin. Requires an authenticated session AND an active admin_users
 * row with a valid role. Returns the role so callers can apply per-section
 * permissions. Cached per request (dedupes repeat calls in a render).
 *
 * Fails OPEN as super_admin only if the admin_users table doesn't exist yet
 * (first-run bootstrap); any other error denies.
 */
export const checkAdminAccess = cache(async (): Promise<AdminAccess> => {
  const sb = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return { ok: false, reason: "unauthenticated" };

  const { data, error } = await sb
    .from("admin_users")
    .select("role, status, username, email")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    const missing = error.code === "PGRST205" || error.code === "42P01";
    if (missing) {
      return { ok: true, role: "super_admin", userId: user.id, email: user.email };
    }
    return { ok: false, reason: "forbidden", email: user.email };
  }
  if (!data) return { ok: false, reason: "forbidden", email: user.email };
  if (data.status === "disabled") {
    return { ok: false, reason: "disabled", email: user.email };
  }
  if (!ROLES.includes(data.role as Role)) {
    return { ok: false, reason: "forbidden", email: user.email };
  }

  return {
    ok: true,
    role: data.role as Role,
    userId: user.id,
    username: data.username,
    email: data.email ?? user.email,
  };
});
