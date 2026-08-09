import type { SiteSettings } from "@/lib/cms/types";
import {
  siteConfig,
  primaryNav,
  socialLinks,
} from "@/lib/site-config";

/** Single-row site_settings defaults, derived from the static site config. */
export const defaultSiteSettings: SiteSettings = {
  logo_url: null,
  // Real supplied portrait — served from /public. Swappable in /admin.
  profile_photo: "/images/sefat-photo.png",
  brand_name: siteConfig.wordmark,
  brand_title: "WordPress Security Expert",
  favicon_url: null, // falls back to profile_photo
  nav: primaryNav,
  footer: { credit: siteConfig.credit },
  social: Object.fromEntries(socialLinks.map((s) => [s.label, s.href])),
  seo_defaults: {
    title:
      "Sefat Hossain — Secure, High-Performance Websites | WordPress Security & Development",
    description: siteConfig.description,
  },
  calendar_url: process.env.NEXT_PUBLIC_CALENDAR_URL ?? null,
};
