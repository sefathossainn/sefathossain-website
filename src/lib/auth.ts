import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** The signed-in admin user, or null. Reads the session from cookies. */
export async function getSessionUser() {
  try {
    const sb = await createSupabaseServerClient();
    const {
      data: { user },
    } = await sb.auth.getUser();
    return user;
  } catch {
    return null;
  }
}
