import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { QuickAnswer } from "@/components/seo/quick-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedServices } from "@/components/seo/related-services";
import { serviceSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { serviceAreas, getServiceArea } from "@/lib/service-areas";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) return {};
  const path = `/service-areas/${area.slug}`;
  return {
    title: `WordPress Malware Removal in ${area.city}, ${area.stateAbbr} | Sefat Hossain`,
    description: `${area.blurb} Fast, remote WordPress malware removal, hacked-site recovery, and security hardening for ${area.city}, ${area.state} businesses.`,
    alternates: { canonical: path },
  };
}

// Shared, valuable service content (same service everywhere) — the city-unique
// content lives in the service-areas data.
const included = [
  "Full malware scan across core files, themes, plugins, and the database",
  "Removal of injected code, spam, redirects, and hidden backdoors",
  "Finding and closing the entry point that let the attacker in",
  "Google blacklist / “deceptive site” warning review and removal",
  "Post-cleanup hardening — updates, access, firewall, and backups",
  "A plain-language summary of what happened and how it's fixed",
];

const process = [
  {
    title: "Assess",
    body: "A quick look at what's actually going on — the symptoms, the scope, and how urgent it is — so you get a clear, honest picture before any work starts.",
  },
  {
    title: "Back up & clean",
    body: "I take a full forensic backup, then remove all malware, injected code, and backdoors across files and the database — carefully, so nothing breaks.",
  },
  {
    title: "Close the door",
    body: "I find the entry point — the outdated plugin, weak login, or vulnerability that was actually used — and close it, because cleaning without that is temporary.",
  },
  {
    title: "Harden & verify",
    body: "I harden the site, request any blacklist review, and verify it's clean across devices — then hand it back with a summary you can actually understand.",
  },
];

const sharedFaqs = [
  {
    question: "Do you work remotely, or do you need to be local?",
    answer:
      "All of this work is done remotely and securely — it doesn't require anyone on-site. What matters is access to your site and hosting and a methodical process, both of which work the same anywhere in the US.",
  },
  {
    question: "How much does WordPress malware removal cost?",
    answer:
      "Most cleanups fall between $100–300 for a simple single-site infection, $300–800 for a deeper compromise with backdoors or a Google warning, and $800–2,500+ for complex or business-critical cases. You get a clear, fixed price after a quick assessment — see the full pricing guide for details.",
  },
  {
    question: "Will the hack come back after you clean it?",
    answer:
      "Not if the entry point is closed. Reinfections happen when a cleanup removes the visible malware but leaves a backdoor or unpatched vulnerability behind. Finding and closing that entry point — plus hardening — is what makes the fix hold.",
  },
];

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) notFound();

  const path = `/service-areas/${area.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: `${area.city}, ${area.stateAbbr}`, path },
  ];

  const faqs = [area.faq, ...sharedFaqs];
  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug);

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: `WordPress Malware Removal in ${area.city}`,
            description: `${area.blurb} Remote WordPress malware removal, hacked-site recovery, and hardening for ${area.city}, ${area.state}.`,
            path,
            serviceType: "WordPress malware removal",
            areaServed: {
              "@type": "City",
              name: area.city,
              containedInPlace: {
                "@type": "State",
                name: area.state,
              },
            },
          }),
          faqPageSchema(faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="kicker text-emerald">
            SERVING {area.city.toUpperCase()}, {area.stateAbbr}
          </p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            WordPress Malware Removal in {area.city}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            {area.intro}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Free Assessment
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Quick answer */}
      <section className="bg-obsidian px-6 pt-4 md:px-10">
        <div className="mx-auto max-w-6xl">
          <QuickAnswer>
            Yes — I remove WordPress malware for {area.city}, {area.state}{" "}
            businesses remotely and fast. That means a full scan, removing all
            injected code and hidden backdoors, closing the entry point, lifting
            any Google blacklist warning, and hardening the site so it doesn&apos;t
            happen again — coordinated around US business hours.
          </QuickAnswer>
        </div>
      </section>

      {/* Local angle */}
      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="kicker text-emerald">
              WORDPRESS SECURITY FOR {area.city.toUpperCase()}
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Built for how {area.city} businesses actually run
            </h2>
            <p className="mt-6 leading-relaxed text-sage">{area.localAngle}</p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-9">
            <p className="kicker text-emerald">WHAT&apos;S INCLUDED</p>
            <ul className="mt-6 grid gap-4">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-mist/90">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-emerald" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">HOW IT WORKS</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            A calm, methodical recovery — not guesswork
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7"
              >
                <span className="font-display text-2xl font-semibold text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-mist">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sage">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-emerald">FAQ</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
            WordPress security in {area.city} — common questions
          </h2>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
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

      {/* Other areas — internal linking / topical cluster */}
      <section className="border-t border-line bg-pine/50 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">ALSO SERVING</p>
          <h2 className="mt-5 font-display text-2xl font-semibold text-mist md:text-3xl">
            WordPress malware removal across the US
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="rounded-full border border-line px-4 py-2 text-sm text-sage transition hover:border-emerald hover:text-emerald"
              >
                {a.city}, {a.stateAbbr}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/wordpress-malware-removal" />

      {/* CTA */}
      <section className="border-t border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker text-emerald">
            {area.city.toUpperCase()} SITE HACKED?
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-5xl">
            Get your {area.city} site clean and back online
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            Tell me what you&apos;re seeing and I&apos;ll assess the actual scope
            — no obligation. You&apos;ll get a clear, fixed price before any work
            starts.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Free Assessment
            </Link>
            <Link
              href="/services/wordpress-malware-removal-cost"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
