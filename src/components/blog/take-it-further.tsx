import Link from "next/link";
import { Kicker } from "@/components/ui/kicker";
import type { CaseStudy } from "@/lib/cms/types";
import type { ServiceNavItem } from "@/lib/services-nav";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
      fill="none"
    >
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * "Take it further" — internal-linking block at the foot of a post: a relevant
 * case study (proof) and the matching service (conversion). Strong for SEO
 * (topic clustering) and for turning readers into leads.
 */
export function TakeItFurther({
  caseStudy,
  service,
}: {
  caseStudy?: CaseStudy | null;
  service: ServiceNavItem;
}) {
  if (!caseStudy && !service) return null;

  return (
    <div>
      <Kicker>Related</Kicker>
      <h2 className="mt-4 font-display text-[clamp(1.9rem,1.3rem+2vw,2.75rem)] font-semibold tracking-tight text-mist">
        Take it further.
      </h2>

      <div className="mt-9 grid gap-6 md:grid-cols-2">
        {caseStudy && (
          <Link
            href={`/work/${caseStudy.slug}`}
            className="group flex flex-col rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7 transition-colors hover:border-emerald/50 md:p-8"
          >
            <p className="kicker text-emerald">Case study</p>
            <h3 className="mt-4 font-display text-xl font-semibold text-mist md:text-2xl">
              {caseStudy.title}
            </h3>
            {caseStudy.tagline && (
              <p className="mt-3 leading-relaxed text-sage">
                {caseStudy.tagline}
              </p>
            )}
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-emerald">
              Read the case study <Arrow />
            </span>
          </Link>
        )}

        <Link
          href={service.path}
          className="group flex flex-col rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7 transition-colors hover:border-emerald/50 md:p-8"
        >
          <p className="kicker text-emerald">Service</p>
          <h3 className="mt-4 font-display text-xl font-semibold text-emerald md:text-2xl">
            {service.name}
          </h3>
          <p className="mt-3 leading-relaxed text-sage">{service.desc}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-emerald">
            See the service <Arrow />
          </span>
        </Link>
      </div>
    </div>
  );
}
