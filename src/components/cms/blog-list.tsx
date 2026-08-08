"use client";

import * as React from "react";
import type { BlogPost } from "@/lib/cms/types";
import { BlogCard } from "@/components/cms/blog-card";
import { cn } from "@/lib/utils";

/** Filterable + searchable blog grid (client). Readability-first, low motion. */
export function BlogList({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [active, setActive] = React.useState<string>("All");
  const [query, setQuery] = React.useState("");

  const filtered = posts.filter((p) => {
    const inCategory = active === "All" || p.category === active;
    const q = query.trim().toLowerCase();
    const inQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.excerpt ?? "").toLowerCase().includes(q) ||
      (p.tags ?? []).some((t) => t.toLowerCase().includes(q));
    return inCategory && inQuery;
  });

  const chips = ["All", ...categories];

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 border-b border-line/70 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors duration-300",
                active === c
                  ? "border-emerald bg-emerald/10 text-mist"
                  : "border-line text-sage hover:border-evergreen hover:text-mist",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-line bg-forest/60 px-4 py-2 text-sm text-mist placeholder:text-slate focus:border-evergreen focus:outline-none"
          />
        </label>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sage">
          No articles match that yet — try a different search.
        </p>
      )}
    </div>
  );
}
