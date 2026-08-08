import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAdminAccess } from "@/lib/admin/access";
import { canAccessSection } from "@/lib/admin/permissions";
import { toCsv } from "@/lib/admin/csv";

const CONFIG: Record<
  string,
  { table: string; columns: string[]; section: "leads" | "audit" }
> = {
  leads: {
    table: "leads",
    columns: ["created_at", "name", "email", "need", "message", "source_page"],
    section: "leads",
  },
  audit: {
    table: "audit_requests",
    columns: ["created_at", "name", "email", "website_url", "status"],
    section: "audit",
  },
};

export async function GET(req: Request) {
  const type = new URL(req.url).searchParams.get("type") ?? "leads";
  const cfg = CONFIG[type];
  if (!cfg) return NextResponse.json({ error: "Unknown type" }, { status: 400 });

  // Auth + role gate.
  const access = await checkAdminAccess();
  if (!access.ok || !access.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canAccessSection(access.role, cfg.section)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sb = await createSupabaseServerClient();

  const { data, error } = await sb
    .from(cfg.table)
    .select(cfg.columns.join(","))
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const csv = toCsv(
    (data ?? []) as unknown as Record<string, unknown>[],
    cfg.columns,
  );
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}.csv"`,
    },
  });
}
