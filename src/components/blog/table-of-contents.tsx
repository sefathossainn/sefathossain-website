"use client";

import * as React from "react";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

/**
 * Sticky "on this page" list with scroll-spy — the active heading is
 * highlighted as the reader scrolls. Anchors rely on ids injected by withToc().
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");

  React.useEffect(() => {
    if (!items.length) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="On this page">
      <p className="kicker mb-4 text-slate">On this page</p>
      <ul className="grid gap-2 border-l border-line/70">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-4 text-sm leading-snug transition-colors",
                active === item.id
                  ? "border-emerald text-emerald"
                  : "border-transparent text-slate hover:text-mist",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
