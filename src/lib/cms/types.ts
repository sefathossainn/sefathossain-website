/** CMS domain types — the shapes public pages and /admin share. */

export type Metric = { label: string; value: string };

export type CaseCategory = "security" | "build" | "performance";

export type CaseStudy = {
  id?: string;
  slug: string;
  title: string;
  tagline?: string;
  /** rich text / html */
  situation: string;
  approach: string;
  outcome: string;
  /** [] until confirmed — never fabricate a metric */
  metrics: Metric[];
  hero_image?: string | null;
  gallery?: string[];
  category: CaseCategory;
  featured: boolean;
  testimonial_id?: string | null;
  sort_order?: number;
  seo?: Seo | null;
  status?: "draft" | "published";
};

export type Project = {
  id?: string;
  slug?: string;
  title: string;
  summary?: string;
  live_url?: string | null;
  images?: string[];
  stack?: string[];
  type?: string;
  featured: boolean;
  sort_order?: number;
  status?: "draft" | "published";
};

export type Testimonial = {
  id?: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string | null;
  rating?: number;
  source?: "upwork" | "fiverr" | "direct";
  featured: boolean;
  sort_order?: number;
  status?: "draft" | "published";
};

export type Service = {
  id?: string;
  group_name: "Build" | "Secure" | "Grow";
  title: string;
  description?: string;
  items: string[];
  sort_order?: number;
  status?: "published" | "draft";
};

export type Faq = {
  id?: string;
  question: string;
  answer: string;
  sort_order?: number;
  status?: "published" | "draft";
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  /** rich text / html */
  body: string;
  featured_image?: string | null;
  author: string;
  category?: string;
  tags?: string[];
  status?: "draft" | "published";
  published_at?: string;
  reading_minutes?: number;
  seo?: Seo | null;
};

export type Seo = {
  title?: string;
  description?: string;
  og_image?: string;
  /** Yoast/RankMath-style target keyphrase used to drive the on-page analysis. */
  focus_keyword?: string;
  /** Override the canonical URL (leave empty to use the page's own URL). */
  canonical?: string;
  /** Ask search engines not to index this page. */
  noindex?: boolean;
};

export type SiteSettings = {
  logo_url?: string | null;
  profile_photo?: string | null;
  /** Navbar logo name (falls back to siteConfig.wordmark). */
  brand_name?: string | null;
  /** Navbar logo title/tagline under the name (blank hides it). */
  brand_title?: string | null;
  /** Favicon image (falls back to the profile photo). */
  favicon_url?: string | null;
  /** Global theme overrides (colors + type scale) — see src/lib/theme.ts. */
  theme?: import("@/lib/theme").ThemeSettings | null;
  /** Where contact/audit form submissions are emailed (needs RESEND_API_KEY). */
  lead_email?: string | null;
  nav?: unknown;
  footer?: unknown;
  social?: Record<string, string>;
  seo_defaults?: Seo;
  calendar_url?: string | null;
};

/** content_blocks value union */
export type BlockValue = {
  text?: string;
  url?: string;
  alt?: string;
  items?: string[];
  /** Per-block text styling (size/color/weight/align) — see text-style.ts. */
  style?: import("./text-style").TextStyle;
};

export type PageSlug =
  | "home"
  | "services"
  | "work"
  | "about"
  | "blog"
  | "contact"
  | "security-audit";
