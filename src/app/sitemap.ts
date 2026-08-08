import type { MetadataRoute } from "next";
import { getCaseStudies, getBlogPosts, getProjects } from "@/lib/cms/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, posts, projects] = await Promise.all([
    getCaseStudies(),
    getBlogPosts(),
    getProjects(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/security-audit"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = studies
    .filter((s) => !s.seo?.noindex)
    .map((s) => ({
      url: absoluteUrl(`/work/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => !p.seo?.noindex)
    .map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.published_at ? new Date(p.published_at) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticRoutes, ...caseRoutes, ...blogRoutes, ...projectRoutes];
}
