import type { Metadata } from "next";

import { getPageContent, getSiteSettings } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";
import { profile } from "@/lib/site-config";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/brand/profile-photo";
import { JsonLd } from "@/components/seo/json-ld";
import { personSchema } from "@/lib/schema";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("about");
  return pageMetadata({ content, path: "/about" });
}

export default async function AboutPage() {
  const [content, settings] = await Promise.all([
    getPageContent("about"),
    getSiteSettings(),
  ]);
  const skills = content.items("skills.items");
  const photo = settings.profile_photo;
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL;

  return (
    <>
      <JsonLd data={personSchema()} />
      <PageHero
        kicker={content.text("hero.kicker")}
        title={content.text("hero.h1")}
        kickerStyle={content.style("hero.kicker")}
        titleStyle={content.style("hero.h1")}
      />

      {/* 01 · Story — the person anchors the page */}
      <Section className="!pt-10">
        <div className="grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="md:sticky md:top-28">
            <ProfilePhoto
              src={photo}
              alt={profile.alt}
              rounded="2xl"
              priority
              className="aspect-[4/5] w-full max-w-sm"
              sizes="(max-width: 768px) 90vw, 420px"
              objectPosition="50% 16%"
            />
            <div className="mt-4">
              <p className="font-display text-base font-semibold text-mist">
                {profile.name}
              </p>
              <p className="kicker mt-1 text-slate">{profile.shortRole}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Kicker className="mb-5" style={content.style("story.kicker")}>{content.text("story.kicker")}</Kicker>
            <p className="text-xl leading-relaxed text-mist/90 md:text-2xl" style={content.style("story.body")}>
              {content.text("story.body")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 02 · The belief */}
      <Section surface className="text-center">
        <Reveal className="mx-auto max-w-4xl">
          <Kicker emerald className="mb-8 justify-center" style={content.style("belief.kicker")}>
            {content.text("belief.kicker")}
          </Kicker>
          <p className="text-balance font-display text-[clamp(1.6rem,1rem+2.6vw,3rem)] font-medium leading-[1.15] tracking-tight text-mist" style={content.style("belief.headline")}>
            {content.text("belief.headline")}
          </p>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-sage" style={content.style("belief.body")}>
            {content.text("belief.body")}
          </p>
        </Reveal>
      </Section>

      {/* 03 · How I work + 04 · Skills */}
      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <Kicker className="mb-5" style={content.style("work.kicker")}>{content.text("work.kicker")}</Kicker>
            <p className="text-lg leading-relaxed text-sage" style={content.style("work.body")}>
              {content.text("work.body")}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Kicker className="mb-5" style={content.style("skills.kicker")}>{content.text("skills.kicker")}</Kicker>
            <ul className="grid gap-4">
              {skills.map((skill, i) => (
                <li key={i} className="flex gap-3 text-mist/90" style={content.style("skills.items")}>
                  <span
                    aria-hidden
                    className="mt-[0.5em] h-[0.55rem] w-[0.55rem] shrink-0 rotate-[-45deg] border-b-[1.5px] border-l-[1.5px] border-emerald"
                  />
                  <span className="leading-relaxed">{skill}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 05 · Outside work + 06 · Credentials */}
      <Section surface>
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <Kicker className="mb-5" style={content.style("outside.kicker")}>{content.text("outside.kicker")}</Kicker>
            <p className="leading-relaxed text-sage" style={content.style("outside.body")}>
              {content.text("outside.body")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Kicker className="mb-5" style={content.style("credentials.kicker")}>
              {content.text("credentials.kicker")}
            </Kicker>
            <p className="leading-relaxed text-sage" style={content.style("credentials.body")}>
              {content.text("credentials.body")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-display font-display font-semibold text-mist">
            Let&rsquo;s build something you never have to worry about.
          </h2>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary" size="lg">
              {content.text("cta.primary")}
            </Button>
            {cvUrl && (
              <Button href={cvUrl} variant="secondary" size="lg">
                {content.text("cta.secondary")}
              </Button>
            )}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
