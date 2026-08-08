import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type AdminUser = {
  id: string;
  email: string;
  username: string | null;
  role: string;
  status: string;
  created_at: string;
  created_by: string | null;
};

/** List every admin (service role — bypasses the "read own row" RLS). */
export async function listAdminUsers(): Promise<AdminUser[]> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("admin_users")
    .select("id,email,username,role,status,created_at,created_by")
    .order("created_at", { ascending: true });
  return (data ?? []) as AdminUser[];
}

/** A single admin by id (service role). */
export async function getAdminUser(id: string): Promise<AdminUser | null> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("admin_users")
    .select("id,email,username,role,status,created_at,created_by")
    .eq("id", id)
    .maybeSingle();
  return (data as AdminUser) ?? null;
}
