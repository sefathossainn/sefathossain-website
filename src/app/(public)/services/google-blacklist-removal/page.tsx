import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Blacklist Removal for WordPress | Sefat Hossain",
  description:
    "Get help removing malware and security issues behind Google blacklist warnings on WordPress websites, followed by cleanup, verification, and recovery steps.",
  alternates: {
    canonical: "/services/google-blacklist-removal",
  },
};

const warningSigns = [
  "Google Safe Browsing or Search Console security warnings",
  "Search results showing hacked or compromised site warnings",
  "Malicious redirects or unexpected pages",
  "Spam content or suspicious URLs indexed by Google",
  "Malware or injected code discovered on the website",
  "Google Ads or other services flagging the website for security issues",
];

const cleanupAreas = [
  "Malware and malicious code investigation",
  "Compromised WordPress files and scripts",
  "Malicious redirects and injected content",
  "SEO spam and suspicious URLs",
  "Unauthorized administrator accounts",
  "Database entries related to the compromise",
  "WordPress core, plugins, and themes",
  "Security hardening after cleanup",
];

const process = [
  {
    title: "1. Investigate",
    body: "I review the warning, inspect the website, and identify the security issues that may have caused the site to be flagged.",
  },
  {
    title: "2. Clean",
    body: "Confirmed malware, malicious redirects, spam content, and other compromised areas are cleaned from the website.",
  },
  {
    title: "3. Verify",
    body: "The website is checked after cleanup to confirm that the identified security issues have been addressed and the site is functioning normally.",
  },
  {
    title: "4. Request Review",
    body: "Once the website is clean and verified, I can help you understand the appropriate Google Search Console review or recovery steps for the security warning.",
  },
];

const faqs = [
  {
    question: "Why was my WordPress website blacklisted by Google?",
    answer:
      "Google may flag a website when its systems detect security problems such as malware, phishing content, malicious downloads, unwanted redirects, or other compromised content. The underlying cause needs to be investigated before requesting a review.",
  },
  {
    question: "Can you remove the malware that caused the warning?",
    answer:
      "Yes. The service can include investigating and cleaning malicious files, scripts, redirects, database content, and other confirmed signs of compromise.",
  },
  {
    question: "Is requesting a Google review enough to remove the warning?",
    answer:
      "No. The website should be properly cleaned and verified first. Requesting a review while the underlying security problem remains can result in the warning continuing.",
  },
  {
    question: "How long does Google blacklist removal take?",
    answer:
      "The time required can vary depending on the type of warning, the extent of the compromise, the quality of the cleanup, and Google's review process. No fixed timeframe can be guaranteed.",
  },
  {
    question: "Can Google blacklist removal fix SEO spam too?",
    answer:
      "If SEO spam is part of the security compromise, cleanup can include malicious pages, links, redirects, and injected content related to the infection. Search visibility recovery may require additional time after the website is clean.",
  },
];

export default function GoogleBlacklistRemovalPage() {
  return (
    <main>
      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            Google Blacklist Removal for WordPress
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            Get help investigating and cleaning the security issues behind
            Google warnings on a compromised WordPress website. The process
            focuses on finding the cause, removing confirmed threats,
            verifying the cleanup, and following the appropriate recovery
            steps.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Security Assessment
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
            <p className="kicker text-emerald">WHEN GOOGLE FLAGS YOUR SITE</p>

            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              A warning is a security problem first—not just an SEO problem.
            </h2>

            <p className="mt-6 leading-relaxed text-sage">
              If Google detects a compromised website, the visible warning is
              often a symptom of a deeper security issue. The right approach is
              to identify and remove the underlying threat before requesting a
              review.
            </p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-9">
            <ul className="grid gap-5">
              {warningSigns.map((sign) => (
                <li key={sign} className="flex gap-3 text-mist/90">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-emerald" />
                  <span className="leading-relaxed">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">CLEANUP & RECOVERY</p>

          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            What the cleanup can cover
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cleanupAreas.map((area) => (
              <div
                key={area}
                className="rounded-2xl border border-line bg-forest/40 p-5 text-mist/90"
              >
                <span className="mr-3 text-emerald">◆</span>
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">THE PROCESS</p>

          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            From security warning to a clean, verified website
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
            Google Blacklist Removal FAQs
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
            Is Google warning visitors about your WordPress website?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            Start by identifying the security issue behind the warning. A
            proper cleanup and verification should come before requesting a
            review.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Security Assessment
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
