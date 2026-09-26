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

/** Coarse browser family from the user-agent. */
function browserOf(ua: string): string {
  if (/edg/i.test(ua)) return "Edge";
  if (/opr|opera/i.test(ua)) return "Opera";
  if (/samsungbrowser/i.test(ua)) return "Samsung Internet";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Other";
}

/** Coarse operating system from the user-agent. */
function osOf(ua: string): string {
  if (/windows/i.test(ua)) return "Windows";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/mac os x|macintosh/i.test(ua)) return "macOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

/** Trim + cap a free-text field, or null. */
function clean(v: unknown, max = 120): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s || null;
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

  let body: {
    path?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    visitor_id?: string;
    is_entry?: boolean;
  } = {};
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

  // First-party visitor id (from the browser's localStorage) — enables
  // new-vs-returning and sessions. Accept only a short alphanumeric token.
  const rawVid = clean(body.visitor_id, 40);
  const visitorId = rawVid && /^[a-z0-9-]+$/i.test(rawVid) ? rawVid : null;

  try {
    const sb = createSupabaseAdminClient();
    await sb.from("page_views").insert({
      path,
      referrer: referrerHost(body.referrer, siteConfig.domain),
      country,
      device: deviceOf(ua),
      browser: browserOf(ua),
      os: osOf(ua),
      utm_source: clean(body.utm_source, 80),
      utm_medium: clean(body.utm_medium, 80),
      utm_campaign: clean(body.utm_campaign, 120),
      visitor_id: visitorId,
      is_entry: body.is_entry === true,
      visitor_hash: visitorHash,
    });
  } catch {
    // Swallow — analytics is best-effort and must not surface errors.
  }

  return NextResponse.json({ ok: true });
}
