import "server-only";
import { cache } from "react";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import type {
  BlockValue,
  BlogPost,
  CaseStudy,
  Faq,
  PageSlug,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/cms/types";

import { resolveTextStyle } from "@/lib/cms/text-style";
import { defaultBlocks } from "@/lib/cms/defaults/blocks";
import { defaultCaseStudies } from "@/lib/cms/defaults/case-studies";
import { defaultServices } from "@/lib/cms/defaults/services";
import { defaultFaqs } from "@/lib/cms/defaults/faqs";
import { defaultProjects } from "@/lib/cms/defaults/projects";
import { defaultPosts } from "@/lib/cms/defaults/blog";
import { defaultSiteSettings } from "@/lib/cms/defaults/site-settings";

/**
 * Run a Supabase read, falling back to code defaults when Supabase isn't
 * configured, the table doesn't exist yet, or the query errors. This is what
 * lets the site render the signed-off copy before the DB is seeded — and
 * switch to CMS content the moment it is.
 */
async function withSupabase<T>(
  run: (sb: ReturnType<typeof createSupabasePublicClient>) => Promise<T>,
  fallback: T,
): Promise<T> {
  if (!isSupabaseConfigured) return fallback;
  try {
    const sb = createSupabasePublicClient();
    return await run(sb);
  } catch {
    return fallback;
  }
}

// ── Page content blocks ─────────────────────────────────────────────────────

export type PageContent = {
  text: (key: string) => string;
  items: (key: string) => string[];
  image: (key: string) => { url: string; alt: string } | null;
  /** Per-block inline style (size/color/weight/align), sanitized. */
  style: (key: string) => import("react").CSSProperties | undefined;
  raw: Record<string, BlockValue>;
};

export const getPageContent = cache(
  async (pageSlug: PageSlug): Promise<PageContent> => {
    const merged: Record<string, BlockValue> = {
      ...(defaultBlocks[pageSlug] ?? {}),
    };

    await withSupabase(async (sb) => {
      const { data, error } = await sb
        .from("content_blocks")
        .select("block_key,value")
        .eq("page_slug", pageSlug);
      if (!error && data) {
        for (const row of data as { block_key: string; value: BlockValue }[]) {
          if (row.value) merged[row.block_key] = row.value;
        }
      }
      return null;
    }, null);

    return {
      text: (k) => merged[k]?.text ?? "",
      items: (k) => merged[k]?.items ?? [],
      image: (k) =>
        merged[k]?.url ? { url: merged[k]!.url!, alt: merged[k]!.alt ?? "" } : null,
      style: (k) => resolveTextStyle(merged[k]?.style),
      raw: merged,
    };
  },
);

// ── Site settings ───────────────────────────────────────────────────────────

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return defaultSiteSettings;
    return { ...defaultSiteSettings, ...(data as SiteSettings) };
  }, defaultSiteSettings);
});

// ── Case studies ────────────────────────────────────────────────────────────

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("case_studies")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultCaseStudies;
    return data as CaseStudy[];
  }, defaultCaseStudies);
});

export const getFeaturedCaseStudies = cache(
  async (limit = 3): Promise<CaseStudy[]> => {
    const all = await getCaseStudies();
    const featured = all.filter((c) => c.featured);
    return (featured.length ? featured : all).slice(0, limit);
  },
);

export const getCaseStudy = cache(
  async (slug: string): Promise<CaseStudy | null> => {
    const fallback = defaultCaseStudies.find((c) => c.slug === slug) ?? null;
    return withSupabase(async (sb) => {
      const { data, error } = await sb
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error || !data) return fallback;
      return data as CaseStudy;
    }, fallback);
  },
);

/** The "next case study" for the end-of-page link. */
export const getNextCaseStudy = cache(
  async (slug: string): Promise<CaseStudy | null> => {
    const all = await getCaseStudies();
    if (all.length < 2) return null;
    const i = all.findIndex((c) => c.slug === slug);
    if (i === -1) return all[0];
    return all[(i + 1) % all.length];
  },
);

// ── Projects ────────────────────────────────────────────────────────────────

export const getProjects = cache(async (): Promise<Project[]> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error || !data) return defaultProjects;
    return data as Project[];
  }, defaultProjects);
});

// ── Testimonials ────────────────────────────────────────────────────────────

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("testimonials")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    // No fallback demos — public shows the signature quote when empty.
    if (error || !data) return [];
    return data as Testimonial[];
  }, []);
});

export const getTestimonialById = cache(
  async (id?: string | null): Promise<Testimonial | null> => {
    if (!id) return null;
    return withSupabase(async (sb) => {
      const { data, error } = await sb
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .eq("status", "published")
        .maybeSingle();
      if (error || !data) return null;
      return data as Testimonial;
    }, null);
  },
);

// ── Services ────────────────────────────────────────────────────────────────

export const getServices = cache(async (): Promise<Service[]> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultServices;
    return data as Service[];
  }, defaultServices);
});

/** Services grouped into Build / Secure / Grow, in order. */
export const getServicesGrouped = cache(async () => {
  const services = await getServices();
  const order: Service["group_name"][] = ["Build", "Secure", "Grow"];
  return order
    .map((group) => ({
      group,
      services: services.filter((s) => s.group_name === group),
    }))
    .filter((g) => g.services.length > 0);
});

// ── FAQs ────────────────────────────────────────────────────────────────────

export const getFaqs = cache(async (): Promise<Faq[]> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("faqs")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultFaqs;
    return data as Faq[];
  }, defaultFaqs);
});

// ── Blog ────────────────────────────────────────────────────────────────────

/** Flatten the embedded category relation to a plain `category` string. */
function mapPost(row: Record<string, unknown>): BlogPost {
  const cat = row.categories as { name?: string } | null | undefined;
  return { ...(row as unknown as BlogPost), category: cat?.name };
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return withSupabase(async (sb) => {
    const { data, error } = await sb
      .from("blog_posts")
      .select("*, categories(name)")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data || data.length === 0) return defaultPosts;
    return (data as Record<string, unknown>[]).map(mapPost);
  }, defaultPosts);
});

export const getBlogPost = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const fallback = defaultPosts.find((p) => p.slug === slug) ?? null;
    return withSupabase(async (sb) => {
      const { data, error } = await sb
        .from("blog_posts")
        .select("*, categories(name)")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error || !data) return fallback;
      return mapPost(data as Record<string, unknown>);
    }, fallback);
  },
);

/** Distinct categories present in published posts, for the blog filter. */
export const getBlogCategories = cache(async (): Promise<string[]> => {
  const posts = await getBlogPosts();
  return Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean) as string[]),
  );
});
