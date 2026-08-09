/**
 * Static site configuration — the fallback used before (and if) the CMS
 * `site_settings` row is read. Everything here is overridable from /admin.
 */

export const siteConfig = {
  name: "Sefat Hossain",
  /** Wordmark trailing accent, per the brand guide (emerald period). */
  wordmark: "Sefat Hossain",
  domain: "sefathossain.com",
  url: "https://sefathossain.com",
  tagline: "Websites, built to be trusted.",
  description:
    "I build and protect high-performance WordPress, Elementor, and Shopify websites — secure from day one and looked after long after launch.",
  email: "contact@sefathossain.com",
  /** Booking / calendar embed (Calendly or similar) — set in CMS. */
  calendarUrl: "",
  credit: {
    label: "Designed and Developed by Mohammad Emmon",
    href: "https://mohammademmon.com",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Start here",
    items: [
      { label: "Free security audit", href: "/security-audit" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const socialLinks: NavItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Upwork", href: "https://www.upwork.com/" },
];

/** Primary CTA used across the site. */
export const primaryCta = {
  label: "Get your free security audit",
  href: "/security-audit",
} as const;

/** The person — used for photo trust signals across the site. */
export const profile = {
  name: "Sefat Hossain",
  role: "WordPress Security & Web Development Specialist",
  shortRole: "WordPress Security & Web Development",
  alt: "Sefat Hossain, WordPress security specialist",
  initials: "SH",
  /**
   * Background-removed cutout for the hero, so the Secure Lattice reads behind
   * him. Derived from the profile photo (regenerate if the photo changes).
   * The framed photo (site_settings.profile_photo) still drives every other
   * placement — avatars, About, testimonials, footer, contact.
   */
  heroImage: "/images/sefat-cutout.png",
} as const;
