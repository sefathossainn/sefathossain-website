import Link from "next/link";
import {
  SERVICE_PAGES,
  DEV_SERVICE_PAGES,
  type ServiceNavItem,
} from "@/lib/services-nav";
import { getBlogPosts } from "@/lib/cms/queries";
import { relatedServiceBySlug } from "@/lib/cms/blog-extras";

/**
 * Pick `limit` services to link from `currentPath`. Taking the first N of the
 * list on every page left the later services (Japanese hack, pharma hack,
 * WooCommerce, host suspension) with no contextual inbound links, so Google
 * discovered but never indexed them. Instead, take the services that follow
 * the current one in SERVICE_PAGES (grouped by topic), wrapping around;
 * non-service pages start at a stable position derived from their path, so
 * links spread across the whole set.
 */
function pickRelated(
  currentPath: string,
  limit: number,
  pool: ServiceNavItem[],
) {
  const n = pool.length;
  const idx = pool.findIndex((s) => s.path === currentPath);
  let start = idx + 1;
  if (idx < 0) {
    let h = 0;
    for (const ch of currentPath) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    start = h % n;
  }
  const out: ServiceNavItem[] = [];
  for (let i = 0; i < n && out.length < limit; i++) {
    const s = pool[(start + i) % n];
    if (s.path !== currentPath) out.push(s);
  }
  return out;
}

/**
 * Contextual internal-linking block — surfaces other security services related
 * to the current page and, on a service page, the blog guides that point back
 * to it. Improves crawl depth, topical authority, and gives AI engines the
 * cluster of related pages. Excludes the current page.
 */
export async function RelatedServices({
  currentPath,
  limit = 4,
  pool = SERVICE_PAGES,
  heading = "Explore related WordPress security services",
}: {
  currentPath: string;
  limit?: number;
  /** Which service cluster to link within (security by default). */
  pool?: ServiceNavItem[];
  heading?: string;
}) {
  const related = pickRelated(currentPath, limit, pool);

  // Service -> blog: guides whose "Take it further" card links to this page.
  const isService = [...SERVICE_PAGES, ...DEV_SERVICE_PAGES].some(
    (s) => s.path === currentPath,
  );
  const guides = isService
    ? (await getBlogPosts())
        .filter((p) => relatedServiceBySlug[p.slug] === currentPath)
        .slice(0, 4)
    : [];

  if (!related.length && !guides.length) return null;

  return (
    <section className="border-y border-line bg-obsidian px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        {guides.length > 0 && (
          <div className="mb-14">
            <p className="kicker text-emerald">GUIDES</p>
            <h2 className="mt-5 font-display text-2xl font-semibold text-mist md:text-3xl">
              Read more on this topic
            </h2>
            <ul className="mt-6 space-y-3">
              {guides.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-sage underline decoration-line underline-offset-4 transition-colors hover:text-emerald hover:decoration-emerald"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="kicker text-emerald">RELATED SERVICES</p>
        <h2 className="mt-5 font-display text-2xl font-semibold text-mist md:text-3xl">
          {heading}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {related.map((s) => (
            <Link
              key={s.path}
              href={s.path}
              className="group rounded-[var(--radius-xl)] border border-line bg-forest/30 p-6 transition-colors hover:border-emerald"
            >
              <h3 className="font-display text-lg font-semibold text-mist group-hover:text-emerald">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sage">{s.desc}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-8 inline-flex text-sm text-emerald hover:underline"
        >
          View all services →
        </Link>
      </div>
    </section>
  );
}
