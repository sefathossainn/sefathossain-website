import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { QuickAnswer } from "@/components/seo/quick-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LeadAssurance } from "@/components/cms/lead-assurance";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig, hackedCta } from "@/lib/site-config";
import { serviceAreas } from "@/lib/service-areas";
import {
  listStateBreachLaws,
  BREACH_LAWS_CHECKED,
} from "@/lib/state-breach-laws";

/**
 * Linkable reference page: US state data-breach notification rules, framed
 * for an owner whose website was hacked. Content comes from
 * lib/state-breach-laws (each entry checked against its linked source), so
 * adding a verified state there adds it here and on its city pages.
 */

const PATH = "/resources/data-breach-notification-laws";
const TITLE = "Data Breach Notification Laws by State (2026): Hacked Website Guide";
const DESCRIPTION =
  "Your website was hacked and customer data may be exposed. State-by-state notification deadlines, who to tell, and official sources, in plain English.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    url: absoluteUrl(PATH),
    title: TITLE,
    description: DESCRIPTION,
  },
};

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Resources", path: PATH },
  { name: "Data breach notification laws", path: PATH },
];

const firstSteps = [
  {
    title: "Stop the leak",
    body: "Contain the hack first: put the site in maintenance mode, change every password and revoke unknown admin accounts. Notification rules apply on top of fixing the site, not instead of it.",
  },
  {
    title: "Keep the evidence",
    body: "Back up the hacked site as it is, with server and access logs. You need them to work out what data was reached and when, which drives every deadline below.",
  },
  {
    title: "Work out what was exposed",
    body: "Most laws only apply to specific data: names together with Social Security, driver's license or financial account numbers, or a username or email with its password. Check your database, forms, order records and backups.",
  },
  {
    title: "Find out where affected people live",
    body: "The law that applies is the state where each affected person lives, not where your business is. One breach can trigger several states' rules.",
  },
  {
    title: "Talk to a lawyer, then notify",
    body: "Deadlines run from when you discover the breach. Use the summaries below to understand the shape of your obligations, then confirm them with an attorney before sending notices.",
  },
];

const faqs = [
  {
    question: "Does a hacked website count as a data breach?",
    answer:
      "Only if the attacker got (or likely got) personal information covered by a state's law, such as names with Social Security or financial account numbers, or login credentials. A defaced page or a spam redirect with no data access usually is not a notifiable breach, but you need evidence to show that.",
  },
  {
    question: "Which state's law applies to my business?",
    answer:
      "Generally the law of each state where an affected person lives. A small business in Texas whose customers live in California and New York can owe notices under all three states' rules.",
  },
  {
    question: "When does the notification deadline start?",
    answer:
      "Most state laws count from when the breach is discovered (or reasonably should have been), not from when the attacker first got in. That is why quick detection and good logs matter.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. It is a plain-English summary checked against the linked official sources, to help you understand what to ask your attorney. Laws change; always confirm before acting.",
  },
];

