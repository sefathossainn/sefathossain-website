import Link from "next/link";
import { SERVICE_PAGES } from "@/lib/services-nav";

/**
 * Contextual internal-linking block — surfaces other security services related
 * to the current page. Improves crawl depth, topical authority, and gives AI
 * engines the cluster of related pages. Excludes the current page.
 */
export function RelatedServices({
  currentPath,
  limit = 4,
}: {
  currentPath: string;
  limit?: number;
}) {
  const related = SERVICE_PAGES.filter((s) => s.path !== currentPath).slice(0, limit);
  if (!related.length) return null;

  return (
    <section className="border-y border-line bg-obsidian px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="kicker text-emerald">RELATED SERVICES</p>
        <h2 className="mt-5 font-display text-2xl font-semibold text-mist md:text-3xl">
          Explore related WordPress security services
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
