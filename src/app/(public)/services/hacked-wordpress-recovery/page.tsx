import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";

import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/cms/faq-accordion";
import { CtaBand } from "@/components/cms/cta-band";
import type { Faq } from "@/lib/cms/types";

export const revalidate = 300;

const PATH = "/services/hacked-wordpress-recovery";

export function generateMetadata(): Metadata {
  const title = "Hacked WordPress Website Recovery | Sefat Hossain";
  const description =
    "Recover a hacked WordPress website with a structured investigation, malicious access removal, malware cleanup, security hardening, and post-recovery verification.";
  const url = absoluteUrl(PATH);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const signs: string[] = [
  "An admin account you don't recognize, or one you can no longer sign into.",
  "A password that changed without your knowledge.",
  "Visitors being redirected to a different site, or seeing spam/adult content flash briefly before your page loads.",
  "Homepage or page content that's been altered, defaced, or replaced.",
  "Unfamiliar scripts loading in the page source or browser console.",
  "New pages you never created — often targeting unrelated products, pharmacy, or gambling keywords.",
  "Security plugins, firewalls, or two-factor prompts that have been disabled or removed.",
  "Hosting warnings, resource spikes, or WordPress behaving in ways that don't match anything you changed.",
];

const includes: string[] = [
  "Compromise investigation — working out what happened, when, and how the site was accessed.",
  "Malicious file and code review across core, theme, and plugin files.",
  "Unauthorized account and access review — admin users, API keys, and connected services.",
  "Malware and backdoor removal wherever it's found.",
  "Database cleanup where the compromise has reached stored content or settings.",
  "WordPress core, plugin, and theme integrity review against known-good versions.",
  "Restoration of the functionality and content the compromise affected.",
  "Security hardening based on how the access happened in the first place.",
  "Post-recovery verification — confirming the site is clean and behaving normally before considering the job done.",
];

const processSteps: { title: string; body: string }[] = [
  {
    title: "Contain",
    body: "Limit further damage first — this can mean rotating credentials, restricting access, and isolating the affected areas before anything else is touched.",
  },
  {
    title: "Investigate",
    body: "Look through logs, files, and recent changes to understand how the site was accessed and what was affected, rather than guessing at a fix.",
  },
  {
    title: "Recover",
    body: "Remove malicious code, backdoors, and unauthorized changes, then restore the legitimate content and functionality the compromise disrupted.",
  },
  {
    title: "Harden & Verify",
    body: "Close the specific weakness that allowed access, then verify the site end-to-end — no injected content, no lingering access, no repeat behavior.",
  },
];

const faqs: Faq[] = [
  {
    id: "how-long",
    question: "How long does hacked WordPress recovery take?",
    answer:
      "It depends on how deep the compromise goes and how the site was accessed. A straightforward case can be resolved quickly; a compromise involving multiple entry points, a large database, or extensive file changes takes longer to investigate and clean thoroughly.",
  },
  {
    id: "why-not-restore-backup",
    question: "Can't I just restore an old backup?",
    answer:
      "Sometimes, if you have a clean, recent backup and understand how the compromise happened — otherwise you risk restoring the same vulnerability that let it happen, or losing legitimate content and orders made after that backup. Recovery focuses on removing the compromise while keeping what's still valid.",
  },
  {
    id: "will-it-happen-again",
    question: "Will my site get hacked again after recovery?",
    answer:
      "Recovery on its own only removes what's currently there. That's why hardening is part of the process — closing the specific weakness that allowed access in the first place, rather than only cleaning up the visible symptoms.",
  },
  {
    id: "site-still-down",
    question: "My site is showing warnings or is currently down — what should I do first?",
    answer:
      "Avoid making further changes yourself if you're unsure what's safe to touch, since that can make the investigation harder. Reach out and describe what you're seeing, and we can figure out the right first step from there.",
  },
  {
    id: "google-blacklist",
    question: "My site is flagged by Google or my browser shows a security warning — is that part of this?",
    answer:
      "Yes. Once the compromise is removed and the site is verified clean, getting flags and blacklist warnings reviewed and lifted is part of getting the site back to normal.",
  },
];

export default function HackedWordPressRecoveryPage() {
  return (
    <>
      <PageHero
        kicker="WORDPRESS SECURITY SERVICE"
        title="Hacked WordPress Website Recovery"
        intro="If your WordPress website has been compromised, the priority is a calm, structured recovery — not guesswork. I investigate how the compromise happened, remove unauthorized access and malicious changes, restore normal functionality, and strengthen the site's security so the same weakness isn't left open."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/security-audit" variant="primary" size="lg">
            Get a Security Assessment
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Me
          </Button>
        </div>
      </PageHero>

      {/* Signs of compromise */}
      <Section className="!pt-10">
        <SectionHeader
          kicker="Signs to look for"
          title="What hacked WordPress recovery involves"
          intro="A compromised WordPress site doesn't always look obviously broken. These are some of the more common signs business owners notice first."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {signs.map((sign, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="flex gap-3 rounded-[var(--radius-lg)] border border-line/70 bg-forest/30 p-5">
                <span
                  aria-hidden
                  className="mt-[0.45em] h-[0.55rem] w-[0.55rem] shrink-0 rotate-[-45deg] border-b-[1.5px] border-l-[1.5px] border-emerald"
                />
                <span className="leading-relaxed text-mist/90">{sign}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section surface>
        <SectionHeader
          kicker="What's included"
          title="Recovery service includes"
          intro="Every hacked site is different, but a thorough recovery generally covers the same ground."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {includes.map((item, i) => (
            <li key={i} className="relative flex gap-3 text-mist/90">
              <span className="mt-1 font-mono text-sm text-emerald">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeader
          kicker="How it works"
          title="Recovery process"
          intro="A consistent, four-stage approach — so nothing gets skipped under pressure."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="h-full rounded-[var(--radius-xl)] border border-line bg-forest/40 p-8">
                <p className="kicker mb-4">
                  <span className="text-emerald">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3 className="font-display text-xl font-semibold text-mist">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-sage">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why hardening matters */}
      <Section surface>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Kicker className="mb-5 justify-center">Beyond the cleanup</Kicker>
          <h2 className="text-display font-display font-semibold text-mist">
            Why recovery should include security hardening
          </h2>
          <p className="mt-6 leading-relaxed text-sage">
            Removing malicious files and restoring the visible site addresses the symptoms —
            but it doesn't address how the compromise happened in the first place. Without
            identifying and closing that original weakness, a recovered site remains just as
            exposed as it was before. That's why hardening — tightening access, updating what
            needs updating, and removing the specific opening that was used — is treated as
            part of the recovery itself, not an optional add-on afterward.
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader kicker="Questions" title="Good to know" />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <CtaBand
        title="Your WordPress website was hacked. Let's get it secure again."
        primary={{ label: "Get a Security Assessment", href: "/security-audit" }}
        secondary={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}
