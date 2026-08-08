import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

/**
 * Featured agency band — Get Shielded (Sefat's team/agency). Fully CMS-driven
 * from Pages → Home (getshielded.*). Hidden entirely if the URL is cleared.
 * The brand logo sits on a white chip so it reads correctly on the dark theme.
 */
export function GetShieldedFeature({
  eyebrow,
  blurb,
  cta,
  url,
  logo,
}: {
  eyebrow?: string;
  blurb?: string;
  cta?: string;
  url?: string;
  logo?: { url: string; alt: string } | null;
}) {
  if (!url) return null;

  return (
    <Reveal>
      <div className="panel relative overflow-hidden p-8 md:p-10">
        <div
          aria-hidden
          className="glow-core pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-50"
        />
        <div className="relative grid items-center gap-7 md:grid-cols-[auto_1fr_auto] md:gap-9">
          {logo?.url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
              aria-label={logo.alt || "Get Shielded"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.url}
                alt={logo.alt || "Get Shielded"}
                className="h-8 w-auto md:h-9"
              />
            </a>
          )}

          <div>
            {eyebrow && <p className="kicker kicker-emerald">{eyebrow}</p>}
            {blurb && (
              <p className="mt-2 max-w-xl leading-relaxed text-sage">{blurb}</p>
            )}
          </div>

          <Button
            href={url}
            variant="secondary"
            className="w-fit whitespace-nowrap md:justify-self-end"
          >
            {cta || "Visit Get Shielded"}
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
