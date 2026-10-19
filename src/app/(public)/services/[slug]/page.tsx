import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { QuickAnswer } from "@/components/seo/quick-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedServices } from "@/components/seo/related-services";
import {
  serviceSchema,
  faqPageSchema,
  breadcrumbSchema,
  howToSchema,
} from "@/lib/schema";
import { DEV_SERVICES, getDevService } from "@/lib/dev-services";
import { DEV_SERVICE_PAGES } from "@/lib/services-nav";

/**
 * Web-development service pages. Only the slugs in DEV_SERVICES exist here;
 * the security service pages are their own static folders and take precedence.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return DEV_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getDevService(slug);
  if (!s) return {};
  return {
    title: { absolute: `${s.metaTitle} | Sefat Hossain` },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function DevServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getDevService(slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: s.name,
            description: s.metaDescription,
            path,
            serviceType: s.serviceType,
          }),
          faqPageSchema(s.faqs),
          breadcrumbSchema(crumbs),
          howToSchema({
            name: `How ${s.name} works`,
            description: s.metaDescription,
            steps: s.process,
            path,
          }),
        ]}
      />

      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="kicker text-emerald">WEB DEVELOPMENT SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            {s.h1}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            {s.intro}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              See My Work
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-obsidian px-6 pt-4 md:px-10">
        <div className="mx-auto max-w-6xl">
          <QuickAnswer>{s.quickAnswer}</QuickAnswer>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <div>
            <p className="kicker text-emerald">SECURE BY DEFAULT</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Built by someone who fixes hacked sites for a living
            </h2>
            <p className="mt-6 leading-relaxed text-sage">{s.securityAngle}</p>
            <p className="mt-4 leading-relaxed text-sage">
              Already have a site?{" "}
              <Link
                href="/services/wordpress-security-audit"
                className="text-emerald underline-offset-4 hover:underline"
              >
                Get a WordPress security audit
              </Link>{" "}
              before building on it.
            </p>
            {s.caseStudy && (
              <p className="mt-4 leading-relaxed text-sage">
                Case study:{" "}
                <Link
                  href={`/work/${s.caseStudy.slug}`}
                  className="text-emerald underline-offset-4 hover:underline"
                >
                  {s.caseStudy.label}
                </Link>
              </p>
            )}
          </div>

          <div className="rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-9">
            <p className="kicker text-emerald">A GOOD FIT FOR</p>
            <ul className="mt-6 grid gap-5">
              {s.fit.map((item) => (
                <li key={item} className="flex gap-3 text-mist/90">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-emerald" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WHAT&apos;S INCLUDED</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            What&apos;s included in {s.name}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {s.included.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-line bg-forest/40 p-5 text-mist/90"
              >
                <span className="mr-3 text-emerald">◆</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">HOW IT WORKS</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            From first call to launch
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {s.process.map((step, i) => (
              <div
                key={step.title}
                className="rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7"
              >
                <p className="kicker text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-mist">
                  {step.title}
                </h3>
                <p className="mt-4 leading-relaxed text-sage">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-emerald">FAQ</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
            {s.name} FAQs
          </h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {s.faqs.map((faq) => (
              <div key={faq.question} className="py-7">
                <h3 className="font-display text-lg font-semibold text-mist">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-relaxed text-sage">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices
        currentPath={path}
        pool={DEV_SERVICE_PAGES}
        heading="Explore related web development services"
      />

      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker text-emerald">LET&apos;S BUILD IT</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-5xl">
            Planning a new website or a rebuild?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            Tell me what you need and I&apos;ll come back with a clear plan,
            timeline and quote. Working remotely with businesses across the
            United States.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
