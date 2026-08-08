import { getBlogPosts } from "@/lib/cms/queries";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

function esc(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getBlogPosts();

  const items = posts
    .map((p) => {
      const link = absoluteUrl(`/blog/${p.slug}`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>${
        p.published_at
          ? `\n      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>`
          : ""
      }${p.category ? `\n      <category>${esc(p.category)}</category>` : ""}
      <description>${esc(p.excerpt ?? "")}</description>
      <content:encoded><![CDATA[${p.body ?? ""}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} — Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${esc(siteConfig.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
