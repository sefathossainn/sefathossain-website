import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/env";

/**
 * Cookie-aware server client using the ANON key. RLS is enforced: anon context
 * sees published rows only; if the admin is signed in, the same client reads
 * drafts (server-side preview). Use for all Server Component reads.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — safe to ignore; middleware
          // refreshes the session.
        }
      },
    },
  });
}
