import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Admin reads — authenticated, so drafts are visible (RLS "admin all"). */

export async function adminList<T = Record<string, unknown>>(
  table: string,
  opts: { order?: string; ascending?: boolean } = {},
): Promise<T[]> {
  try {
    const sb = await createSupabaseServerClient();
    let q = sb.from(table).select("*");
    if (opts.order) q = q.order(opts.order, { ascending: opts.ascending ?? false });
    const { data } = await q;
    return (data ?? []) as T[];
  } catch {
    return [];
  }
}

export async function adminGet<T = Record<string, unknown>>(
  table: string,
  id: string,
): Promise<T | null> {
  try {
    const sb = await createSupabaseServerClient();
    const { data } = await sb.from(table).select("*").eq("id", id).maybeSingle();
    return (data as T) ?? null;
  } catch {
    return null;
  }
}

export async function adminCount(table: string): Promise<number> {
  try {
    const sb = await createSupabaseServerClient();
    const { count } = await sb
      .from(table)
      .select("id", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}
