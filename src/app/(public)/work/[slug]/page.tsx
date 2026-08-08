import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCaseStudies,
  getCaseStudy,
  getNextCaseStudy,
  getTestimonialById,
} from "@/lib/cms/queries";
import type { CaseCategory } from "@/lib/cms/types";
import { absoluteUrl } from "@/lib/utils";
import { seedAssets } from "@/lib/cms/defaults/media";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { RichText } from "@/components/ui/rich-text";
import { MetricRow } from "@/components/ui/metric-card";
import { TestimonialQuote } from "@/components/cms/testimonial";
import { CtaBand } from "@/components/cms/cta-band";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const revalidate = 3600;

const categoryLabel: Record<CaseCategory, string> = {
  security: "Security & recovery",
  build: "Design & build",
  performance: "Performance",
};

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  const title = study.seo?.title ?? `${study.title} — Case Study`;
  const description = study.seo?.description ?? study.tagline ?? "";
  const image = study.seo?.og_image ?? study.hero_image ?? seedAssets.ogDefault;
  const url = absoluteUrl(`/work/${study.slug}`);
  return {
    title: { absolute: `${title} | Sefat Hossain` },
    description,
    alternates: { canonical: study.seo?.canonical || url },
    robots: study.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const [next, testimonial] = await Promise.all([
    getNextCaseStudy(slug),
    getTestimonialById(study.testimonial_id),
  ]);

  return (
    <article>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />
      {/* Cinematic hero */}
      <header className="relative overflow-hidden pt-32 md:pt-40">
        <div className="container-brand relative z-10">
          <Reveal className="max-w-3xl">
            <Kicker className="mb-6">{categoryLabel[study.category]}</Kicker>
            <h1 className="text-hero font-display font-semibold text-mist [font-size:clamp(2.3rem,1.3rem+3.4vw,4rem)]">
              {study.title}
            </h1>
            {study.tagline && (
              <p className="mt-5 max-w-2xl text-lg text-sage md:text-xl">
                {study.tagline}
              </p>
            )}
          </Reveal>
        </div>

        {/* Hero media */}
        <div className="container-brand relative z-10 mt-12">
          <Reveal
            delay={0.1}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-xl)] border border-line"
          >
            {study.hero_image ? (
              <Parallax amount={5} className="absolute inset-0">
                <Image
                  src={study.hero_image}
                  alt={study.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="scale-125 object-cover"
                />
              </Parallax>
            ) : (
              <CaseHeroAbstract />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
          </Reveal>
        </div>
      </header>

      {/* Narrative */}
      <Section className="!pt-16">
        <div className="mx-auto grid max-w-4xl gap-16">
          <Reveal>
            <Kicker index={1} className="mb-5">
              The situation
            </Kicker>
            <RichText html={study.situation} />
          </Reveal>

          <Reveal>
            <Kicker index={2} className="mb-5">
              How I approached it
            </Kicker>
            <RichText html={study.approach} />
          </Reveal>

          <Reveal>
            <Kicker index={3} className="mb-5">
              The outcome
            </Kicker>
            {/* Metric cards only where a real number exists — never fabricated */}
            {study.metrics.length > 0 && (
              <div className="mb-8">
                <MetricRow metrics={study.metrics} />
              </div>
            )}
            <RichText html={study.outcome} />
          </Reveal>

          {testimonial && (
            <Reveal>
              <TestimonialQuote
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
                avatar={testimonial.avatar}
              />
            </Reveal>
          )}
        </div>
      </Section>

      {/* Next case study */}
      {next && (
        <Section surface>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Kicker className="mb-4">Next case study</Kicker>
              <Link
                href={`/work/${next.slug}`}
                className="font-display text-2xl font-semibold text-mist transition-colors hover:text-emerald md:text-4xl"
              >
                {next.title}
              </Link>
            </div>
            <Button href={`/work/${next.slug}`} variant="secondary">
              Read next →
            </Button>
          </div>
        </Section>
      )}

      <CtaBand
        title="Want work like this on your site?"
        primary={{ label: "Get your free security audit", href: "/security-audit" }}
        secondary={{ label: "Start a project", href: "/contact" }}
      />
    </article>
  );
}

/** Abstract hero for case studies without a real screenshot yet. */
function CaseHeroAbstract() {
  return (
    <div className="absolute inset-0 bg-obsidian">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-evergreen) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-evergreen) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 80% at 50% 40%, #000, transparent)",
          WebkitMaskImage:
            "radial-gradient(80% 80% at 50% 40%, #000, transparent)",
        }}
      />
      <div className="glow-core absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
