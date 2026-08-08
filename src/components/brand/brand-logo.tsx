import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig, profile } from "@/lib/site-config";
import { ProfilePhoto } from "@/components/brand/profile-photo";

/**
 * The navbar identity lock-up: Sefat's photo + name + title, used as the logo.
 * All three are CMS-driven — photo (`site_settings.profile_photo`), name
 * (`brand_name`) and title (`brand_title`) — with static config fallbacks so
 * the logo always renders. Photo falls back to the on-brand initials monogram.
 */
export function BrandLogo({
  photo,
  name,
  title,
  href = "/",
  className,
}: {
  photo?: string | null;
  name?: string | null;
  title?: string | null;
  href?: string;
  className?: string;
}) {
  const displayName = (name ?? "").trim() || siteConfig.wordmark;
  // A title of "" (explicitly cleared in the CMS) hides the line; null → default.
  const displayTitle = title == null ? profile.shortRole : title.trim();

  return (
    <Link
      href={href}
      aria-label={`${displayName} — home`}
      className={cn("group flex items-center gap-3 sm:gap-3.5", className)}
    >
      <ProfilePhoto
        src={photo}
        alt={profile.alt}
        className="h-11 w-11 shrink-0 sm:h-[3.25rem] sm:w-[3.25rem]"
        sizes="52px"
        objectPosition="50% 20%"
      />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display text-[1.15rem] font-semibold leading-none tracking-tight text-mist transition-colors duration-300 group-hover:text-mist/90 sm:text-[1.28rem]">
          {displayName}
          <span className="text-emerald">.</span>
        </span>
        {displayTitle && (
          <span className="mt-1.5 hidden whitespace-nowrap text-[0.64rem] font-medium uppercase leading-none tracking-[0.13em] text-sage sm:block">
            {displayTitle}
          </span>
        )}
      </span>
    </Link>
  );
}
