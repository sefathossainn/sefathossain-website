import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Append a row to the activity log. Never throws — logging can't break an action. */
export async function logActivity(entry: {
  action: string;
  target_table?: string | null;
  target_id?: string | null;
  detail?: string | null;
}): Promise<void> {
  try {
    const sb = await createSupabaseServerClient();
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) return;
    await sb.from("activity_log").insert({
      actor_id: user.id,
      actor_email: user.email ?? null,
      action: entry.action,
      target_table: entry.target_table ?? null,
      target_id: entry.target_id ?? null,
      detail: entry.detail ?? null,
    });
  } catch {
    /* swallow */
  }
}
