import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DEV_SERVICE_PAGES } from "@/lib/services-nav";

/**
 * Homepage entry point to the web-development pillar. Security stays the lead
 * (hero, H1), but the homepage is the strongest page on the site, so linking
 * every build service from it is what gives those pages a chance to rank.
 */
export function WebDevPillar() {
  // The cost guide is a guide, not a service card; it's linked below.
  const services = DEV_SERVICE_PAGES.filter(
    (s) => s.path !== "/services/wordpress-website-cost",
  );

  return (
    <Section>
      <SectionHeader
        kicker="Web development"
        title="New websites, built secure from day one"
        intro="I don't only clean up hacked sites — I build WordPress, Shopify, WooCommerce and Next.js websites for US businesses, with the security most builds skip already in place."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.path} delay={i * 0.04}>
            <Link
              href={s.path}
              className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-line bg-forest/30 p-6 transition-colors hover:border-emerald"
            >
              <h3 className="font-display text-lg font-semibold text-mist group-hover:text-emerald">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sage">{s.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate">
        Budgeting a new site? See{" "}
        <Link
          href="/services/wordpress-website-cost"
          className="text-emerald hover:underline"
        >
          how much a WordPress website costs
        </Link>
        .
      </p>
    </Section>
  );
}
