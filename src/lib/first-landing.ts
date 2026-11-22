/**
 * First-touch attribution for leads: the first page a visitor landed on, the
 * referring domain and any UTM source/medium. It stays in the visitor's own
 * browser and is only sent when they submit a form.
 *
 * Attribution is best-effort and must never block or fail a submission, so it
 * is deliberately outside the zod form schemas.
 */

const KEY = "sh_landing";
const MAX_AGE_DAYS = 90;

type Landing = {
  path: string;
  referrer: string;
  source: string;
  medium: string;
  on: string; // YYYY-MM-DD (UTC)
};

/** The stored landing, or undefined if missing, unreadable or expired. */
export function getFirstLanding(): Landing | undefined {
  try {
    const saved: Landing | null = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!saved) return undefined;
    const ageDays = (Date.now() - Date.parse(saved.on)) / 86_400_000;
    return ageDays < MAX_AGE_DAYS ? saved : undefined;
  } catch {
    return undefined;
  }
}

/** Call on the first view of a page load. Never overwrites a live landing. */
export function captureFirstLanding(path: string): void {
  if (getFirstLanding()) return;
  try {
    const host = (h: string) => h.replace(/^www\./, "");
    const from = document.referrer ? host(new URL(document.referrer).hostname) : "";
    const params = new URLSearchParams(window.location.search);
    const landing: Landing = {
      path,
      referrer: from === host(window.location.hostname) ? "" : from,
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      on: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem(KEY, JSON.stringify(landing));
  } catch {
    // Storage blocked: the lead is simply saved without attribution.
  }
}

/**
 * Server-side: turn the untrusted value from a form post into a one-line
 * label. Allow-listed characters only, as it ends up in email, admin and CSV.
 */
export function describeLanding(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const { path, referrer, source, medium, on } = value as Record<string, unknown>;
  const safe = (v: unknown, pattern: RegExp, max: number) =>
    typeof v === "string" && v.length <= max && pattern.test(v) ? v : "";

  const page = safe(path, /^\/[\w\-.~/%]*$/, 200);
  if (!page) return null;
  const from = safe(referrer, /^[a-z0-9.-]+$/i, 100);
  const utm = [safe(source, /^[\w.-]+$/, 80), safe(medium, /^[\w.-]+$/, 80)]
    .filter(Boolean)
    .join("/");
  const date = safe(on, /^\d{4}-\d{2}-\d{2}$/, 10);

  return [
    `first landed: ${page}`,
    `via: ${from || "direct or unknown"}`,
    utm && `utm: ${utm}`,
    date && `on: ${date}`,
  ]
    .filter(Boolean)
    .join(" | ");
}
