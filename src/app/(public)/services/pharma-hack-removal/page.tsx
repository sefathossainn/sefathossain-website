import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pharma Hack Removal (WordPress) | Sefat Hossain",
  description:
    "Google showing pharmacy spam — Viagra, Cialis — in your WordPress site's titles and pages? I remove the pharma hack, clean the cloaked spam, close the entry point, and help restore your search listings.",
  alternates: {
    canonical: "/services/pharma-hack-removal",
  },
};

const symptoms = [
  "Your Google titles or descriptions mention Viagra, Cialis, or online pharmacies",
  "Pharmacy spam pages indexed under your domain that you never created",
  "Spam that appears to Googlebot but not to you (cloaking)",
  "A sudden ranking drop or a “this site may be hacked” label in results",
  "Injected content in the database or hidden files in your WordPress install",
  "The spam returns days after you thought you had removed it",
];

const included = [
  "Detection of cloaked pharma spam shown only to search engines",
  "Removal of injected spam content from files and the database",
  "Cleanup of malicious files, conditional scripts, and rogue cron jobs",
  "Backdoor and rogue-admin detection so the spam can't regenerate",
  "Reviewing wp_options, wp_posts, and core files for injected payloads",
  "Identifying and closing the vulnerability that allowed the injection",
  "Guidance on the Search Console review to clean up your listings",
];

const process = [
  {
    title: "1. See what Google sees",
    body: "Pharma hacks usually cloak — showing spam to search engines while looking normal to you. I inspect the site the way Googlebot sees it, so the hidden spam is actually found instead of missed.",
  },
  {
    title: "2. Find the payload",
    body: "I locate the injected content and the script generating it across files and the database, rather than editing individual spam pages that regenerate.",
  },
  {
    title: "3. Remove & clean",
    body: "The malicious code, cloaking scripts, injected database entries, and any backdoors are removed, and compromised core files are replaced with clean versions.",
  },
  {
    title: "4. Recover & harden",
    body: "Once clean, I help with the Search Console review so your titles and listings recover, then close the entry point so the pharma spam doesn't return.",
  },
];

const faqs = [
  {
    question: "What is a pharma hack?",
    answer:
      "A pharma hack is a WordPress SEO-spam infection that injects pharmacy advertising — often for Viagra, Cialis, and similar — into your pages, titles, and search listings. It typically uses cloaking, showing the spam to search engines while the page looks normal to you, which is why it can run undetected for a long time.",
  },
  {
    question: "Why can't I see the spam on my own site?",
    answer:
      "Because pharma hacks cloak. The malicious code checks whether the visitor is a search engine crawler and only serves the spam to it. When you view your site normally, you see the legitimate page — but Google sees pharmacy spam, which is what shows in your search results.",
  },
  {
    question: "The spam keeps coming back — why?",
    answer:
      "Because the entry point or a hidden backdoor was left in place. Pharma hacks often install a generator that recreates the spam automatically. Removing the visible spam without removing the source and closing the vulnerability just resets it.",
  },
  {
    question: "Will my search rankings recover?",
    answer:
      "Usually, once the site is genuinely clean and the spam listings are handled in Search Console. Recovery depends on how long the hack ran and how much Google indexed, but removing the infection and requesting a review is what starts it.",
  },
  {
    question: "How did this happen to my site?",
    answer:
      "Most pharma hacks get in through an outdated plugin or theme, a weak password, or a pre-existing backdoor. Identifying the specific entry point is part of the cleanup, because closing it is what stops reinfection.",
  },
];

export default function PharmaHackRemovalPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: "Pharma Hack Removal",
            description: metadata.description as string,
            path: "/services/pharma-hack-removal",
            serviceType: "WordPress pharma hack / SEO spam removal",
          }),
          faqPageSchema(faqs),
        ]}
      />

      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            Pharma Hack Removal
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            If Google is showing pharmacy spam in your WordPress site&apos;s
            titles and pages — even though the site looks fine to you — you have
            a pharma hack. I find the cloaked spam Google sees, remove it, close
            the entry point, and help your real listings recover.
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
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <div>
            <p className="kicker text-emerald">SIGNS OF A PHARMA HACK</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Spam Google sees, but you don&apos;t
            </h2>
            <p className="mt-6 leading-relaxed text-sage">
              A pharma hack hides behind cloaking — it serves pharmacy spam to
              search engines while your pages look normal to you. That&apos;s why
              the damage usually shows up first in your Google results, not on
              the site itself.
            </p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-9">
            <ul className="grid gap-5">
              {symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-3 text-mist/90">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-emerald" />
                  <span className="leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">THE SERVICE</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            What pharma hack removal includes
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {included.map((item) => (
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
            A structured approach to clearing pharma spam
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {process.map((step) => (
              <div
                key={step.title}
                className="rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7"
              >
                <h3 className="font-display text-xl font-semibold text-mist">
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
            Pharma Hack FAQs
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

      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker text-emerald">NEED HELP?</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-5xl">
            Pharmacy spam showing up in your Google results?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            Because pharma hacks cloak, they often run for months before
            they&apos;re caught. The sooner the hidden spam is found and removed,
            the sooner your listings recover.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Free Assessment
            </Link>

            <Link
              href="/services/wordpress-malware-removal"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              WordPress Malware Removal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
