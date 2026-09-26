import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { rateLimit, clientIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const BOT_RE =
  /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|preview|monitor|lighthouse|headless|curl|wget|python-requests/i;

/** Coarse device class from the user-agent — no fingerprinting. */
function deviceOf(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet|playbook|silk/i.test(ua)) return "tablet";
  if (/mobi|iphone|android.*mobile|phone/i.test(ua)) return "mobile";
  return "desktop";
}

/** External referrer host only; '' for direct or same-site. */
function referrerHost(ref: string | undefined, selfHost: string): string {
  if (!ref) return "";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (!host || host === selfHost.replace(/^www\./, "")) return "";
    return host;
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  // Analytics must never break the page or cost anything when unconfigured.
  if (!isSupabaseConfigured) return NextResponse.json({ ok: true });

  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_RE.test(ua)) return NextResponse.json({ ok: true });

  const ip = clientIp(req.headers);
  // Generous cap — normal browsing never hits it; blocks only spam bursts.
  const { ok } = rateLimit(`track:${ip}`, { limit: 40, windowMs: 60_000 });
  if (!ok) return NextResponse.json({ ok: true });

  let body: { path?: string; referrer?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  let path = (body.path ?? "").trim();
  if (!path || !path.startsWith("/") || path.length > 512) {
    return NextResponse.json({ ok: true });
  }
  // Never track the admin area or API routes.
  if (path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ ok: true });
  }
  // Drop query/hash — keep the path clean for aggregation.
  path = path.split(/[?#]/)[0];

  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    null;

  const day = new Date().toISOString().slice(0, 10);
  // One-way, daily-rotating hash for rough unique-visitor counts. The raw IP is
  // never stored and cannot be recovered from this value.
  const visitorHash = createHash("sha256")
    .update(`${ip}|${ua}|${day}|sh-analytics-v1`)
    .digest("hex")
    .slice(0, 16);

  try {
    const sb = createSupabaseAdminClient();
    await sb.from("page_views").insert({
      path,
      referrer: referrerHost(body.referrer, siteConfig.domain),
      country,
      device: deviceOf(ua),
      visitor_hash: visitorHash,
    });
  } catch {
    // Swallow — analytics is best-effort and must not surface errors.
  }

  return NextResponse.json({ ok: true });
}
