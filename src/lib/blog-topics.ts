import type { BlogPost } from "@/lib/cms/types";

/**
 * The blog's two topics, matching the site's two pillars. Each topic groups
 * CMS categories; /blog/topic/<slug> lists its posts.
 */
export const BLOG_TOPICS = [
  {
    slug: "wordpress-security",
    name: "WordPress Security",
    categories: ["Security", "Malware Removal"],
    title: "WordPress Security & Malware Removal Guides",
    description:
      "Guides for US website owners on hacked WordPress sites, malware removal, Google warnings and hardening, from someone who cleans hacked sites for a living.",
    intro:
      "Hacked site, malware, redirects or a Google warning? These guides walk you through what to check, what to fix and how to keep it from happening again.",
    service: { label: "WordPress malware removal", href: "/services/wordpress-malware-removal" },
  },
  {
    slug: "web-development",
    name: "Web Development",
    categories: ["WordPress Care", "Performance"],
    title: "Web Development, Speed & WordPress Care Guides",
    description:
      "Guides for US small businesses on building, speeding up and maintaining WordPress, Shopify and Next.js websites: costs, performance, care plans and more.",
    intro:
      "Planning a new site, speeding up a slow one or deciding on a care plan? These guides cover what it costs, what matters and how to keep a site fast and healthy.",
    service: { label: "WordPress website development", href: "/services/wordpress-website-development" },
  },
] as const;

export type BlogTopic = (typeof BLOG_TOPICS)[number];

export function getBlogTopic(slug: string) {
  return BLOG_TOPICS.find((t) => t.slug === slug);
}

export function postsInTopic(posts: BlogPost[], topic: BlogTopic) {
  return posts.filter((p) => (topic.categories as readonly string[]).includes(p.category ?? ""));
}
