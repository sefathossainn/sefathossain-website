import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/cms/queries";
import { notifyOwner } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const { ok, retryAfter } = rateLimit(`lead:${ip}`);
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

  const parsed = leadSchema.safeParse(payload);
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
  // Honeypot tripped — pretend success, save nothing.
  if (company) return NextResponse.json({ ok: true });

  try {
    const sb = createSupabaseAdminClient();
    const { error } = await sb.from("leads").insert({
      name: data.name,
      email: data.email,
      need: data.need ?? null,
      message: data.message,
      source_page: data.source_page ?? null,
    });
    if (error) throw error;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong saving your message. Please email me directly.",
      },
      { status: 500 },
    );
  }

  const settings = await getSiteSettings();
  await notifyOwner(
    "New enquiry — sefathossain.com",
    `${data.name} <${data.email}> — ${data.need ?? "—"}\n\n${data.message}`,
    settings.lead_email,
    data.email,
  );

  return NextResponse.json({ ok: true });
}
