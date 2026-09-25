/** Centralised env access with friendly guards. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when public Supabase config is present (drives fallback behaviour). */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// ── Analytics & search-engine verification (all optional) ────────────────────
// Set these in the host's environment; each feature no-ops until its value is
// present, so local/dev builds stay clean.

/** GA4 measurement ID, e.g. "G-XXXXXXXXXX". Enables Google Analytics. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Google Search Console verification token (the `content` value only). */
export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION ?? "";

/** Bing Webmaster Tools verification token (`msvalidate.01` content value). */
export const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION ?? "";

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
