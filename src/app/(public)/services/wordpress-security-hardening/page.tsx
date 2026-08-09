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

const PATH = "/services/wordpress-security-hardening";

export function generateMetadata(): Metadata {
  const title = "WordPress Security Hardening | Sefat Hossain";
  const description =
    "Strengthen your WordPress website with security hardening, access protection, firewall configuration, secure settings, backups, and measures designed to reduce common attack risks.";
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

const canHarden: string[] = [
  "WordPress core security settings — configuration that affects how exposed the site is by default.",
  "Administrator and user account security — reviewing who has access and how much.",
  "Login protection — reducing exposure on the login page and repeated access attempts.",
  "Plugin and theme security review — checking what's installed against what's actually needed.",
  "File and directory permissions, where appropriate for the hosting environment.",
  "Database and configuration security — keeping sensitive settings out of reach.",
  "Firewall and security rules tuned to the site.",
  "XML-RPC and other legacy endpoints reviewed for unnecessary exposure, where appropriate.",
  "Backups and recovery readiness, so there's a clean fallback if anything does go wrong.",
  "Security monitoring recommendations, so issues surface early instead of going unnoticed.",
  "Cloudflare or equivalent security-layer configuration, where appropriate.",
];

const weaknesses: string[] = [
  "Outdated plugins or themes running known, unpatched vulnerabilities.",
  "Weak administrator accounts — reused or simple passwords, no extra login protection.",
  "Excessive user permissions given to accounts that don't need them.",
  "Login and admin endpoints left fully exposed to automated attempts.",
  "Unnecessary services or features left enabled with no active use.",
  "No real backup strategy, or backups that were never tested.",
  "Insecure default configurations left unchanged since installation.",
  "No monitoring in place, so a compromise can sit unnoticed for a long time.",
  "Outdated or unsupported software still running in production.",
];

const processSteps: { title: string; body: string }[] = [
  {
    title: "Assess",
    body: "Review the site's current configuration, users, plugins, and settings to see where the exposure actually is, rather than applying generic changes.",
  },
  {
    title: "Harden",
    body: "Apply the specific changes the assessment calls for — tightening access, updating configurations, and closing off unnecessary exposure.",
  },
  {
    title: "Verify",
    body: "Confirm the site still works exactly as expected after hardening — no broken functionality, no locked-out access, nothing missed.",
  },
  {
    title: "Monitor",
    body: "Put recommendations in place so new issues are noticed early, rather than discovered only after something has already happened.",
  },
];

const faqs: Faq[] = [
  {
    id: "what-is-hardening",
    question: "What does 'WordPress security hardening' actually mean?",
    answer:
      "It means reducing the number of ways a WordPress site could be attacked — tightening access, updating outdated software, correcting insecure settings, and adding protective layers like a firewall — rather than waiting for a problem to happen and reacting to it.",
  },
  {
    id: "hardening-vs-cleanup",
    question: "How is this different from malware removal?",
    answer:
      "Malware removal deals with a site that's already been compromised — cleaning out what's there. Hardening is about reducing the chance of that happening at all, by addressing the weaknesses an attacker would otherwise be able to use.",
  },
  {
    id: "already-cleaned",
    question: "My site was already cleaned up after an infection — do I still need hardening?",
    answer:
      "Usually yes. Cleaning removes the infection, but it doesn't automatically fix whatever allowed access in the first place. Without hardening, the same weakness can lead to reinfection.",
  },
  {
    id: "will-it-slow-site",
    question: "Will hardening slow down or break my website?",
    answer:
      "Hardening is applied carefully and verified afterward so normal functionality keeps working. The goal is to reduce exposure without disrupting how the site or its plugins actually operate.",
  },
  {
    id: "one-time-or-ongoing",
    question: "Is hardening a one-time task or an ongoing thing?",
    answer:
      "The initial hardening addresses what's exposed today, but WordPress, plugins, and themes keep changing over time. Ongoing monitoring and periodic review keep the site's security posture from quietly drifting backward.",
  },
];

export default function WordPressSecurityHardeningPage() {
  return (
    <>
      <PageHero
        kicker="WORDPRESS SECURITY SERVICE"
        title="WordPress Security Hardening"
        intro="Security hardening reduces the attack surface of a WordPress website — strengthening access controls, configurations, updates, backups, and other security layers so common weaknesses aren't left open for an attacker to use."
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

      {/* What hardening means */}
      <Section className="!pt-10">
        <Reveal className="max-w-3xl">
          <Kicker className="mb-5">What it means</Kicker>
          <h2 className="text-display font-display font-semibold text-mist">
            What WordPress security hardening means
          </h2>
          <p className="mt-6 leading-relaxed text-sage">
            Hardening isn't one single fix — it's the process of reducing unnecessary exposure
            across a WordPress site before an attacker has the chance to find and use it. That
            means looking at access, configuration, software versions, and monitoring together,
            and strengthening whichever of those is weakest, rather than assuming one plugin or
            one setting covers everything.
          </p>
        </Reveal>
      </Section>

      {/* What can be hardened */}
      <Section surface>
        <SectionHeader
          kicker="What's covered"
          title="What I can harden"
          intro="A hardening pass typically covers the following areas, depending on what the site actually needs."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {canHarden.map((item, i) => (
            <li key={i} className="relative flex gap-3 text-mist/90">
              <span className="mt-1 font-mono text-sm text-emerald">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Common weaknesses */}
      <Section>
        <SectionHeader
          kicker="What attackers look for"
          title="Common WordPress security weaknesses"
          intro="Most compromises trace back to a small set of recurring issues."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {weaknesses.map((item, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="flex gap-3 rounded-[var(--radius-lg)] border border-line/70 bg-forest/30 p-5">
                <span
                  aria-hidden
                  className="mt-[0.45em] h-[0.55rem] w-[0.55rem] shrink-0 rotate-[-45deg] border-b-[1.5px] border-l-[1.5px] border-emerald"
                />
                <span className="leading-relaxed text-mist/90">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section surface>
        <SectionHeader
          kicker="How it works"
          title="Hardening process"
          intro="A consistent, four-stage approach applied to every site."
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

      {/* Why hardening matters after cleanup */}
      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Kicker className="mb-5 justify-center">Cleanup vs. prevention</Kicker>
          <h2 className="text-display font-display font-semibold text-mist">
            Why hardening matters after malware cleanup
          </h2>
          <p className="mt-6 leading-relaxed text-sage">
            Cleaning an infected website and preventing another compromise are two different
            tasks. Removing malicious files gets rid of what's currently there, but if the
            original weakness that allowed access in the first place is never addressed, the
            same door is still open. Hardening is what closes it — which is why a recovered
            site and a hardened site aren't automatically the same thing.
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section surface>
        <SectionHeader kicker="Questions" title="Good to know" />
        <div className="mt-10 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <CtaBand
        title="Strengthen your WordPress website before the next attack."
        primary={{ label: "Get a Security Assessment", href: "/security-audit" }}
        secondary={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}
