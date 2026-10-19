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
  tagline: "WordPress Security Expert & Web Developer",
  description:
    "I build and protect high-performance WordPress, Elementor, and Shopify websites — secure from day one and looked after long after launch.",
  email: "contact@sefathossain.com",
  /** Booking / calendar embed (Calendly or similar) — set in CMS. */
  calendarUrl: "",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
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
      { label: "Service Areas", href: "/service-areas" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    // Sitewide links to the web-development pillar (internal linking).
    title: "Web development",
    items: [
      { label: "WordPress websites", href: "/services/wordpress-website-development" },
      { label: "Shopify stores", href: "/services/shopify-store-development" },
      { label: "Elementor design", href: "/services/elementor-website-design" },
      { label: "Next.js & React", href: "/services/custom-web-development" },
      { label: "Speed optimization", href: "/services/website-speed-optimization" },
    ],
  },
  {
    title: "Start here",
    items: [
      { label: "Free security audit", href: "/security-audit" },
      { label: "Hacked site checker", href: "/tools/is-my-wordpress-site-hacked" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const socialLinks: NavItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sefathossainn/" },
  { label: "GitHub", href: "https://github.com/sefathossainn" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/sefathossain" },
];

/** Primary CTA used across the site. */
export const primaryCta = {
  label: "Get your free security audit",
  href: "/security-audit",
} as const;

/** The person — used for photo trust signals across the site. */
export const profile = {
  name: "Sefat Hossain",
  role: "WordPress Security Expert",
  shortRole: "WordPress Security Expert",
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
