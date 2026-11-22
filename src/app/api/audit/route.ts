import { NextResponse } from "next/server";
import { auditSchema, normalizeUrl } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/cms/queries";
import { notifyOwner } from "@/lib/notify";
import { describeLanding } from "@/lib/first-landing";

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

  const landing = describeLanding((payload as { landing?: unknown }).landing);

  try {
    const sb = createSupabaseAdminClient();
    const row: Record<string, string> = {
      name: data.name,
      email: data.email,
      website_url: normalizeUrl(data.website_url),
    };
    let { error } = await sb
      .from("audit_requests")
      .insert(landing ? { ...row, source_page: landing } : row);
    // Migration 0009 may not have been run yet. A missing attribution column
    // (PostgREST PGRST204 / Postgres 42703) must not lose the request.
    if (landing && (error?.code === "PGRST204" || error?.code === "42703")) {
      ({ error } = await sb.from("audit_requests").insert(row));
    }
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
    `${data.name} <${data.email}>\nSite: ${normalizeUrl(data.website_url)}${landing ? `\n\n[${landing}]` : ""}`,
    settings.lead_email,
    data.email,
  );

  return NextResponse.json({ ok: true });
}
