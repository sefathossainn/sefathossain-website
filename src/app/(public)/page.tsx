import type { Metadata } from "next";

import {
  getPageContent,
  getFeaturedCaseStudies,
  getTestimonials,
  getSiteSettings,
} from "@/lib/cms/queries";
import { signatureQuote } from "@/lib/cms/defaults/testimonials";
import { pageMetadata } from "@/lib/seo";

import { HomeHero } from "@/components/home/home-hero";
import { BuildSecureGrow } from "@/components/home/build-secure-grow";
import { Section, SectionHeader } from "@/components/ui/section";
import { GetShieldedFeature } from "@/components/home/get-shielded-feature";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/cms/case-study-card";
import { TestimonialsShowcase } from "@/components/home/testimonials-showcase";
import { CtaBand } from "@/components/cms/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { personSchema, professionalServiceSchema } from "@/lib/schema";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("home");
  return pageMetadata({ content, path: "/" });
}

export default async function HomePage() {
  const [content, featured, testimonials, settings] = await Promise.all([
    getPageContent("home"),
    getFeaturedCaseStudies(3),
    getTestimonials(),
    getSiteSettings(),
  ]);
  const photo = settings.profile_photo;

  return (
    <>
      <JsonLd data={[personSchema(), professionalServiceSchema()]} />
      <HomeHero content={content} photo={photo} />

      {/* 02 · Trust strip */}
      <Section className="!py-14">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-sage" style={content.style("trust.text")}>
            {content.text("trust.text")}
          </p>
        </Reveal>
      </Section>

      {/* 03 · Build · Secure · Grow */}
      <BuildSecureGrow content={content} />

      {/* 04 · Featured work */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            kicker={content.text("work.kicker")}
            title={content.text("work.headline")}
            intro={content.text("work.subhead")}
            kickerStyle={content.style("work.kicker")}
            titleStyle={content.style("work.headline")}
            introStyle={content.style("work.subhead")}
          />
          <Reveal delay={0.1}>
            <Button href="/work" variant="secondary">
              {content.text("work.cta")}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyCard study={study} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05 · The belief — motion calms, type-forward */}
      <Section surface className="text-center">
        <Reveal className="mx-auto max-w-4xl">
          <p className="kicker kicker-emerald mb-8 justify-center" style={content.style("belief.kicker")}>
            {content.text("belief.kicker")}
          </p>
          <p className="text-balance font-display text-[clamp(1.6rem,1rem+2.6vw,3rem)] font-medium leading-[1.15] tracking-tight text-mist" style={content.style("belief.headline")}>
            {content.text("belief.headline")}
          </p>
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-sage" style={content.style("belief.body")}>
            {content.text("belief.body")}
          </p>
        </Reveal>
      </Section>

      {/* 06 · Testimonials — sliding showcase (real, or Sefat's signature line) */}
      <Section>
        <TestimonialsShowcase
          kicker={content.text("testimonials.kicker")}
          headline={content.text("testimonials.headline")}
          statNumber={content.text("testimonials.stat_number")}
          statLabel={content.text("testimonials.stat_label")}
          statSubtext={content.text("testimonials.stat_subtext")}
          autoplay={content.text("testimonials.slider_autoplay") !== "false"}
          interval={Number(content.text("testimonials.slider_interval")) || 6}
          kickerStyle={content.style("testimonials.kicker")}
          headlineStyle={content.style("testimonials.headline")}
          testimonials={testimonials}
          signature={{
            quote: signatureQuote.quote,
            author: signatureQuote.author,
            role: signatureQuote.role,
            avatar: photo,
          }}
        />
      </Section>

      {/* 07 · Lead magnet — the one bright moment */}
      <Section className="overflow-hidden">
        <Reveal className="panel relative overflow-hidden p-10 md:p-16">
          <div
            aria-hidden
            className="glow-core pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem]"
          />
          <div className="relative max-w-2xl">
            <p className="kicker kicker-emerald mb-6" style={content.style("audit.kicker")}>
              {content.text("audit.kicker")}
            </p>
            <h2 className="text-display font-display font-semibold text-mist" style={content.style("audit.headline")}>
              {content.text("audit.headline")}
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-sage" style={content.style("audit.body")}>
              {content.text("audit.body")}
            </p>
            <Button
              href="/security-audit"
              variant="primary"
              size="lg"
              className="mt-9"
            >
              {content.text("audit.cta")}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 08 · Final CTA */}
      <CtaBand
        title={content.text("final.headline")}
        titleStyle={content.style("final.headline")}
        primary={{ label: content.text("final.cta_primary"), href: "/contact" }}
        secondary={{
          label: content.text("final.cta_secondary"),
          href: "/contact",
        }}
      />

      {/* 09 · Agency partner — Get Shielded */}
      <Section>
        <GetShieldedFeature
          eyebrow={content.text("getshielded.eyebrow")}
          blurb={content.text("getshielded.blurb")}
          cta={content.text("getshielded.cta")}
          url={content.text("getshielded.url")}
          logo={content.image("getshielded.logo")}
        />
      </Section>
    </>
  );
}
