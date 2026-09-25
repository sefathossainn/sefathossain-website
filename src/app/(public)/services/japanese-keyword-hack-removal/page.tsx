import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Japanese Keyword Hack Removal (WordPress) | Sefat Hossain",
  description:
    "Seeing Japanese text in your Google results and spam pages you never created? I remove the WordPress Japanese keyword hack, clean the injected content, close the entry point, and help restore your search listings.",
  alternates: {
    canonical: "/services/japanese-keyword-hack-removal",
  },
};

const symptoms = [
  "Google results for your site show pages in Japanese you never created",
  "Search Console reports hundreds or thousands of unknown indexed URLs",
  "Auto-generated pages selling counterfeit brand-name products",
  "A “Sitemap contains URLs which are blocked by robots.txt” style anomaly",
  "New sitemap files or a modified robots.txt you didn't add",
  "A rogue admin account added to keep re-injecting content",
];

const included = [
  "Removal of injected Japanese spam pages and auto-generated content",
  "Cleanup of malicious files, cron jobs, and rogue sitemap generators",
  "Database cleanup where spam content or settings were injected",
  "Rogue-admin and backdoor detection and removal",
  "Restoring a clean robots.txt and legitimate sitemap",
  "Identifying and closing the entry point that allowed the injection",
  "Guidance on the Search Console steps to clean up your listings",
];

const process = [
  {
    title: "1. Assess the spread",
    body: "The Japanese keyword hack works by mass-generating spam pages under your domain. I use Search Console and a full crawl to understand how many URLs were injected and where the content is coming from.",
  },
  {
    title: "2. Remove the source",
    body: "I remove the malicious scripts, cron jobs, and files generating the spam pages — not just the pages themselves, which regenerate if the source is left in place.",
  },
  {
    title: "3. Clean & restore",
    body: "Injected database content, rogue sitemaps, and modified robots.txt are cleaned and restored to a legitimate state, and any rogue admin accounts are removed.",
  },
  {
    title: "4. Recover in search",
    body: "Once clean, I help with the Search Console steps — removing spam URLs and requesting a review — so your real pages recover their place in search.",
  },
];

const faqs = [
  {
    question: "What is the Japanese keyword hack?",
    answer:
      "It's a WordPress SEO-spam attack that injects thousands of auto-generated pages full of Japanese text — usually advertising counterfeit goods — under your domain. Google indexes them, and your search results fill with spam pages you never made, damaging your rankings and reputation.",
  },
  {
    question: "Why do fake pages keep coming back after I delete them?",
    answer:
      "Because the attack installs a generator — a malicious script or cron job — that recreates the spam pages automatically. Deleting the pages without removing the generator and closing the entry point means they simply regenerate. The fix has to target the source.",
  },
  {
    question: "Will my real pages come back in Google?",
    answer:
      "Usually, yes, once the site is clean and the spam URLs are handled in Search Console. Recovery isn't instant — Google needs to recrawl — but removing the infection and requesting a review is what starts the recovery.",
  },
  {
    question: "How did my site get hacked with this?",
    answer:
      "Most commonly through an outdated plugin or theme with a known vulnerability, a weak admin password, or an already-present backdoor. Finding the specific entry point is part of the cleanup, because closing it is what prevents reinfection.",
  },
  {
    question: "Do you also handle the Google side?",
    answer:
      "Yes. Once the site is genuinely clean, I can guide you through the Search Console security-issue review and the removal of the spam URLs, so both the site and its search listings recover.",
  },
];

export default function JapaneseKeywordHackRemovalPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: "Japanese Keyword Hack Removal",
            description: metadata.description as string,
            path: "/services/japanese-keyword-hack-removal",
            serviceType: "WordPress SEO spam / Japanese keyword hack removal",
          }),
          faqPageSchema(faqs),
        ]}
      />

      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            Japanese Keyword Hack Removal
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            If Google is showing Japanese spam pages under your domain and your
            Search Console is full of URLs you never created, your WordPress
            site has the Japanese keyword hack. I remove the injected content,
            stop it from regenerating, close the entry point, and help your real
            pages recover in search.
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
            <p className="kicker text-emerald">SIGNS OF THE HACK</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Spam pages in a language you don&apos;t even use
            </h2>
            <p className="mt-6 leading-relaxed text-sage">
              The Japanese keyword hack hijacks your domain&apos;s search
              authority to rank spam. It quietly generates thousands of pages,
              so the first sign is often in Google results or Search Console —
              not on the site itself.
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
            What Japanese keyword hack removal includes
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
            A structured approach to clearing the injection
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
            Japanese Keyword Hack FAQs
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
            Spam pages taking over your search results?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            The longer the injection runs, the more spam Google indexes under
            your name. Removing the source early makes the search recovery
            faster and cleaner.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Free Assessment
            </Link>

            <Link
              href="/services/google-blacklist-removal"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              Google Blacklist Removal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
