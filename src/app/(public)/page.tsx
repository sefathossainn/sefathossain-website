import type { Metadata } from "next";

import {
  getPageContent,
  getTestimonials,
  getSiteSettings,
  getCaseStudies,
  getBlogPosts,
} from "@/lib/cms/queries";
import { signatureQuote } from "@/lib/cms/defaults/testimonials";
import { pageMetadata } from "@/lib/seo";

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
  const [content, studies, posts, testimonials, settings] = await Promise.all([
    getPageContent("home"),
    getCaseStudies(),
    getBlogPosts(),
    getTestimonials(),
    getSiteSettings(),
  ]);
  // Split work and guides into the two pillars (security vs web development).
  const securityStudies = studies.filter((s) => s.category === "security").slice(0, 3);
  const devStudies = studies.filter((s) => s.category !== "security").slice(0, 3);
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
      <WebDevPillar studies={devStudies} posts={devPosts} />

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
