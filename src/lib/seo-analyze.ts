/**
 * Yoast / Rank Math-style on-page SEO analysis. Pure + framework-free so it can
 * run live in the browser editor and (if ever needed) on the server.
 */

export type CheckStatus = "good" | "ok" | "bad";

export type SeoCheck = {
  id: string;
  status: CheckStatus;
  text: string;
};

export type SeoReport = {
  score: number; // 0–100
  rating: CheckStatus;
  checks: SeoCheck[];
};

export type SeoInput = {
  focusKeyword?: string;
  title?: string;
  description?: string;
  slug?: string;
  /** Plain text or HTML — tags are stripped before analysis. */
  content?: string;
};

/** Recommended lengths (chars) for the SERP snippet. */
export const TITLE_MIN = 30;
export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 160;

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stripHtml = (s: string) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
const wordsOf = (s: string) => s.split(/\s+/).filter(Boolean);
const has = (haystack: string, needle: string) =>
  Boolean(needle) && haystack.toLowerCase().includes(needle.toLowerCase());

export function analyzeSeo(input: SeoInput): SeoReport {
  const kw = (input.focusKeyword ?? "").trim();
  const title = (input.title ?? "").trim();
  const desc = (input.description ?? "").trim();
  const slug = (input.slug ?? "").trim();
  const hasContentField = input.content !== undefined;
  const content = stripHtml(input.content ?? "");
  const contentWords = wordsOf(content);
  const checks: SeoCheck[] = [];

  // ── SEO title ──────────────────────────────────────────────────────────
  if (!title) {
    checks.push({ id: "title", status: "bad", text: "Add an SEO title." });
  } else {
    const n = title.length;
    if (n < TITLE_MIN)
      checks.push({ id: "title-len", status: "ok", text: `SEO title is a little short (${n} chars) — aim for ${TITLE_MIN}–${TITLE_MAX}.` });
    else if (n > TITLE_MAX)
      checks.push({ id: "title-len", status: "ok", text: `SEO title is long (${n} chars) — Google may truncate it.` });
    else
      checks.push({ id: "title-len", status: "good", text: `SEO title length is ideal (${n} chars).` });
  }

  // ── Meta description ───────────────────────────────────────────────────
  if (!desc) {
    checks.push({ id: "desc", status: "bad", text: "Add a meta description." });
  } else {
    const n = desc.length;
    if (n < DESC_MIN)
      checks.push({ id: "desc-len", status: "ok", text: `Meta description is short (${n} chars) — aim for ${DESC_MIN}–${DESC_MAX}.` });
    else if (n > DESC_MAX)
      checks.push({ id: "desc-len", status: "ok", text: `Meta description is long (${n} chars) — it may get cut off.` });
    else
      checks.push({ id: "desc-len", status: "good", text: `Meta description length is ideal (${n} chars).` });
  }

  // ── Focus keyword ──────────────────────────────────────────────────────
  if (!kw) {
    checks.push({ id: "kw", status: "ok", text: "Set a focus keyword to unlock keyword checks." });
  } else {
    checks.push({
      id: "kw-title",
      status: has(title, kw) ? "good" : "bad",
      text: has(title, kw)
        ? "Focus keyword appears in the SEO title."
        : "Focus keyword is missing from the SEO title.",
    });
    checks.push({
      id: "kw-desc",
      status: has(desc, kw) ? "good" : "ok",
      text: has(desc, kw)
        ? "Focus keyword appears in the meta description."
        : "Add the focus keyword to the meta description.",
    });
    const slugWords = slug.replace(/[-_]/g, " ");
    checks.push({
      id: "kw-slug",
      status: has(slugWords, kw) ? "good" : "ok",
      text: has(slugWords, kw)
        ? "Focus keyword appears in the URL slug."
        : "Consider adding the focus keyword to the slug.",
    });

    if (hasContentField && contentWords.length) {
      const intro = contentWords.slice(0, 100).join(" ");
      checks.push({
        id: "kw-intro",
        status: has(intro, kw) ? "good" : "ok",
        text: has(intro, kw)
          ? "Focus keyword appears in the opening paragraph."
          : "Use the focus keyword near the start of the content.",
      });

      const kwWordCount = wordsOf(kw).length || 1;
      const occurrences =
        content.toLowerCase().match(new RegExp(escapeRegExp(kw.toLowerCase()), "g"))
          ?.length ?? 0;
      const density = (occurrences * kwWordCount * 100) / contentWords.length;
      if (occurrences === 0)
        checks.push({ id: "kw-density", status: "bad", text: "Focus keyword doesn't appear in the content." });
      else if (density < 0.5)
        checks.push({ id: "kw-density", status: "ok", text: `Keyword density is ${density.toFixed(1)}% — a bit low (aim for 0.5–2.5%).` });
      else if (density > 3)
        checks.push({ id: "kw-density", status: "ok", text: `Keyword density is ${density.toFixed(1)}% — possibly keyword stuffing.` });
      else
        checks.push({ id: "kw-density", status: "good", text: `Keyword density is ${density.toFixed(1)}% — good.` });
    }
  }

  // ── Content length (only for content-bearing records) ──────────────────
  if (hasContentField && contentWords.length > 0) {
    const wc = contentWords.length;
    if (wc < 300)
      checks.push({ id: "length", status: "ok", text: `Content is ${wc} words — 300+ tends to rank better.` });
    else
      checks.push({ id: "length", status: "good", text: `Content length is healthy (${wc} words).` });
  }

  const weight: Record<CheckStatus, number> = { good: 1, ok: 0.5, bad: 0 };
  const score = checks.length
    ? Math.round((checks.reduce((a, c) => a + weight[c.status], 0) / checks.length) * 100)
    : 0;
  const rating: CheckStatus = score >= 70 ? "good" : score >= 45 ? "ok" : "bad";

  return { score, rating, checks };
}
