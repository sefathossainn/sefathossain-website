import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * The wordmark. Space Grotesk, tight tracking, with the single emerald
 * period accent from the brand guide. A real logo file (when supplied)
 * swaps in via the CMS `site_settings.logo_url`.
 */
export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "font-display text-[1.05rem] font-semibold tracking-tight text-mist",
        "transition-colors duration-300 hover:text-mist/90",
        className,
      )}
    >
      {siteConfig.wordmark}
      <span className="text-emerald">.</span>
    </Link>
  );
}
