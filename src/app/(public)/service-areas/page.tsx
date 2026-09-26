import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { breadcrumbSchema } from "@/lib/schema";
import { serviceAreas } from "@/lib/service-areas";

const PATH = "/service-areas";
const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Service Areas", path: PATH },
];

export const metadata: Metadata = {
  title: "WordPress Malware Removal Across the USA | Service Areas | Sefat Hossain",
  description:
    "Remote WordPress malware removal, hacked-site recovery, and security hardening for businesses across the United States — New York, Los Angeles, Chicago, Houston, Miami, and more.",
  alternates: { canonical: PATH },
};

export default function ServiceAreasPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      {/* Hero */}
      <section className="border-b border-line bg-obsidian px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={CRUMBS} className="mb-6" />
          <p className="kicker text-emerald">SERVICE AREAS — UNITED STATES</p>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            WordPress malware removal across the USA
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
            I work with businesses across the United States — remotely, securely,
            and around US business hours. Whether your site is hacked, redirecting
            visitors, or flagged by Google, I clean it, close the entry point, and
            harden it so it doesn&apos;t happen again. Find your city below, or
            reach out from anywhere in the country.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/security-audit"
              className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3.5 font-medium text-obsidian transition hover:opacity-90"
            >
              Get a Free Assessment
            </Link>
            <Link
              href="/services/wordpress-malware-removal"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
            >
              About the Service
            </Link>
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="bg-obsidian px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker text-emerald">FIND YOUR CITY</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold text-mist md:text-4xl">
            Cities I work with across the country
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group flex flex-col rounded-[var(--radius-xl)] border border-line bg-forest/30 p-7 transition-colors hover:border-emerald/50"
              >
                <p className="kicker text-emerald">
                  {area.city}, {area.stateAbbr}
                </p>
                <p className="mt-4 flex-1 leading-relaxed text-sage">
                  {area.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-emerald">
                  WordPress malware removal in {area.city}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                    fill="none"
                  >
                    <path
                      d="M5 12h14m0 0-6-6m6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 max-w-3xl leading-relaxed text-slate">
            Don&apos;t see your city? I work with businesses everywhere in the US.{" "}
            <Link href="/contact" className="text-emerald hover:underline">
              Reach out
            </Link>{" "}
            and I&apos;ll help wherever you are.
          </p>
        </div>
      </section>
    </main>
  );
}
