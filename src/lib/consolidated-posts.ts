/**
 * Blog posts merged into a stronger page on the same topic (keyword
 * cannibalization fix, Nov 2026). Each pair was chosen from Search Console:
 * the weaker URL had few impressions at position 60–90 while the target
 * already ranked better for the same queries.
 *
 * next.config.ts 301-redirects each `from` slug, and getBlogPosts() drops
 * them, so they leave the /blog index and the sitemap too. The CMS rows can
 * stay; unpublish them in /admin whenever convenient.
 */
export const CONSOLIDATED_POSTS: { from: string; to: string }[] = [
  // Commercial "wordpress malware removal" intent belongs to the service page.
  { from: "wordpress-malware-removal", to: "/services/wordpress-malware-removal" },
  // Same intent as the hacked-site pillar guide.
  { from: "recover-hacked-wordpress-website", to: "/blog/wordpress-site-hacked" },
  // Two redirect-hack guides; keep the one Google already prefers.
  { from: "wordpress-redirect-malware", to: "/blog/how-to-fix-a-wordpress-redirect-hack" },
  // Two "how to tell if you're infected" guides; keep the stronger one.
  { from: "check-wordpress-for-malware", to: "/blog/is-my-wordpress-site-hacked-how-to-check" },
];

export const CONSOLIDATED_SLUGS = new Set(CONSOLIDATED_POSTS.map((p) => p.from));
