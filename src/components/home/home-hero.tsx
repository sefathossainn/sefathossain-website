import Image from "next/image";
import { HeroBackdrop } from "@/components/hero/hero-backdrop";
import { Hero3D } from "@/components/hero/hero-3d";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/site-config";
import { CmsIcon } from "@/lib/icons";
import type { PageContent } from "@/lib/cms/queries";

/** Colour the final word of the headline emerald (the brand accent moment). */
function AccentHeadline({ text }: { text: string }) {
  const words = text.trim().split(" ");
  const last = words.pop() ?? "";
  return (
    <>
      {words.join(" ")} <span className="text-emerald">{last}</span>
    </>
  );
}

/**
 * The person — a background-removed cutout, so he stands directly in front of
 * the Secure Lattice (the structure he builds and protects) with the animation
 * reading behind and around him. Minimal treatment to keep the face legible;
 * a drop-shadow lifts him off the scene and a base fade melts him into the
 * obsidian floor.
 */
function HeroPortrait({
  src,
  alt,
  name,
  role,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 92vw, 46vw"
        className="object-contain object-bottom [filter:drop-shadow(0_24px_50px_rgba(6,12,9,0.6))]"
      />
      {/* melt the base into the floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian to-transparent" />
      {/* name caption — editable from Pages → Home (hero.person_name / hero.person_role) */}
      {(name || role) && (
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          {name && (
            <p className="font-display text-base font-semibold text-mist">
              {name}
            </p>
          )}
          {role && <p className="kicker mt-1 text-sage">{role}</p>}
        </div>
      )}
    </div>
  );
}

/**
 * Home hero — split composition. The Secure Lattice is demoted to a supporting
 * background element shifted behind the photo; the CSS poster is the base and
 * the reduced-motion / mobile fallback. All copy stays in the DOM.
 * Load sequence: environment (lattice/fog) → person (photo settles) → statement
 * (headline reveals). Restrained throughout.
 */
export function HomeHero({
  content,
  photo,
}: {
  content: PageContent;
  photo?: string | null;
}) {
  // Hero uses the background-removed cutout so the lattice reads behind him;
  // falls back to the CMS profile photo if the cutout is ever absent.
  const heroSrc = profile.heroImage ?? photo;
  const hasPhoto = Boolean(heroSrc);
  // Editable caption from Pages → Home; falls back to the static defaults.
  const personName = content.text("hero.person_name") || profile.name;
  const personRole = content.text("hero.person_role") || profile.shortRole;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* base poster (also the reduced-motion / mobile fallback) */}
      <HeroBackdrop />
      {/* the lattice — shifted behind the person, now visible through the cutout */}
      <Hero3D offsetX={1.45} intensity={1} canvasClassName="opacity-90" />

      {/* left scrim keeps the copy legible over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-obsidian via-obsidian/75 to-transparent"
      />

      <div className="container-brand relative z-10 w-full pt-28 pb-16 md:py-0">
        <div
          className={
            hasPhoto
              ? "grid items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-6"
              : "max-w-3xl"
          }
        >
          {/* Text column */}
          <div className="order-2 max-w-xl md:order-1">
            <Reveal delay={0.3}>
              <p className="kicker mb-6 flex items-center gap-3" style={content.style("hero.kicker")}>
                <CmsIcon
                  name={content.text("hero.kicker_icon") || "shield"}
                  className="h-4 w-4 shrink-0 text-emerald"
                />
                {content.text("hero.kicker")}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <h1 className="text-hero font-display font-semibold" style={content.style("hero.headline")}>
                <AccentHeadline text={content.text("hero.headline")} />
              </h1>
            </Reveal>

            <Reveal delay={0.5}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-sage" style={content.style("hero.subhead")}>
                {content.text("hero.subhead")}
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/security-audit" variant="primary" size="lg">
                  {content.text("hero.cta_primary")}
                </Button>
                <Button href="/work" variant="secondary" size="lg">
                  {content.text("hero.cta_secondary")}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Photo column — the person arrives into the scene */}
          {hasPhoto && (
            <Reveal
              y={34}
              delay={0.15}
              className="order-1 md:order-2 md:self-stretch"
            >
              <div className="relative mx-auto h-[56svh] w-full max-w-sm md:h-[92svh] md:max-w-none md:-mr-[3vw]">
                <HeroPortrait
                  src={heroSrc as string}
                  alt={profile.alt}
                  name={personName}
                  role={personRole}
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="kicker text-slate">Scroll</span>
      </div>
    </section>
  );
}
