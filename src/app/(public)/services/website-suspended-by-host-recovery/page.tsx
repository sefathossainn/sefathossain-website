import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Website Suspended by Host — Malware Recovery | Sefat Hossain",
  description:
    "Did your host suspend your WordPress site for malware or outbound spam? I clean the infection to the host's satisfaction, prepare what they need to lift the suspension, and harden the site so it stays online.",
  alternates: {
    canonical: "/services/website-suspended-by-host-recovery",
  },
};

const symptoms = [
  "Your host (Bluehost, HostGator, GoDaddy, SiteGround, etc.) suspended the account",
  "A notice about “malware detected,” “outbound spam,” or “abuse” on your site",
  "A scan report from the host listing infected files you need to clean",
  "The account is disabled, or the site shows a suspension page",
  "Warnings about excessive resource usage from a compromised site",
  "The host says they'll only restore access once the site is clean",
];

const included = [
  "Reviewing the host's malware/abuse report and the flagged files",
  "Full cleanup of malware, injected code, backdoors, and spam scripts",
  "Stopping outbound spam or abuse the host detected",
  "Removing rogue admin accounts and closing the entry point",
  "Preparing a clear summary of what was cleaned for the host's review",
  "Guidance through the host's reactivation / review request",
  "Hardening so the site doesn't get flagged and suspended again",
];

const process = [
  {
    title: "1. Read the host's report",
    body: "Hosts usually provide a scan report or abuse notice listing what they found. I start there, so the cleanup addresses exactly what the host flagged — which is what they'll re-check before restoring the account.",
  },
  {
    title: "2. Clean to their standard",
    body: "I remove the malware, backdoors, and whatever was generating spam or abuse, cleaning to the standard the host requires rather than a quick surface fix that fails their re-scan.",
  },
  {
    title: "3. Document & request review",
    body: "I prepare a clear summary of what was found and removed, which most hosts ask for, and help you submit the reactivation or review request.",
  },
  {
    title: "4. Harden so it stays up",
    body: "Once restored, the site is hardened to close the entry point, so it doesn't get reinfected and suspended a second time.",
  },
];

const faqs = [
  {
    question: "My host suspended my site for malware — what do I do first?",
    answer:
      "Don't panic, and don't argue with the host to just turn it back on — they suspend to protect their network and other customers, and they'll usually only restore access once the site is genuinely clean. The first step is to get the host's scan report or abuse notice, which tells you exactly what they found, and clean from there.",
  },
  {
    question: "Can you get my account reactivated?",
    answer:
      "The host controls reactivation, but they reactivate once the site is clean and you've submitted a review. I clean the infection to their standard, document what was removed (which most hosts require), and help you make the reactivation request — which is what actually gets the account restored.",
  },
  {
    question: "Why did my host suspend me instead of just warning me?",
    answer:
      "When a site is sending spam, hosting malware, or attacking others, it puts the host's IP reputation and other customers at risk. Many hosts suspend immediately in those cases to contain the damage, then require proof the site is clean before restoring it.",
  },
  {
    question: "Will this happen again after it's restored?",
    answer:
      "Only if the entry point is left open. Cleaning the infection is what gets you reactivated; hardening the site afterward — closing the vulnerability, removing backdoors, tightening access — is what keeps you from being flagged and suspended again.",
  },
  {
    question: "My site is offline right now — how fast can this be done?",
    answer:
      "It depends on the extent of the infection and how quickly the host processes reactivation, but suspended sites are treated as urgent. Get me the host's report and access details, and I'll give you a realistic timeframe to clean and submit for review.",
  },
];

export default function WebsiteSuspendedByHostRecoveryPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: "Website Suspended by Host — Malware Recovery",
            description: metadata.description as string,
            path: "/services/website-suspended-by-host-recovery",
            serviceType: "Suspended website malware cleanup and reactivation",
          }),
          faqPageSchema(faqs),
        ]}
      />

      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            Website Suspended by Your Host?
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            When a host suspends your site for malware or outbound spam, they
            won&apos;t restore it until it&apos;s genuinely clean. I clean the
            infection to the host&apos;s standard, prepare what they need to
            reactivate the account, and harden the site so it doesn&apos;t get
            suspended again.
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
            <p className="kicker text-emerald">WHY THIS HAPPENS</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Hosts suspend to protect their network — and their other customers
            </h2>
            <p className="mt-6 leading-relaxed text-sage">
              A compromised site that sends spam or hosts malware puts the
              host&apos;s reputation and every other site on the server at risk.
              That&apos;s why reactivation almost always requires proof the site
              is clean — not just a promise.
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
            What suspension recovery includes
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
            A structured path back online
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
            Suspended Website FAQs
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
            Account suspended and your business offline?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            Every hour offline costs you. Send me the host&apos;s report and
            access, and I&apos;ll clean the site to their standard and get the
            reactivation moving.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-7 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Free Assessment
            </Link>

            <Link
              href="/services/hacked-wordpress-recovery"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              Hacked WordPress Recovery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
