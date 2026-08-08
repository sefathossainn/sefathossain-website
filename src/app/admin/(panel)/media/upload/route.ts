import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkAdminAccess } from "@/lib/admin/access";
import { can } from "@/lib/admin/permissions";

export const runtime = "nodejs";

function slugifyName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const access = await checkAdminAccess();
  if (!access.ok || !access.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!can(access.role, "media", "create")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const sb = await createSupabaseServerClient();

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const path = `uploads/${Date.now()}-${slugifyName(file.name || "image")}`;
  const { error: upErr } = await sb.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const {
    data: { publicUrl },
  } = sb.storage.from("media").getPublicUrl(path);

  const { data, error } = await sb
    .from("media")
    .insert({
      url: publicUrl,
      alt: form.get("alt")?.toString() ?? null,
      type: file.type,
      bucket: "media",
    })
    .select("id,url,alt")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ item: data });
}
