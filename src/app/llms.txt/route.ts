import { getBlogPosts } from "@/lib/cms/queries";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { SERVICE_PAGES } from "@/lib/services-nav";

export const revalidate = 3600;

/**
 * /llms.txt — a concise, machine-readable map of the site for AI answer engines
 * (an emerging GEO/AIO convention, analogous to robots.txt/sitemap). Plain
 * Markdown: title, summary, then the key pages with one-line descriptions.
 */
export async function GET() {
  const posts = await getBlogPosts();

  const lines: string[] = [
    `# ${siteConfig.name} — WordPress Security Expert`,
    "",
    `> ${siteConfig.name} is a WordPress security specialist helping businesses across the United States recover hacked websites, remove malware, and harden WordPress against future attacks. Based on ${siteConfig.url}.`,
    "",
    "## Services",
    ...SERVICE_PAGES.map(
      (s) => `- [${s.name}](${absoluteUrl(s.path)}): ${s.desc}`,
    ),
    "",
    "## Guides",
    ...posts
      .filter((p) => p.slug && !p.seo?.noindex)
      .map(
        (p) =>
          `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${p.excerpt ? `: ${p.excerpt}` : ""}`,
      ),
    "",
    "## Contact",
    `- [Free security audit](${absoluteUrl("/security-audit")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
