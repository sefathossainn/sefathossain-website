"use client";
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/env";

/** Browser client (anon key) — used by /admin auth UI. RLS-enforced. */
export function createSupabaseBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
