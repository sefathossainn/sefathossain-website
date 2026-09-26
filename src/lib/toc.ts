/**
 * Extracts an "on this page" table of contents from admin-authored blog HTML,
 * injecting stable ids into the h2/h3 headings so the TOC can link to them.
 * Content is trusted (CMS/seed), so a regex pass is sufficient.
 */
export type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function withToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const out = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (match, lvl: string, attrs: string | undefined, inner: string) => {
      const level = Number(lvl) as 2 | 3;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;
      // Respect an existing id if the author set one.
      if (attrs && /\sid=/.test(attrs)) {
        const existing = attrs.match(/\sid=["']([^"']+)["']/);
        const id = existing ? existing[1] : slugify(text);
        toc.push({ id, text, level });
        return match;
      }
      let id = slugify(text) || `section-${toc.length + 1}`;
      while (used.has(id)) id = `${id}-${toc.length + 1}`;
      used.add(id);
      toc.push({ id, text, level });
      return `<h${lvl}${attrs ?? ""} id="${id}">${inner}</h${lvl}>`;
    },
  );

  return { html: out, toc };
}
