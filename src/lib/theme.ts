/**
 * Global theme controls — the brand's CSS custom properties, made editable from
 * /admin → Appearance and injected site-wide. Values are strictly sanitized
 * before they ever reach a <style> tag (hex colors + clamped percentages only).
 */

export type ThemeSettings = {
  colors?: Record<string, string>;
  /** Base text size as a percentage of 16px (scales the whole site). */
  base_font_pct?: number;
  /** Heading size multiplier as a percentage. */
  heading_scale_pct?: number;
};

export type ThemeToken = {
  key: string;
  cssVar: string;
  label: string;
  hint?: string;
  group: "Core" | "Surfaces & lines";
  default: string;
};

/** The editable colors, in the order shown in the admin. */
export const THEME_COLOR_TOKENS: ThemeToken[] = [
  { key: "obsidian", cssVar: "--color-obsidian", label: "Page background", group: "Core", default: "#060c09" },
  { key: "emerald", cssVar: "--color-emerald", label: "Primary accent / links", group: "Core", default: "#1e7a4e" },
  { key: "signal", cssVar: "--color-signal", label: "Buttons & highlights", group: "Core", default: "#27a165" },
  { key: "mist", cssVar: "--color-mist", label: "Heading text", group: "Core", default: "#e9f0eb" },
  { key: "sage", cssVar: "--color-sage", label: "Body text", group: "Core", default: "#a7b8ad" },
  { key: "slate", cssVar: "--color-slate", label: "Muted text", group: "Core", default: "#5f7268" },
  { key: "forest", cssVar: "--color-forest", label: "Section surface", group: "Surfaces & lines", default: "#0b1811" },
  { key: "pine", cssVar: "--color-pine", label: "Card / panel", group: "Surfaces & lines", default: "#10241a" },
  { key: "evergreen", cssVar: "--color-evergreen", label: "Structural green", group: "Surfaces & lines", default: "#17402b" },
  { key: "line", cssVar: "--color-line", label: "Borders & dividers", group: "Surfaces & lines", default: "#223a2e" },
];

export const DEFAULT_BASE_FONT_PCT = 100;
export const DEFAULT_HEADING_SCALE_PCT = 100;
export const BASE_FONT_MIN = 85;
export const BASE_FONT_MAX = 125;
export const HEADING_SCALE_MIN = 70;
export const HEADING_SCALE_MAX = 150;

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
export const isHexColor = (v: unknown): v is string =>
  typeof v === "string" && HEX.test(v.trim());

function clampInt(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10);
  if (!Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** Full theme (defaults merged with saved overrides) — for the admin form. */
export function resolveTheme(theme?: ThemeSettings | null): Required<ThemeSettings> {
  const colors: Record<string, string> = {};
  for (const t of THEME_COLOR_TOKENS) {
    const v = theme?.colors?.[t.key];
    colors[t.key] = isHexColor(v) ? (v as string) : t.default;
  }
  return {
    colors,
    base_font_pct:
      clampInt(theme?.base_font_pct, BASE_FONT_MIN, BASE_FONT_MAX) ?? DEFAULT_BASE_FONT_PCT,
    heading_scale_pct:
      clampInt(theme?.heading_scale_pct, HEADING_SCALE_MIN, HEADING_SCALE_MAX) ??
      DEFAULT_HEADING_SCALE_PCT,
  };
}

/**
 * Build the CSS injected into the page. Only emits declarations that differ
 * from the defaults, and every value is sanitized — so a bad DB value can never
 * inject arbitrary CSS.
 */
export function buildThemeCss(theme?: ThemeSettings | null): string {
  if (!theme) return "";
  const rootDecls: string[] = [];

  for (const t of THEME_COLOR_TOKENS) {
    const v = theme.colors?.[t.key];
    if (isHexColor(v) && v!.trim().toLowerCase() !== t.default.toLowerCase()) {
      rootDecls.push(`${t.cssVar}:${v!.trim()}`);
    }
  }

  const rules: string[] = [];
  const headScale = clampInt(theme.heading_scale_pct, HEADING_SCALE_MIN, HEADING_SCALE_MAX);
  if (headScale && headScale !== DEFAULT_HEADING_SCALE_PCT) {
    rootDecls.push(`--heading-scale:${(headScale / 100).toFixed(3)}`);
  }
  if (rootDecls.length) rules.push(`:root{${rootDecls.join(";")}}`);

  const base = clampInt(theme.base_font_pct, BASE_FONT_MIN, BASE_FONT_MAX);
  if (base && base !== DEFAULT_BASE_FONT_PCT) rules.push(`html{font-size:${base}%}`);

  return rules.join("");
}
