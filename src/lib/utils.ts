import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL helper, driven by the deployment origin. */
export function absoluteUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://sefathossain.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Human date, e.g. "24 Jun 2026". Falls back gracefully on bad input. */
export function formatDate(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
