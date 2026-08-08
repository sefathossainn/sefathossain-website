import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Interior-page hero — consistent, calm header. Sits below the fixed nav with
 * a low-key glow. Real H1 always in the DOM (SEO/a11y guardrail).
 */
export function PageHero({
  kicker,
  title,
  intro,
  children,
  align = "left",
  kickerStyle,
  titleStyle,
  introStyle,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  /** Per-block CMS text styles (size/color/weight/align). */
  kickerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  introStyle?: React.CSSProperties;
}) {
  return (
    <header className="relative overflow-hidden pb-6 pt-36 md:pt-44">
      <div
        aria-hidden
        className="glow-core pointer-events-none absolute -top-24 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 opacity-70"
      />
      <div className="container-brand relative">
        <Reveal
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {kicker && (
            <p
              className={cn(
                "kicker mb-6 flex items-center gap-3",
                align === "center" && "justify-center",
              )}
              style={kickerStyle}
            >
              <span className="inline-block h-px w-8 bg-emerald" />
              {kicker}
            </p>
          )}
          <h1
            className="text-hero font-display font-semibold text-mist [font-size:clamp(2.4rem,1.4rem+3.6vw,4.25rem)]"
            style={titleStyle}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed text-sage md:text-xl",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
              )}
              style={introStyle}
            >
              {intro}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
