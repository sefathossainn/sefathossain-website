import { NextResponse } from "next/server";
import { auditSchema, normalizeUrl } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/cms/queries";
import { notifyOwner } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const { ok, retryAfter } = rateLimit(`audit:${ip}`);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = auditSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { company, ...data } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // honeypot

  try {
    const sb = createSupabaseAdminClient();
    const { error } = await sb.from("audit_requests").insert({
      name: data.name,
      email: data.email,
      website_url: normalizeUrl(data.website_url),
    });
    if (error) throw error;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong sending your request. Please email me directly.",
      },
      { status: 500 },
    );
  }

  const settings = await getSiteSettings();
  await notifyOwner(
    "New audit request — sefathossain.com",
    `${data.name} <${data.email}>\nSite: ${normalizeUrl(data.website_url)}`,
    settings.lead_email,
    data.email,
  );

  return NextResponse.json({ ok: true });
}
