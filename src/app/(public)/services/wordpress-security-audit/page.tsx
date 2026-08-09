import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WordPress Security Audit | Sefat Hossain",
  description:
    "A practical WordPress security audit covering vulnerabilities, users, plugins, themes, configuration, malware indicators, access controls, and security risks.",
  alternates: {
    canonical: "/services/wordpress-security-audit",
  },
};

const auditAreas = [
  "WordPress core, plugin, and theme security review",
  "Administrator and user account review",
  "Login and access-control configuration",
  "Malware and suspicious-code indicators",
  "File and database security review",
  "Security plugin and firewall configuration",
  "Hosting and server-level security considerations",
  "Backup and recovery readiness",
  "Cloudflare and external security-layer configuration",
  "Security recommendations based on identified risks",
];

const riskSigns = [
  "Outdated WordPress core, plugins, or themes",
  "Unknown or unnecessary administrator accounts",
  "Weak or excessive user permissions",
  "Suspicious files, scripts, or database content",
  "Missing or unreliable backups",
  "Unprotected login and administrative endpoints",
  "Security warnings or unusual website behavior",
  "No clear process for monitoring and responding to security issues",
];

const process = [
  {
    title: "1. Assess",
    body: "I review the website's WordPress environment, accounts, plugins, themes, configuration, and relevant security layers.",
  },
  {
    title: "2. Identify",
    body: "Potential weaknesses, suspicious indicators, unnecessary exposure, and configuration risks are documented based on the available evidence.",
  },
  {
    title: "3. Prioritize",
    body: "Security findings are organized so you can understand which issues deserve attention first rather than receiving an overwhelming list of technical details.",
  },
  {
    title: "4. Recommend",
    body: "You receive practical recommendations for improving the website's security and reducing the risk of future compromise.",
  },
];

const faqs = [
  {
    question: "What is a WordPress security audit?",
    answer:
      "A WordPress security audit is a structured review of a website's core, plugins, themes, users, configuration, access controls, and security layers to identify weaknesses or signs of compromise.",
  },
  {
    question: "Does a security audit include malware removal?",
    answer:
      "An audit can identify suspicious or malicious indicators, but an audit and a full malware cleanup are different services. If an active infection is found, the appropriate cleanup and recovery work can be recommended.",
  },
  {
    question: "Who should get a WordPress security audit?",
    answer:
      "An audit can be useful for business websites, stores, membership sites, and other WordPress websites where security and availability are important, especially after major changes, suspicious activity, or a previous compromise.",
  },
  {
    question: "Will the audit automatically fix every security issue?",
    answer:
      "No. The purpose of an audit is to identify and prioritize security risks. Some issues can be addressed as part of a hardening or remediation service, depending on what the website needs.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "You can use the findings to prioritize security improvements. Depending on the risks identified, the next steps may include hardening, malware cleanup, access-control changes, backup improvements, monitoring, or other remediation work.",
  },
];

export default function WordPressSecurityAuditPage() {
  return (
    <main>
      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">WORDPRESS SECURITY SERVICE</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            WordPress Security Audit
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            A practical security review designed to identify weaknesses,
            suspicious indicators, access risks, and configuration problems
            that could leave your WordPress website exposed.
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
            <p className="kicker text-emerald">THE AUDIT</p>

            <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-4xl">
              Understand where your WordPress security stands.
            </h2>

            <p className="mt-6 leading-relaxed text-sage">
              A security audit looks beyond a single plugin or scanner result.
              It considers the wider WordPress environment so that important
              weaknesses and suspicious indicators can be investigated in
              context.
            </p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-9">
            <ul className="grid gap-5">
              {riskSigns.map((sign) => (
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
          <p className="kicker text-emerald">AUDIT COVERAGE</p>

          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            What a WordPress security audit can review
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {auditAreas.map((area) => (
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
            From security review to practical next steps
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
            WordPress Security Audit FAQs
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
          <p className="kicker text-emerald">NEED A SECURITY REVIEW?</p>

          <h2 className="mt-5 font-display text-3xl font-semibold text-mist md:text-5xl">
            Find the security weaknesses before they become bigger problems.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-sage">
            A structured WordPress security audit can give you a clearer view
            of what needs attention and where to prioritize improvements.
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
