"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signOut() {
  const sb = await createSupabaseServerClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
