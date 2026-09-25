import Link from "next/link";

import { getSiteSettings } from "@/lib/cms/queries";
import { siteConfig, socialLinks, profile } from "@/lib/site-config";
import { ProfilePhoto } from "@/components/brand/profile-photo";

/**
 * Author box shown at the end of a blog post — an E-E-A-T signal that ties the
 * article to a real, credentialed person. Uses the CMS profile photo (falling
 * back to the bundled portrait) and the site's own social links; no invented
 * biography or claims.
 */
export async function AuthorBio({ name }: { name?: string }) {
  const settings = await getSiteSettings();
  const photo = settings.profile_photo || "/images/sefat-photo.png";
  const authorName = name || siteConfig.name;

  return (
    <aside className="mt-14 rounded-[var(--radius-xl)] border border-line bg-forest/40 p-7 md:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <ProfilePhoto
          src={photo}
          alt={profile.alt}
          className="h-20 w-20 shrink-0"
          sizes="80px"
          initials={profile.initials}
        />

        <div>
          <p className="kicker text-emerald">Written by</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-mist">
            {authorName}
          </h3>
          <p className="mt-1 text-sm text-slate">{profile.shortRole}</p>

          <p className="mt-4 max-w-2xl leading-relaxed text-sage">
            Sefat Hossain is a WordPress security specialist who helps
            businesses across the United States recover hacked websites, remove
            malware, and harden WordPress so it stays protected long after
            launch.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link href="/about" className="text-emerald hover:underline">
              About Sefat
            </Link>
            <Link href="/contact" className="text-emerald hover:underline">
              Work with me
            </Link>
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate transition-colors hover:text-mist"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
