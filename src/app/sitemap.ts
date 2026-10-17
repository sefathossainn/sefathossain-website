import type { MetadataRoute } from "next";
import { getCaseStudies, getBlogPosts } from "@/lib/cms/queries";
import { serviceAreas } from "@/lib/service-areas";
import { absoluteUrl, latestIso } from "@/lib/utils";

// Render per request. As an ISR route (revalidate = 3600) the production
// sitemap stayed frozen at its build output — scheduled posts that went live
// after the deploy never appeared. One Supabase read per crawl is cheap, and
// it guarantees a post shows up the moment its published_at passes.
export const dynamic = "force-dynamic";

/**
 * Last real content change for code-defined pages. Google ignores lastmod
 * values that are always "now", so these are fixed dates — bump the entry
 * when that page's copy meaningfully changes.
 */
const STATIC_LASTMOD = {
  home: "2026-09-26",
  services: "2026-09-25",
  servicePages: "2026-09-26",
  serviceAreas: "2026-09-26",
  about: "2026-08-09",
  contact: "2026-08-10",
  securityAudit: "2026-08-09",
  hackedChecker: "2026-09-26",
  legal: "2026-08-09",
} as const;

const SERVICE_SLUGS = [
  "wordpress-malware-removal",
  "wordpress-malware-removal-cost",
  "wordpress-redirect-virus-removal",
  "japanese-keyword-hack-removal",
  "pharma-hack-removal",
  "wp-vcd-malware-removal",
  "website-suspended-by-host-recovery",
  "woocommerce-malware-removal",
  "emergency-wordpress-malware-removal",
  "hacked-wordpress-recovery",
  "wordpress-security-hardening",
  "google-blacklist-removal",
  "cloudflare-security",
  "wordpress-security-audit",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, posts] = await Promise.all([
    getCaseStudies(),
    getBlogPosts(),
  ]);

  const liveStudies = studies.filter((s) => s.slug && !s.seo?.noindex);
  // getBlogPosts already hides posts whose published_at is in the future.
  const livePosts = posts.filter((p) => p.slug && !p.seo?.noindex);

  const postModified = (p: (typeof livePosts)[number]) =>
    latestIso(p.published_at, p.updated_at);

  // Listing pages change whenever a new item goes live.
  const newestPost = latestIso(...livePosts.map(postModified));
  const newestStudy = latestIso(...liveStudies.map((s) => s.created_at));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: latestIso(STATIC_LASTMOD.home, newestPost),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: STATIC_LASTMOD.services,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: STATIC_LASTMOD.about,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/work"),
      lastModified: newestStudy,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: newestPost,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: STATIC_LASTMOD.contact,
      changeFrequency: "yearly",
      priority: 0.6,
    },

    // Security service pages
    ...SERVICE_SLUGS.map((slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: STATIC_LASTMOD.servicePages,
      changeFrequency: "monthly" as const,
      priority: slug === "wordpress-security-audit" ? 0.9 : 0.8,
    })),

    // Service-area landing pages (USA cities)
    {
      url: absoluteUrl("/service-areas"),
      lastModified: STATIC_LASTMOD.serviceAreas,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...serviceAreas.map((a) => ({
      url: absoluteUrl(`/service-areas/${a.slug}`),
      lastModified: STATIC_LASTMOD.serviceAreas,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Free security audit landing page
    {
      url: absoluteUrl("/security-audit"),
      lastModified: STATIC_LASTMOD.securityAudit,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Free tools (linkable assets)
    {
      url: absoluteUrl("/tools/is-my-wordpress-site-hacked"),
      lastModified: STATIC_LASTMOD.hackedChecker,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: absoluteUrl("/privacy"),
      lastModified: STATIC_LASTMOD.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: STATIC_LASTMOD.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = liveStudies.map((s) => ({
    url: absoluteUrl(`/work/${s.slug}`),
    lastModified: s.created_at,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = livePosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: postModified(p),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes, ...blogRoutes];
}
