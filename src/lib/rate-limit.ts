import "server-only";

/**
 * Minimal in-memory sliding-window rate limiter. A pragmatic guard against
 * spam bursts (the brief calls for a "basic rate-limit, no captcha"). In a
 * multi-instance serverless deployment this is per-instance, best-effort — the
 * honeypot is the primary bot defence. Swap for Upstash/Redis if abuse grows.
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(key, recent);

  // opportunistic cleanup
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= windowStart)) hits.delete(k);
    }
  }

  const ok = recent.length <= limit;
  const retryAfter = ok ? 0 : Math.ceil((recent[0] + windowMs - now) / 1000);
  return { ok, retryAfter };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
