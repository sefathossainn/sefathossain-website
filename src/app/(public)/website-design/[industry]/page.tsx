import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { QuickAnswer } from "@/components/seo/quick-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedServices } from "@/components/seo/related-services";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { INDUSTRY_WEBSITES, getIndustryWebsite } from "@/lib/industry-websites";
import { DEV_SERVICE_PAGES } from "@/lib/services-nav";
import { buildCta } from "@/lib/site-config";
import { withBrand } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_WEBSITES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const i = getIndustryWebsite(industry);
  if (!i) return {};
  return {
    title: { absolute: withBrand(i.metaTitle) },
    description: i.metaDescription,
    alternates: { canonical: `/website-design/${i.slug}` },
  };
}

const process = [
  { title: "Plan", body: "We agree on your goals, pages, forms and integrations, and you get a fixed quote and timeline before any design starts." },
  { title: "Design", body: "Homepage and key page designs for desktop and mobile, built around the one action you want visitors to take." },
  { title: "Build", body: "A fast WordPress build you can edit yourself, with SEO foundations, speed tuning and accessibility checks." },
  { title: "Secure and launch", body: "Hardening, backups and monitoring set up before launch, then a walkthrough so your team can manage the site." },
];

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const i = getIndustryWebsite(industry);
  if (!i) notFound();

  const path = `/website-design/${i.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: i.h1, path },
  ];
  const others = INDUSTRY_WEBSITES.filter((o) => o.slug !== i.slug);

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({ name: i.h1, description: i.metaDescription, path, serviceType: "Website design" }),
          faqPageSchema(i.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-line bg-obsidian px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Breadcrumbs items={crumbs} className="mb-6" />
            <p className="kicker text-emerald">WEB DESIGN FOR {i.plural.toUpperCase()}</p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">{i.h1}</h1>
            <p className="mt-7 text-lg leading-relaxed text-sage">{i.intro}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={buildCta.href} className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3.5 font-medium text-obsidian transition hover:opacity-90">
                {buildCta.label}
              </Link>
              <a href={i.demo.url} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald">
                View the live demo ↗
              </a>
            </div>
          </div>
          <a href={i.demo.url} target="_blank" rel="noopener" className="group relative block overflow-hidden rounded-[var(--radius-xl)] border border-line">
            <div className="relative aspect-[16/10]">
              <Image src={i.demo.image} alt={`${i.demo.name} concept website homepage`} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <span className="absolute left-4 top-4 rounded-full border border-line bg-obsidian/80 px-3 py-1 text-xs font-medium text-mist backdrop-blur">Website concept</span>
          </a>
        </div>
      </section>

      <section className="bg-obsidian px-6 pt-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <QuickAnswer>{i.quickAnswer}</QuickAnswer>
        </div>
      </section>

      {/* Must-haves */}
      <section className="bg-obsidian px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WHAT IT NEEDS</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            What a {i.industry} website needs to win clients
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {i.mustHaves.map((m) => (
              <div key={m.title} className="rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7">
                <h3 className="font-display text-lg font-semibold text-mist">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sage">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker text-emerald">LIVE DEMO</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">See a {i.industry} site I built</h2>
            <p className="mt-5 leading-relaxed text-sage">
              {i.demo.blurb} It is a concept site for a fictional business, built in WordPress to show what your site could look and work like. Click around it like a real visitor would.
            </p>
            <a href={i.demo.url} target="_blank" rel="noopener" className="mt-7 inline-flex text-sm font-medium text-emerald hover:underline">
              Open {i.demo.name} ↗
            </a>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-mist">Common {i.industry} website mistakes</h3>
            <ul className="mt-5 grid gap-3">
              {i.mistakes.map((m) => (
                <li key={m} className="flex gap-3 leading-relaxed text-sage">
                  <span aria-hidden className="mt-0.5 text-[#e88c7d]">✕</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process + security */}
      <section className="bg-obsidian px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">HOW IT WORKS</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">From plan to launch, with security built in</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, n) => (
              <div key={p.title} className="rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7">
                <span className="font-display text-2xl font-semibold text-emerald">{String(n + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-mist">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sage">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-relaxed text-sage">
            I also clean hacked WordPress sites for a living, so every site I build ships with a small, vetted plugin set, locked-down logins, a firewall, off-site backups and update monitoring. Budgeting? See{" "}
            <Link href="/services/wordpress-website-cost" className="text-emerald hover:underline">how much a WordPress website costs</Link>, or read about my{" "}
            <Link href={i.service.href} className="text-emerald hover:underline">{i.service.name}</Link> service.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-obsidian px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-emerald">FAQ</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">{i.h1}: common questions</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {i.faqs.map((f) => (
              <div key={f.question} className="py-7">
                <h3 className="font-display text-lg font-semibold text-mist">{f.question}</h3>
                <p className="mt-3 leading-relaxed text-sage">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="border-t border-line bg-pine/50 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold text-mist">Website design for other industries</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/website-design/${o.slug}`} className="rounded-full border border-line px-4 py-2 text-sm text-sage transition hover:border-emerald hover:text-emerald">
                {o.h1}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices currentPath={path} pool={DEV_SERVICE_PAGES} heading="Explore web development services" />

      {/* CTA */}
      <section className="border-t border-line bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-mist md:text-4xl">Want a site like this for your {i.industry}?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-sage">
            Tell me about your business and what the site needs to do. You&apos;ll get a plan and a fixed quote before any work starts.
          </p>
          <Link href={buildCta.href} className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90">
            {buildCta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
