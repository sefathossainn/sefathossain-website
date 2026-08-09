import type { MetadataRoute } from "next";
import { getCaseStudies, getBlogPosts } from "@/lib/cms/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, posts] = await Promise.all([
    getCaseStudies(),
    getBlogPosts(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/work"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },

    // Security service pages
    {
      url: absoluteUrl("/services/wordpress-malware-removal"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/hacked-wordpress-recovery"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/wordpress-security-hardening"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/google-blacklist-removal"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/cloudflare-security"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/wordpress-security-audit"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Free security audit landing page
    {
      url: absoluteUrl("/security-audit"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: absoluteUrl("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = studies
    .filter((s) => s.slug && !s.seo?.noindex)
    .map((s) => ({
      url: absoluteUrl(`/work/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug && !p.seo?.noindex)
    .map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.published_at
        ? new Date(p.published_at)
        : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...caseRoutes, ...blogRoutes];
}
