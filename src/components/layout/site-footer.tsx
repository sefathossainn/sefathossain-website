import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { ProfilePhoto } from "@/components/brand/profile-photo";
import { getSiteSettings } from "@/lib/cms/queries";
import {
  footerNav,
  socialLinks,
  siteConfig,
  profile,
} from "@/lib/site-config";

export async function SiteFooter() {
  const year = 2026; // rendered at build; the running year is not needed here
  const settings = await getSiteSettings();

  return (
    <footer className="relative mt-auto border-t border-line/70 bg-forest/40">
      {/* fog close — the film settles back into obsidian */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-forest/40"
      />
      <div className="container-brand py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <ProfilePhoto
                src={settings.profile_photo}
                alt={profile.alt}
                className="h-9 w-9 shrink-0"
                sizes="36px"
              />
              <Wordmark />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-sage">
              {siteConfig.tagline} High-performance sites, secured from day one
              — and looked after long after launch.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="kicker transition-colors hover:text-mist"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="kicker kicker-emerald">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-sage transition-colors hover:text-mist"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="hairline my-12" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          {/* Baked-in design credit (Brief §13) — intentional, tasteful */}
          <p className="flex items-center gap-1.5 text-xs">
            <span className="kicker text-sage">Site by</span>
            <Link
              href={siteConfig.credit.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.82rem] font-semibold tracking-wide text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-emerald hover:decoration-emerald"
            >
              Mohammad Emmon
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
