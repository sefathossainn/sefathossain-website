import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { QuickAnswer } from "@/components/seo/quick-answer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedServices } from "@/components/seo/related-services";
import { HackChecker } from "@/components/tools/hack-checker";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const PATH = "/tools/is-my-wordpress-site-hacked";

export const metadata: Metadata = {
  title: "Is My WordPress Site Hacked? Free Checker | Sefat Hossain",
  description:
    "A free, no-signup checker: answer a few questions about what your WordPress site is doing and get an instant read on whether it's likely hacked — plus exactly what to do next.",
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: absoluteUrl(PATH),
    title: "Is My WordPress Site Hacked? Free Checker",
    description:
      "Answer a few questions and get an instant read on whether your WordPress site is likely compromised, with clear next steps.",
  },
};

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools/is-my-wordpress-site-hacked" },
  { name: "Is My WordPress Site Hacked?", path: PATH },
];

const faqs = [
  {
    question: "Does this scan my website?",
    answer:
      "No. It's a symptom-based self-check: you answer a few questions about how your site is behaving, and it gives you an instant read on how likely a compromise is. It runs entirely in your browser, needs no signup, and never accesses your site — so it can't see hidden or cloaked malware. For that, a proper scan is needed.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, completely free and with no email required. It's a quick way to know whether what you're seeing is worth worrying about before you decide on next steps.",
  },
  {
    question: "It says my site might be hacked — what now?",
    answer:
      "Don't start deleting files at random — that destroys the evidence needed to find how the attacker got in. Take a full backup first, change your passwords, and get the site properly scanned, cleaned, and hardened. You can start with a free security assessment.",
  },
  {
    question: "It says no signs of a hack — am I safe?",
    answer:
      "It's reassuring, but not a guarantee. The quietest malware hides deliberately and may not produce obvious symptoms. Keep everything updated, use strong passwords and two-factor login, and keep working backups — and if anything still feels off, get a proper scan.",
  },
];

export default function HackCheckerPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WordPress Hack Checker",
    url: absoluteUrl(PATH),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any (web browser)",
    description:
      "A free symptom-based self-check that tells you whether your WordPress site is likely hacked, with next steps.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main>
      <JsonLd data={[appSchema, faqPageSchema(faqs), breadcrumbSchema(CRUMBS)]} />

      <section className="border-b border-line bg-obsidian px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={CRUMBS} className="mb-6" />
          <p className="kicker text-emerald">FREE TOOL</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-mist md:text-5xl">
            Is my WordPress site hacked?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sage">
            Answer a few quick questions about what your site is doing and get an
            instant read on whether it&apos;s likely compromised — with clear
            next steps. No signup, no scan of your site, nothing stored.
          </p>
        </div>
      </section>

      <section className="bg-obsidian px-6 pt-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <QuickAnswer>
            To tell if your WordPress site is hacked, look for these signs:
            unexpected redirects (often only on mobile or from Google), a Google
            &ldquo;this site may be harmful&rdquo; warning, admin users you
            don&apos;t recognize, spam pages in search results you never
            published, a host warning about malware or spam, or being locked out
            of wp-admin. The checker below weighs these for you.
          </QuickAnswer>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <HackChecker />
        </div>
      </section>

      <section className="border-y border-line bg-pine/50 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="kicker text-emerald">FAQ</p>
          <h2 className="mt-5 font-display text-2xl font-semibold text-mist md:text-3xl">
            About this checker
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-display text-lg font-semibold text-mist">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-relaxed text-sage">{faq.answer}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate">
            Want the full explanation?{" "}
            <Link
              href="/blog/is-my-wordpress-site-hacked-how-to-check"
              className="text-emerald hover:underline"
            >
              Read: Is my WordPress site hacked? How to check →
            </Link>
          </p>
        </div>
      </section>

      <RelatedServices currentPath={PATH} />

      <section className="bg-obsidian px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker text-emerald">NOT SURE?</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
            Get a real answer with a free assessment
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            A self-check can&apos;t see hidden malware. If you want certainty, I
            can review your site and tell you exactly what&apos;s going on.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
