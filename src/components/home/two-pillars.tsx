import Link from "next/link";
import type { BlogPost, CaseStudy, Project } from "@/lib/cms/types";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/cms/portfolio-card";
import { ConceptCard } from "@/components/cms/concept-card";
import { LeadAssurance } from "@/components/cms/lead-assurance";
import { SERVICE_PAGES, DEV_SERVICE_PAGES } from "@/lib/services-nav";
import { hackedCta, buildCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Two clear doors on the homepage: WordPress security (malware removal) and
 * web development. Each pillar has its own services, portfolio and guides,
 * so a visitor with either need reaches the right work in one scroll.
 */

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path d="M12 3 5 6v5.5c0 4 2.9 7.4 7 8.5 4.1-1.1 7-4.5 7-8.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const doors = [
  {
    id: "security",
    icon: <ShieldIcon />,
    kicker: "WordPress security",
    title: "My site is hacked or at risk",
    body: "Malware removal, hacked-site recovery, Google blacklist removal and hardening, so the site gets clean and stays clean.",
    points: ["Malware, redirects & spam removed", "Entry point found and closed", "Google warnings lifted"],
    cta: { label: hackedCta.label, href: hackedCta.href },
    accent: true,
  },
  {
    id: "web-development",
    icon: <CodeIcon />,
    kicker: "Web development",
    title: "I need a new website",
    body: "WordPress, Shopify, WooCommerce and Next.js websites for US businesses, built fast and secure from day one.",
    points: ["Custom design, mobile-first", "Speed and SEO built in", "Security and care included"],
    cta: { label: buildCta.label, href: buildCta.href },
    accent: false,
  },
] as const;

/** Pillar chooser — the two doors, right under the hero. */
export function PillarChooser() {
  return (
    <Section className="!py-16">
      <Reveal>
        <p className="kicker text-emerald">How can I help?</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
          Two things I do, and do well
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {doors.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.08}>
            <div
              className={cn(
                "panel relative flex h-full flex-col overflow-hidden p-8 md:p-10",
                d.accent && "border-emerald/40",
              )}
            >
              {d.accent && (
                <div aria-hidden className="glow-core pointer-events-none absolute -right-20 -top-20 h-64 w-64 opacity-70" />
              )}
              <div className="relative flex items-center gap-3">
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl border", d.accent ? "border-emerald/40 bg-emerald/10 text-emerald" : "border-line bg-forest/60 text-mist")}>
                  {d.icon}
                </span>
                <span className="kicker text-sage">{d.kicker}</span>
              </div>
              <h3 className="relative mt-6 font-display text-2xl font-semibold text-mist">{d.title}</h3>
              <p className="relative mt-3 leading-relaxed text-sage">{d.body}</p>
              <ul className="relative mt-6 grid gap-2.5">
                {d.points.map((p) => (
                  <li key={p} className="flex gap-3 text-mist/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-emerald" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                <Button href={d.cta.href} variant={d.accent ? "primary" : "secondary"} size="md">
                  {d.cta.label}
                </Button>
                <a href={`#${d.id}`} className="text-sm font-medium text-emerald hover:underline">
                  See the work ↓
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ServiceLinks({ items }: { items: { name: string; path: string; desc: string }[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={s.path} delay={i * 0.04}>
          <Link
            href={s.path}
            className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-line bg-forest/30 p-6 transition-colors hover:border-emerald"
          >
            <h3 className="font-display text-lg font-semibold text-mist group-hover:text-emerald">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sage">{s.desc}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

function WorkAndGuides({
  workTitle,
  studies,
  posts,
  guidesTitle,
  workHref,
}: {
  workTitle: string;
  studies: CaseStudy[];
  posts: BlogPost[];
  guidesTitle: string;
  workHref: string;
}) {
  return (
    <>
      {studies.length > 0 && (
        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-mist">{workTitle}</h3>
            <Link href={workHref} className="text-sm font-medium text-emerald hover:underline">
              All case studies →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <PortfolioCard study={s} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
      {posts.length > 0 && (
        <div className="mt-14">
          <h3 className="font-display text-xl font-semibold text-mist">{guidesTitle}</h3>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex h-full rounded-xl border border-line bg-forest/20 p-5 text-sm leading-relaxed text-sage transition-colors hover:border-emerald hover:text-mist"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/** Security pillar — services, security portfolio and security guides. */
export function SecurityPillar({
  studies,
  posts,
  workKicker,
  workTitle,
  workIntro,
}: {
  studies: CaseStudy[];
  posts: BlogPost[];
  workKicker: string;
  workTitle: string;
  workIntro: string;
}) {
  const services = SERVICE_PAGES.filter((s) =>
    [
      "/services/wordpress-malware-removal",
      "/services/hacked-wordpress-recovery",
      "/services/emergency-wordpress-malware-removal",
      "/services/google-blacklist-removal",
      "/services/wordpress-redirect-virus-removal",
      "/services/woocommerce-malware-removal",
      "/services/wordpress-security-hardening",
      "/services/wordpress-security-audit",
    ].includes(s.path),
  );
  return (
    <Section id="security" className="scroll-mt-24">
      <SectionHeader kicker={workKicker || "WordPress security"} title={workTitle} intro={workIntro} />
      <ServiceLinks items={services} />
      <WorkAndGuides
        workTitle="Malware removal & security work"
        studies={studies}
        posts={posts}
        guidesTitle="Security guides"
        workHref="/work"
      />
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button href={hackedCta.href} variant="primary" size="lg">{hackedCta.label}</Button>
        <LeadAssurance />
      </div>
    </Section>
  );
}

/**
 * Web development pillar. Keeps the original homepage copy and links for the
 * build services (they rank partly because the homepage links them).
 */
export function WebDevPillar({
  studies,
  posts,
  projects = [],
}: {
  studies: CaseStudy[];
  posts: BlogPost[];
  projects?: Project[];
}) {
  const services = DEV_SERVICE_PAGES.filter((s) => s.path !== "/services/wordpress-website-cost");
  return (
    <Section id="web-development" surface className="scroll-mt-24">
      <SectionHeader
        kicker="Web development"
        title="New websites, built secure from day one"
        intro="I don't only clean up hacked sites — I build WordPress, Shopify, WooCommerce and Next.js websites for US businesses, with the security most builds skip already in place."
      />
      <ServiceLinks items={services} />
      <p className="mt-8 text-sm text-slate">
        Budgeting a new site? See{" "}
        <Link href="/services/wordpress-website-cost" className="text-emerald hover:underline">
          how much a WordPress website costs
        </Link>
        .
      </p>
      <WorkAndGuides
        workTitle="Website design & build work"
        studies={studies}
        posts={posts}
        guidesTitle="Web development guides"
        workHref="/work"
      />
      {projects.length > 0 && (
        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold text-mist">Industry website concepts</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sage">
                Live demo sites I designed and built in WordPress for common US business types. Click through and use them like a real visitor.
              </p>
            </div>
            <Link href="/work#builds" className="text-sm font-medium text-emerald hover:underline">
              All builds →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <Reveal key={p.slug ?? p.title} delay={i * 0.05}>
                <ConceptCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
      <div className="mt-12">
        <Button href={buildCta.href} variant="secondary" size="lg">{buildCta.label}</Button>
      </div>
    </Section>
  );
}