export default function BreachLawsPage() {
  const states = listStateBreachLaws();
  const url = absoluteUrl(PATH);
  const citeHtml = `<a href="${url}">State data breach notification laws for hacked websites</a>`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    about: states.map((s) => ({
      "@type": "Legislation",
      name: s.law.statute,
      legislationJurisdiction: s.name,
    })),
  };

  return (
    <main>
      <JsonLd
        data={[articleSchema, faqPageSchema(faqs), breadcrumbSchema(CRUMBS)]}
      />

      {/* Hero */}
      <section className="border-b border-line bg-obsidian px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={CRUMBS} className="mb-6" />
          <p className="kicker text-emerald">FREE RESOURCE · CHECKED {BREACH_LAWS_CHECKED.toUpperCase()}</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-mist md:text-5xl">
            Data breach notification laws by state: a guide for hacked websites
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-sage">
            If your website was hacked and customer data may have been
            exposed, state law may give you a deadline to tell the people
            affected and the state. This page summarizes those rules in plain
            English, state by state, with a link to the official source for
            every one.
          </p>
        </div>
      </section>

      <section className="bg-obsidian px-6 pt-10 md:px-10">
        <div className="mx-auto max-w-4xl">
          <QuickAnswer>
            Every US state has a data breach notification law. Most require
            you to notify affected residents without unreasonable delay, and
            several set a fixed limit, often 30 to 60 days from discovery.
            Many also require notice to the state Attorney General above a set
            number of affected residents. The law of each affected person&apos;s
            state applies, not just your own.
          </QuickAnswer>
        </div>
      </section>

      {/* First steps */}
      <section className="bg-obsidian px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-emerald">BEFORE YOU NOTIFY ANYONE</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
            First steps after a hack that may have exposed data
          </h2>
          <ol className="mt-10 grid gap-5">
            {firstSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-[var(--radius-xl)] border border-line bg-forest/30 p-6"
              >
                <span className="font-display text-2xl font-semibold text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-mist">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-sage">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Jump list */}
      <section className="border-t border-line bg-pine/50 px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-mist">
            States covered ({states.length})
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sage">
            Each state below was checked against the linked official source.
            States are added only once their law has been verified.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {states.map((s) => (
              <a
                key={s.abbr}
                href={`#${s.slug}`}
                className="rounded-full border border-line px-4 py-2 text-sm text-sage transition hover:border-emerald hover:text-emerald"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* States */}
      <section className="bg-obsidian px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-4xl gap-10">
          {states.map((s) => {
            const city = serviceAreas.find((a) => a.stateAbbr === s.abbr);
            const rows = (
              [
                ["The law", s.law.statute],
                ["What counts as personal information", s.law.personalInfo],
                ["Notifying affected people", s.law.residentDeadline],
                ["Notifying the state", s.law.regulatorNotice],
              ] as const
            ).filter(([, detail]) => !!detail);
            return (
              <article
                key={s.abbr}
                id={s.slug}
                className="scroll-mt-28 rounded-[var(--radius-xl)] border border-line bg-forest/20 p-7 md:p-9"
              >
                <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">
                  {s.name} data breach notification law
                </h2>
                <p className="mt-4 leading-relaxed text-sage">{s.law.summary}</p>
                <dl className="mt-6 grid gap-4">
                  {rows.map(([term, detail]) => (
                    <div key={term}>
                      <dt className="kicker text-emerald">{term}</dt>
                      <dd className="mt-2 leading-relaxed text-mist/90">{detail}</dd>
                    </div>
                  ))}
                </dl>
                {s.law.extra && (
                  <p className="mt-5 leading-relaxed text-sage">{s.law.extra}</p>
                )}
                <p className="mt-6 text-sm leading-relaxed text-slate">
                  Source{s.law.sources.length > 1 ? "s" : ""}:{" "}
                  {s.law.sources.map((src, i) => (
                    <span key={src.href}>
                      {i > 0 && " · "}
                      <a
                        href={src.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-emerald"
                      >
                        {src.label}
                      </a>
                    </span>
                  ))}
                </p>
                {city && (
                  <p className="mt-4 text-sm">
                    <Link
                      href={`/service-areas/${city.slug}`}
                      className="text-emerald underline-offset-4 hover:underline"
                    >
                      Hacked site in {city.city}? WordPress malware removal in{" "}
                      {city.city}, {city.stateAbbr} →
                    </Link>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-obsidian px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-emerald">FAQ</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
            Common questions about breach notification
          </h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.question} className="py-7">
                <h3 className="font-display text-lg font-semibold text-mist">
                  {f.question}
                </h3>
                <p className="mt-3 leading-relaxed text-sage">{f.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate">
            This page is a plain-English summary for website owners, checked
            in {BREACH_LAWS_CHECKED} against the linked sources. It is not legal
            advice. Laws change, so confirm your obligations with an attorney
            licensed in the relevant state.
          </p>
        </div>
      </section>

      {/* Cite this page — makes linking easy for writers and site owners */}
      <section className="border-t border-line bg-pine/50 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-mist">
            Cite or share this guide
          </h2>
          <p className="mt-3 leading-relaxed text-sage">
            Writing about website security or data breaches? You are welcome
            to link to this page. Copy the link below:
          </p>
          <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-obsidian p-4 text-sm text-mist">
            <code>{citeHtml}</code>
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-mist md:text-4xl">
            Is your WordPress site hacked right now?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-sage">
            I clean hacked WordPress sites for US businesses, find how the
            attacker got in and what they reached, and give you a written
            summary you can hand to your lawyer.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={hackedCta.href}
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              {hackedCta.label}
            </Link>
            <Link
              href="/blog/wordpress-site-hacked"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              How to clean a hacked WordPress site
            </Link>
          </div>
          <LeadAssurance className="mt-6" align="center" />
        </div>
      </section>
    </main>
  );
}
