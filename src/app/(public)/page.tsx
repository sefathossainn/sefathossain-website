import type { Metadata } from "next";

import {
  getPageContent,
  getTestimonials,
  getSiteSettings,
  getCaseStudies,
  getBlogPosts,
  getProjects,
} from "@/lib/cms/queries";
import { signatureQuote } from "@/lib/cms/defaults/testimonials";
import { pageMetadata } from "@/lib/seo";
import { buildCta } from "@/lib/site-config";

import { HomeHero } from "@/components/home/home-hero";
import { BuildSecureGrow } from "@/components/home/build-secure-grow";
import {
  PillarChooser,
  SecurityPillar,
  WebDevPillar,
} from "@/components/home/two-pillars";
import { Section } from "@/components/ui/section";
import { GetShieldedFeature } from "@/components/home/get-shielded-feature";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { TestimonialsShowcase } from "@/components/home/testimonials-showcase";
import { CtaBand } from "@/components/cms/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  professionalServiceSchema,
  reviewSchema,
} from "@/lib/schema";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("home");
  return pageMetadata({ content, path: "/" });
}

export default async function HomePage() {
  const [content, studies, posts, projects, testimonials, settings] = await Promise.all([
    getPageContent("home"),
    getCaseStudies(),
    getBlogPosts(),
    getProjects(),
    getTestimonials(),
    getSiteSettings(),
  ]);
  // Split work and guides into the two pillars (security vs web development).
  // Homepage shows only case studies with a real screenshot; the rest stay on /work.
  const withImage = studies.filter((s) => Boolean(s.hero_image));
  const securityStudies = withImage.filter((s) => s.category === "security").slice(0, 3);
  const devStudies = withImage.filter((s) => s.category !== "security").slice(0, 3);
  const SECURITY_CATS = ["Security", "Malware Removal"];
  const securityPosts = posts.filter((p) => SECURITY_CATS.includes(p.category ?? "")).slice(0, 3);
  const devPosts = posts.filter((p) => p.category && !SECURITY_CATS.includes(p.category)).slice(0, 3);
  const photo = settings.profile_photo;
  const reviews = reviewSchema(testimonials);

  return (
    <>
      <JsonLd
        data={[
          professionalServiceSchema(),
          ...(reviews ? [reviews] : []),
        ]}
      />
      <HomeHero content={content} photo={photo} />

      {/* 01b · Two doors: security or web development */}
      <PillarChooser />

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

      {/* 04 · Security pillar — services, work, guides (keeps the CMS
          "work" heading copy that used to title the featured-work grid) */}
      <SecurityPillar
        studies={securityStudies}
        posts={securityPosts}
        workKicker={content.text("work.kicker")}
        workTitle={content.text("work.headline")}
        workIntro={content.text("work.subhead")}
      />

      {/* 04b · Web-development pillar — services, work, guides */}
      <WebDevPillar studies={devStudies} posts={devPosts} projects={projects.slice(0, 4)} />

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

      {/* 07 · Lead magnets — one free first step per pillar. The security
          card keeps its CMS copy; the build card offers a website review. */}
      <Section className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="panel relative h-full overflow-hidden border-emerald/40 p-9 md:p-12">
            <div
              aria-hidden
              className="glow-core pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem]"
            />
            <div className="relative flex h-full flex-col">
              <p className="kicker kicker-emerald mb-6" style={content.style("audit.kicker")}>
                {content.text("audit.kicker")}
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-mist md:text-4xl" style={content.style("audit.headline")}>
                {content.text("audit.headline")}
              </h2>
              <p className="mt-6 leading-relaxed text-sage" style={content.style("audit.body")}>
                {content.text("audit.body")}
              </p>
              <div className="mt-auto pt-9">
                <Button href="/security-audit" variant="primary" size="lg">
                  {content.text("audit.cta")}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="panel relative h-full overflow-hidden border-emerald/40 p-9 md:p-12">
            <div
              aria-hidden
              className="glow-core pointer-events-none absolute -left-24 -top-24 h-[26rem] w-[26rem]"
            />
            <div className="relative flex h-full flex-col">
              <p className="kicker kicker-emerald mb-6">Free website review</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-mist md:text-4xl">
                Planning a new site? Get a free review and a fixed quote.
              </h2>
              <p className="mt-6 leading-relaxed text-sage">
                Send me your current site or your idea. I&apos;ll look at speed,
                mobile, SEO and what&apos;s holding it back, then reply with a
                short plain-language review and a fixed price for the work. No
                obligation.
              </p>
              <ul className="mt-6 grid gap-2.5 text-sm text-mist/90">
                {["Speed, mobile and SEO check", "What to keep, fix or rebuild", "Fixed quote, no hourly surprises"].map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-emerald" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-9">
                <Button href={buildCta.href} variant="primary" size="lg">
                  Get my free website review
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
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
