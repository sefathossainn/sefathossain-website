import type { Metadata } from "next";

import { getPageContent, getServicesGrouped, getFaqs } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ServiceGroup, type ServiceLink } from "@/components/cms/service-group";
import { FaqAccordion } from "@/components/cms/faq-accordion";
import { CtaBand } from "@/components/cms/cta-band";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("services");
  return pageMetadata({ content, path: "/services" });
}

const SECURITY_SERVICE_LINKS: ServiceLink[] = [
  { href: "/services/wordpress-malware-removal", label: "Explore WordPress Malware Removal" },
  { href: "/services/hacked-wordpress-recovery", label: "Explore Hacked WordPress Recovery" },
  { href: "/services/wordpress-security-hardening", label: "Explore WordPress Security Hardening" },
  { href: "/services/google-blacklist-removal", label: "Explore Google Blacklist Removal" },
  { href: "/services/cloudflare-security", label: "Explore Cloudflare Security" },
  { href: "/services/wordpress-security-audit", label: "Explore WordPress Security Audit" },
];

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
            return g.services.map((service) => {
              const isMalwareRemovalService =
                service.title === "Website Security & Malware Removal";

              return (
                <ServiceGroup
                  key={service.id ?? service.group_name}
                  index={i + 1}
                  service={service}
                  highlight={isGrow}
                  links={isMalwareRemovalService ? SECURITY_SERVICE_LINKS : undefined}
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
