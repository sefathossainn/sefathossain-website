import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, serviceRoleKey } from "@/lib/env";

/**
 * Service-role client — BYPASSES RLS. Server-only (route handlers, server
 * actions, admin, seed). Never import from a client component. The
 * `server-only` guard turns any client import into a build error.
 */
export function createSupabaseAdminClient() {
  return createClient(SUPABASE_URL, serviceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
