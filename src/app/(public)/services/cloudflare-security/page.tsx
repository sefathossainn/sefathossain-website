import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cloudflare Security Setup for WordPress | Sefat Hossain",
  description:
    "Strengthen your WordPress website with Cloudflare security configuration, DNS protection, firewall rules, bot protection, rate limiting, and traffic filtering.",
  alternates: {
    canonical: "/services/cloudflare-security",
  },
};

const protectionAreas = [
  "Cloudflare DNS and proxy configuration",
  "SSL and secure traffic configuration",
  "Firewall and WAF rule configuration",
  "Bot and unwanted traffic protection",
  "Rate limiting for appropriate endpoints",
  "Login and administrative area protection",
  "Country, IP, and traffic filtering where appropriate",
  "Security-focused Cloudflare configuration review",
];

const commonProblems = [
  "Large amounts of unwanted bot traffic",
  "Repeated login or application requests",
  "Suspicious traffic from specific IPs or regions",
  "Abuse of publicly accessible endpoints",
  "Incorrect DNS or proxy configuration",
  "Security rules blocking legitimate visitors",
];

const process = [
  {
    title: "1. Assess",
    body: "I review the current Cloudflare configuration, DNS setup, traffic patterns, website requirements, and existing security rules.",
  },
  {
    title: "2. Configure",
    body: "Security controls are configured according to the website's traffic, application behavior, and legitimate visitor requirements.",
  },
  {
    title: "3. Test",
    body: "Rules are tested carefully to reduce unwanted traffic without unnecessarily blocking real users, search engines, or important services.",
  },
  {
    title: "4. Monitor & Refine",
    body: "Cloudflare settings can be reviewed and adjusted as traffic patterns, attacks, or website requirements change.",
  },
];

const faqs = [
  {
    question: "What does Cloudflare security setup include?",
    answer:
      "Depending on the website, it can include DNS and proxy configuration, SSL settings, firewall and WAF rules, bot protection, rate limiting, traffic filtering, and protection for sensitive areas such as WordPress login endpoints.",
  },
  {
    question: "Can Cloudflare stop all bots?",
    answer:
      "No security service can guarantee that every unwanted request will be blocked. Cloudflare can significantly improve traffic filtering and help distinguish or challenge suspicious traffic while allowing legitimate visitors through.",
  },
  {
    question: "Can Cloudflare block legitimate visitors?",
    answer:
      "Poorly configured rules can. That is why security rules should be tested against real website traffic and adjusted carefully rather than blocking broad groups of visitors without considering legitimate use cases.",
  },
  {
    question: "Do I need to move my website to Cloudflare hosting?",
    answer:
      "No. Cloudflare can sit in front of an existing hosting provider as a security and performance layer. The website can continue to run on its current hosting infrastructure.",
  },
  {
    question: "Can Cloudflare protect WordPress login pages?",
    answer:
      "Yes. Appropriate firewall, rate-limiting, and access-control strategies can help reduce abusive requests against WordPress login and administrative endpoints. The exact configuration should match the site's needs.",
  },
];

export default function CloudflareSecurityPage() {
  return (
    <main>
      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            Cloudflare Security Setup for WordPress
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            Configure Cloudflare as a stronger security layer in front of your
            WordPress website. I help configure traffic protection, firewall
            rules, bot controls, DNS, SSL, and other security settings around
            your website's actual needs.
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
            <p className="kicker text-emerald">CLOUDFLARE PROTECTION</p>

            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Put a security layer between your website and unwanted traffic.
            </h2>

            <p className="mt-6 leading-relaxed text-sage">
              Cloudflare can help filter and challenge suspicious traffic
              before it reaches your WordPress server. The goal is not simply
              to turn on every available security option, but to configure the
              right controls without disrupting legitimate users.
            </p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-9">
            <ul className="grid gap-5">
              {commonProblems.map((problem) => (
                <li key={problem} className="flex gap-3 text-mist/90">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-emerald" />
                  <span className="leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-pine/50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">SECURITY CONFIGURATION</p>

          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            What the Cloudflare security setup can cover
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {protectionAreas.map((area) => (
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
          <p className="kicker text-emerald">HOW IT WORKS</p>

          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            A practical Cloudflare security configuration process
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
            Cloudflare Security FAQs
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
            Need stronger protection against unwanted traffic?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            A properly configured Cloudflare security layer can help reduce
            abusive traffic while keeping legitimate visitors connected to
            your website.
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
