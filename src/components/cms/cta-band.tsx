import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLink = { label: string; href: string };

/**
 * Shared closing CTA. `glow` lights the signal-green bloom — reserve it for the
 * lead-magnet moment (the single brightest beat per the storyboard).
 */
export function CtaBand({
  title,
  primary,
  secondary,
  glow = false,
  titleStyle,
}: {
  title: string;
  primary: CtaLink;
  secondary?: CtaLink;
  glow?: boolean;
  titleStyle?: React.CSSProperties;
}) {
  return (
    <Section className="overflow-hidden">
      <Reveal className="relative mx-auto max-w-3xl text-center">
        {glow && (
          <div
            aria-hidden
            className="glow-core pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2"
          />
        )}
        <h2
          className={cn(
            "relative text-display font-display font-semibold text-mist",
          )}
          style={titleStyle}
        >
          {title}
        </h2>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={primary.href} variant="primary" size="lg">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
