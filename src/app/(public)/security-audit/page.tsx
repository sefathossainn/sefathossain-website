import type { Metadata } from "next";

import { getPageContent, getSiteSettings } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { AuditForm } from "@/components/forms/audit-form";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("security-audit");
  return pageMetadata({ content, path: "/security-audit" });
}

export default async function SecurityAuditPage() {
  const [content, settings] = await Promise.all([
    getPageContent("security-audit"),
    getSiteSettings(),
  ]);
  const whatYouGet = content.items("what.items");

  return (
    <>
      <PageHero
        kicker={content.text("hero.kicker")}
        title={content.text("hero.h1")}
        intro={content.text("offer.body")}
        kickerStyle={content.style("hero.kicker")}
        titleStyle={content.style("hero.h1")}
        introStyle={content.style("offer.body")}
      />

      <Section className="!pt-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* What you get */}
          <Reveal>
            <Kicker className="mb-6">{content.text("what.kicker")}</Kicker>
            <ul className="grid gap-5">
              {whatYouGet.map((item, i) => (
                <li key={i} className="flex gap-4" style={content.style("what.items")}>
                  <span className="mt-1 font-mono text-sm text-emerald">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-mist/90">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form — the one bright moment */}
          <Reveal delay={0.1} className="relative">
            <div
              aria-hidden
              className="glow-core pointer-events-none absolute -inset-10 -z-0"
            />
            <div className="panel relative z-10 p-8 md:p-10">
              <h2 className="mb-6 font-display text-2xl font-semibold text-mist">
                Request your free audit
              </h2>
              <AuditForm calendarUrl={settings.calendar_url} />
              <p className="mt-6 text-sm leading-relaxed text-slate" style={content.style("reassurance.text")}>
                {content.text("reassurance.text")}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
