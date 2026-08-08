/**
 * Per-text-block styling — lets each editable text on a page carry its own
 * size / color / weight / alignment, set individually from the Pages editor.
 * Values are sanitized before they ever become an inline style, so a bad DB
 * value can never inject arbitrary CSS.
 */

import type { CSSProperties } from "react";

export type TextStyle = {
  /** Font size in px. Empty = keep the design default. */
  size?: number;
  /** Hex color. Empty = inherit the theme color. */
  color?: string;
  /** Font weight (300–800). */
  weight?: number;
  align?: "left" | "center" | "right";
};

export const FONT_WEIGHTS = [300, 400, 500, 600, 700, 800] as const;
export const SIZE_MIN = 8;
export const SIZE_MAX = 200;

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
export const isHex = (v: unknown): v is string =>
  typeof v === "string" && HEX.test(v.trim());

/** Sanitized inline style for a block (or undefined when nothing is set). */
export function resolveTextStyle(
  style?: TextStyle | null,
): CSSProperties | undefined {
  if (!style || typeof style !== "object") return undefined;
  const out: CSSProperties = {};

  if (isHex(style.color)) out.color = style.color!.trim();

  const size = Number(style.size);
  if (Number.isFinite(size) && size >= SIZE_MIN && size <= SIZE_MAX) {
    out.fontSize = Math.round(size); // px
    out.lineHeight = 1.15; // keep big custom sizes from overlapping
  }

  const weight = Number(style.weight);
  if ((FONT_WEIGHTS as readonly number[]).includes(weight)) {
    out.fontWeight = weight;
  }

  if (style.align === "left" || style.align === "center" || style.align === "right") {
    out.textAlign = style.align;
  }

  return Object.keys(out).length ? out : undefined;
}

/** Keep only valid style fields (used before persisting). */
export function cleanTextStyle(style?: TextStyle | null): TextStyle | undefined {
  if (!style) return undefined;
  const out: TextStyle = {};
  if (isHex(style.color)) out.color = style.color!.trim();
  const size = Number(style.size);
  if (Number.isFinite(size) && size >= SIZE_MIN && size <= SIZE_MAX) out.size = Math.round(size);
  const weight = Number(style.weight);
  if ((FONT_WEIGHTS as readonly number[]).includes(weight)) out.weight = weight;
  if (style.align === "left" || style.align === "center" || style.align === "right") out.align = style.align;
  return Object.keys(out).length ? out : undefined;
}
