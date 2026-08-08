/** Centralised env access with friendly guards. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when public Supabase config is present (drives fallback behaviour). */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Server-only: the service-role key. Throws if read where it shouldn't exist. */
export function serviceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. It is required for server-side " +
        "writes/admin and must never be exposed to the client.",
    );
  }
  return key;
}
