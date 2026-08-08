import Link from "next/link";
import Image from "next/image";
import type { CaseStudy, CaseCategory } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const categoryLabel: Record<CaseCategory, string> = {
  security: "Security",
  build: "Build",
  performance: "Performance",
};

/** On-brand abstract thumbnail for case studies without a real screenshot. */
function AbstractThumb() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-obsidian">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-evergreen) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-evergreen) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(70% 70% at 70% 30%, #000, transparent)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 70% 30%, #000, transparent)",
        }}
      />
      <div className="glow-core absolute -right-10 -top-10 h-56 w-56" />
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-4 left-5 h-20 w-20 text-emerald/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <polygon points="50,12 84,32 84,68 50,88 16,68 16,32" />
        <polygon points="50,30 68,41 68,59 50,70 32,59 32,41" />
      </svg>
    </div>
  );
}

export function CaseStudyCard({
  study,
  className,
  priority,
}: {
  study: CaseStudy;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-forest/40",
        "transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-evergreen",
        "hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {study.hero_image ? (
          <Image
            src={study.hero_image}
            alt={study.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          />
        ) : (
          <AbstractThumb />
        )}
        {/* scan-line pass on hover — a quiet nod to a security sweep */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
        <span className="kicker absolute left-5 top-5 rounded-full border border-line/80 bg-obsidian/60 px-3 py-1 text-[0.66rem] text-sage backdrop-blur">
          {categoryLabel[study.category]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-title font-display font-semibold text-mist">
          {study.title}
        </h3>
        {study.tagline && (
          <p className="mt-2 text-sm text-sage">{study.tagline}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald">
          Read the case study
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
