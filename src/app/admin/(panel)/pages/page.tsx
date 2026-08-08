import Link from "next/link";
import { requireSection } from "@/lib/admin/guard";
import { AdminHeader } from "@/components/admin/ui";

const PAGES = [
  { slug: "home", label: "Home", desc: "Hero, Build·Secure·Grow, belief, audit, CTA" },
  { slug: "services", label: "Services", desc: "Intro, care-plan note, CTA" },
  { slug: "work", label: "Work index", desc: "Intro, projects note" },
  { slug: "about", label: "About", desc: "Story, belief, how I work, credentials" },
  { slug: "blog", label: "Blog index", desc: "Intro copy" },
  { slug: "contact", label: "Contact", desc: "Intro copy" },
  { slug: "security-audit", label: "Security audit", desc: "Offer, what you get, reassurance" },
];

export default async function PagesIndex() {
  await requireSection("pages");
  return (
    <>
      <AdminHeader
        title="Pages"
        description="Edit any headline, paragraph, list, or image — plus per-page SEO."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {PAGES.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/pages/${p.slug}`}
            className="panel p-5 transition-colors hover:border-evergreen"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-mist">
                {p.label}
              </h2>
              <span className="text-emerald">→</span>
            </div>
            <p className="mt-2 text-sm text-sage">{p.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
