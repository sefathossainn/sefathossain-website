import type { Metadata } from "next";

import { getPageContent, getServicesGrouped, getFaqs } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ServiceGroup } from "@/components/cms/service-group";
import { FaqAccordion } from "@/components/cms/faq-accordion";
import { CtaBand } from "@/components/cms/cta-band";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("services");
  return pageMetadata({ content, path: "/services" });
}

export default async function ServicesPage() {
  const [content, groups, faqs] = await Promise.all([
    getPageContent("services"),
    getServicesGrouped(),
    getFaqs(),
  ]);

  return (
    <>
      <PageHero
        kicker={content.text("hero.kicker")}
        title={content.text("hero.h1")}
        intro={content.text("intro.text")}
        kickerStyle={content.style("hero.kicker")}
        titleStyle={content.style("hero.h1")}
        introStyle={content.style("intro.text")}
      />

      <Section className="!pt-10">
        <div className="grid gap-2">
          {groups.map((g, i) => {
            const isGrow = g.group === "Grow";
            const isSecure = g.group === "Secure";
            return g.services.map((service) => {
              const isSecurity = isSecure || /security/i.test(service.title);
              return (
                <ServiceGroup
                  key={service.id ?? service.group_name}
                  index={i + 1}
                  service={service}
                  highlight={isGrow}
                  learnMoreHref={isSecurity ? "/services/wordpress-malware-removal" : undefined}
                  learnMoreLabel="See our malware removal service"
                />
              );
            });
          })}
        </div>

        {/* Care-plan / pricing note (retainer emphasis) */}
        <Reveal className="mt-8 max-w-2xl">
          <p className="text-sm leading-relaxed text-slate" style={content.style("pricing.note")}>
            {content.text("pricing.note")}
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section surface>
        <SectionHeader kicker="Questions" title="Good to know" />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      {/* CTA */}
      <CtaBand
        title={content.text("cta.headline")}
        titleStyle={content.style("cta.headline")}
        primary={{ label: content.text("cta.primary"), href: "/security-audit" }}
        secondary={{ label: content.text("cta.secondary"), href: "/contact" }}
      />
    </>
  );
}
