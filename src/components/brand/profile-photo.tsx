import Image from "next/image";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/site-config";

type Rounded = "full" | "2xl" | "xl";

const roundedMap: Record<Rounded, string> = {
  full: "rounded-full",
  "2xl": "rounded-[var(--radius-xl)]",
  xl: "rounded-[var(--radius-lg)]",
};

/**
 * Sefat's portrait, treated to live inside the deep-green palette — a light
 * duotone tint + vignette + hairline ring, never a bright stock-photo island.
 * Sizing/shape come from `className` (the caller sets width/height). Falls back
 * to an initials monogram (never a stock person) when no photo is set.
 */
export function ProfilePhoto({
  src,
  alt = profile.alt,
  className,
  rounded = "full",
  sizes = "160px",
  priority = false,
  objectPosition = "50% 22%",
  initials,
}: {
  src?: string | null;
  alt?: string;
  className?: string;
  rounded?: Rounded;
  sizes?: string;
  priority?: boolean;
  /** face sits high in the frame — default crops toward the top */
  objectPosition?: string;
  /** fallback monogram initials when no photo is set */
  initials?: string;
}) {
  if (!src) {
    return (
      <Monogram className={className} rounded={rounded} initials={initials} />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line/70 bg-forest",
        roundedMap[rounded],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover [filter:saturate(0.92)_contrast(1.03)]"
        style={{ objectPosition }}
      />
      {/* subtle deep-green duotone (#0B1811 → #1E7A4E) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0B1811]/30 to-[#1E7A4E]/18 mix-blend-color" />
      {/* vignette — sink it into the dark */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_36px_rgba(6,12,9,0.55)]" />
      {/* emerald ring for definition */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 ring-1 ring-inset ring-emerald/20",
          roundedMap[rounded],
        )}
      />
    </div>
  );
}

/** Initials fallback — on-brand, never a stock face. */
export function Monogram({
  className,
  rounded = "full",
  initials = profile.initials,
}: {
  className?: string;
  rounded?: Rounded;
  initials?: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center border border-evergreen/60 bg-pine text-emerald",
        roundedMap[rounded],
        className,
      )}
      aria-hidden
    >
      <span className="font-display text-[0.9em] font-semibold tracking-tight">
        {initials}
      </span>
    </div>
  );
}
