import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const badge: Record<CaseStudy["category"], string> = {
  security: "Malware Removal & Security",
  build: "Website Design & Build",
  performance: "Speed & Performance",
};

/** Plain text from CMS HTML, trimmed to a sentence-ish length. */
function plain(html: string | undefined, max: number) {
  const text = (html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "") + "…";
}

/**
 * Portfolio card: what the client had, what changed, and the result in one
 * glance. The result line uses a real metric when one is recorded, otherwise
 * the opening of the case study's outcome — never an invented number.
 */
export function PortfolioCard({
  study,
  priority,
  className,
}: {
  study: CaseStudy;
  priority?: boolean;
  className?: string;
}) {
  const metric = study.metrics?.[0];
  const result = metric
    ? `${metric.value} ${metric.label}`.trim()
    : plain(study.outcome, 90);
  const summary = study.tagline || plain(study.situation, 140);
  const isSecurity = study.category === "security";

  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-forest/40",
        "transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-evergreen",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
        {study.hero_image ? (
          <Image
            src={study.hero_image}
            alt={study.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--color-evergreen) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-evergreen) 55%, transparent) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(70% 70% at 70% 30%, #000, transparent)",
              WebkitMaskImage: "radial-gradient(70% 70% at 70% 30%, #000, transparent)",
            }}
          />
        )}
        <span
          className={cn(
            "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur",
            isSecurity
              ? "border-emerald/40 bg-obsidian/70 text-emerald"
              : "border-line bg-obsidian/70 text-mist",
          )}
        >
          <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", isSecurity ? "bg-emerald" : "bg-sage")} />
          {badge[study.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-mist group-hover:text-emerald">
          {study.title}
        </h3>
        {summary && (
          <p className="mt-3 text-sm leading-relaxed text-sage">{summary}</p>
        )}
        {result && (
          <p className="mt-5 flex gap-2.5 rounded-xl border border-emerald/25 bg-emerald/[0.07] p-3.5 text-sm leading-snug text-mist">
            <span aria-hidden className="mt-0.5 text-emerald">↗</span>
            {result}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="inline-flex items-center gap-1.5 text-slate">
            <span aria-hidden className="text-emerald">✓</span> Real client project
          </span>
          <span className="font-medium text-emerald">
            View case study{" "}
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
