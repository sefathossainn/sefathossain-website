import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/env";

/**
 * Cookieless anon client for PUBLIC reads. Because it touches no request
 * cookies, pages that read through it stay statically gener-able (ISR) rather
 * than being forced dynamic — better for SEO and TTFB. RLS still applies: only
 * published rows are returned. Admin/preview reads use the cookie client.
 */
export function createSupabasePublicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
