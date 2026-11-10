import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { breadcrumbSchema } from "@/lib/schema";
import { INDUSTRY_WEBSITES } from "@/lib/industry-websites";
import { DEV_SERVICE_PAGES } from "@/lib/services-nav";
import { buildCta } from "@/lib/site-config";

const PATH = "/website-design";

export const metadata: Metadata = {
  title: { absolute: "Website Design for Small Businesses by Industry | Sefat Hossain" },
  description:
    "Website design for US small businesses, by industry: law firms, roofing companies, dentists and real estate agents. Live demo sites, built fast and secure in WordPress.",
  alternates: { canonical: PATH },
};

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Website design", path: PATH },
];

export default function WebsiteDesignHub() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <section className="border-b border-line bg-obsidian px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={CRUMBS} className="mb-6" />
          <p className="kicker text-emerald">WEB DEVELOPMENT</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            Website design for small businesses, by industry
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-sage">
            Every industry wins clients differently. A law firm needs case reviews, a roofer needs inspection requests, a dentist needs bookings, an agent needs buyer and seller leads. Pick yours to see what the site needs and a live demo I built for it.
          </p>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {INDUSTRY_WEBSITES.map((i) => (
            <Link key={i.slug} href={`/website-design/${i.slug}`} className="group overflow-hidden rounded-[var(--radius-xl)] border border-line bg-forest/30 transition-colors hover:border-emerald">
              <div className="relative aspect-[16/9]">
                <Image src={i.demo.image} alt={`${i.demo.name} concept website`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-7">
                <h2 className="font-display text-2xl font-semibold text-mist group-hover:text-emerald">{i.h1}</h2>
                <p className="mt-3 text-sm leading-relaxed text-sage">{i.metaDescription}</p>
                <span className="mt-5 inline-flex text-sm font-medium text-emerald">See what it needs →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-pine/50 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold text-mist">Web development services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {DEV_SERVICE_PAGES.map((s) => (
              <Link key={s.path} href={s.path} className="rounded-full border border-line px-4 py-2 text-sm text-sage transition hover:border-emerald hover:text-emerald">
                {s.name}
              </Link>
            ))}
          </div>
          <Link href={buildCta.href} className="mt-10 inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90">
            {buildCta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
