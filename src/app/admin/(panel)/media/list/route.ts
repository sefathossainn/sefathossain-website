import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAdminAccess } from "@/lib/admin/access";
import { canAccessSection } from "@/lib/admin/permissions";

export async function GET() {
  const access = await checkAdminAccess();
  if (!access.ok || !access.role || !canAccessSection(access.role, "media")) {
    return NextResponse.json({ items: [] }, { status: 401 });
  }
  const sb = await createSupabaseServerClient();

  const { data } = await sb
    .from("media")
    .select("id,url,alt")
    .order("created_at", { ascending: false });
  return NextResponse.json({ items: data ?? [] });
}
