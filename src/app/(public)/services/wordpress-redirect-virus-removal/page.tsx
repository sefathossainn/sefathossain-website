import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "WordPress Redirect Virus Removal | Sefat Hossain",
  description:
    "Is your WordPress site redirecting visitors to spam or scam pages? I find and remove the redirect malware, clean infected files and the database, close the entry point, and stop the reinfection.",
  alternates: {
    canonical: "/services/wordpress-redirect-virus-removal",
  },
};

const symptoms = [
  "Visitors — often only on mobile, or only from Google — get sent to a site you've never heard of",
  "Your homepage flashes spam, adult, or gambling content before loading",
  "Search results for your site link to pages you never created",
  "The redirect works for new visitors but not when you're logged in as admin",
  "Ad networks or Google Ads disapprove your site for malicious redirects",
  "The redirect comes back a few days after you thought you'd cleaned it",
];

const included = [
  "Full scan of core, theme, and plugin files for injected redirect code",
  "Database cleanup — malicious entries in wp_options, wp_posts, and injected scripts",
  "Removal of rogue .htaccess rules and malicious JavaScript redirects",
  "Hidden backdoor and rogue-admin detection so the redirect can't return",
  "Identifying the entry point (outdated plugin, weak credential, known CVE)",
  "Post-cleanup verification across devices and referrers, not just desktop",
  "Security hardening to close the weakness that let it in",
];

const process = [
  {
    title: "1. Reproduce",
    body: "Redirect malware often targets only mobile users or visitors arriving from search. I reproduce the exact conditions that trigger it, so the cleanup addresses the real behavior — not just what shows on a desktop.",
  },
  {
    title: "2. Trace",
    body: "I trace where the redirect is injected — a theme file, a plugin, the database, or an .htaccess rule — and map every location it lives in rather than deleting the first thing that looks suspicious.",
  },
  {
    title: "3. Remove",
    body: "The malicious code, rogue redirect rules, and any hidden backdoors are removed, and compromised core files are replaced with clean versions.",
  },
  {
    title: "4. Verify & harden",
    body: "The site is re-tested across devices and referrers to confirm the redirect is gone, then the entry point is closed so it doesn't reappear.",
  },
];

const faqs = [
  {
    question: "Why does the redirect only happen on mobile or from Google?",
    answer:
      "Redirect malware is often written to trigger conditionally — only for mobile user agents, or only when the visitor's referrer is a search engine — so the site owner, who usually visits directly on desktop while logged in, doesn't notice. That's by design, to keep the infection alive as long as possible.",
  },
  {
    question: "I cleaned it but the redirect came back — why?",
    answer:
      "Almost always because the entry point was never closed, or a hidden backdoor was left behind. Removing the visible redirect code without finding how the attacker got in just resets the clock. A proper cleanup finds the source and removes the backdoors, not only the symptom.",
  },
  {
    question: "Will I lose my content or design?",
    answer:
      "In most cases the redirect can be removed without affecting your legitimate content or design. The goal is to strip out the malicious code while keeping the site's real files and database intact.",
  },
  {
    question: "Is a redirect virus the same as being blacklisted by Google?",
    answer:
      "They're related but not the same. A redirect virus is the infection; a Google blacklist or “this site may be harmful” warning is Google's response to detecting it. Once the site is genuinely clean, the blacklist warning can be reviewed and lifted.",
  },
  {
    question: "How fast can you remove it?",
    answer:
      "A straightforward redirect infection on one site can often be resolved quickly. Cases with multiple backdoors, database injection, or repeated reinfection take longer to investigate and clean thoroughly. I'll give you a realistic timeframe once I've seen the scope.",
  },
];

export default function WordPressRedirectVirusRemovalPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: "WordPress Redirect Virus Removal",
            description: metadata.description as string,
            path: "/services/wordpress-redirect-virus-removal",
            serviceType: "WordPress redirect malware removal",
          }),
          faqPageSchema(faqs),
        ]}
      />

      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            WordPress Redirect Virus Removal
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            If your WordPress site is sending visitors to spam, scam, or
            adult pages — especially on mobile or from Google — it&apos;s
            infected with redirect malware. I find where it&apos;s injected,
            remove it completely, close the entry point, and stop it from
            coming back.
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
            <p className="kicker text-emerald">SIGNS OF A REDIRECT VIRUS</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              The redirect that only shows up when you&apos;re not looking
            </h2>
            <p className="mt-6 leading-relaxed text-sage">
              Redirect malware is built to hide from the site owner. It often
              triggers only for mobile visitors, or only for people arriving
              from a search engine, so everything looks fine when you check it
              yourself while logged in.
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
            What redirect virus removal includes
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
            A structured approach to removing redirect malware
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
            WordPress Redirect Virus FAQs
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
            Is your site redirecting visitors away?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            Every visitor sent to a spam page is a lost customer and a hit to
            your reputation. The sooner it&apos;s traced and removed, the less
            damage it does.
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
