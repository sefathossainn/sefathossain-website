import { cn } from "@/lib/utils";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/ui/reveal";

/** Full-width section with the standard vertical rhythm + container. */
export function Section({
  children,
  id,
  className,
  surface,
  containerClassName,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Slightly raised surface (forest) vs. the obsidian canvas. */
  surface?: boolean;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section relative",
        surface && "bg-forest/40",
        className,
      )}
    >
      <div className={cn("container-brand", containerClassName)}>{children}</div>
    </section>
  );
}

/** Kicker + large heading + optional intro, revealed together. */
export function SectionHeader({
  kicker,
  index,
  title,
  intro,
  align = "left",
  className,
  kickerStyle,
  titleStyle,
  introStyle,
}: {
  kicker?: string;
  index?: number;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Per-block CMS text styles (size/color/weight/align). */
  kickerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  introStyle?: React.CSSProperties;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <Kicker
          index={index}
          className={cn("mb-5", align === "center" && "justify-center")}
          style={kickerStyle}
        >
          {kicker}
        </Kicker>
      )}
      <h2 className="text-display font-display font-semibold text-mist" style={titleStyle}>
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-sage" style={introStyle}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
