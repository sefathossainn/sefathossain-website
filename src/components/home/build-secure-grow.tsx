import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { PageContent } from "@/lib/cms/queries";

const pillars = [
  { key: "build", label: "Build" },
  { key: "secure", label: "Secure" },
  { key: "grow", label: "Grow" },
] as const;

/**
 * Build · Secure · Grow — the offer, in three beats. Phase 5 assembles the
 * pillars on scroll (GSAP ScrollTrigger); the content is always in the DOM.
 */
export function BuildSecureGrow({ content }: { content: PageContent }) {
  return (
    <Section id="build-secure-grow" surface>
      <SectionHeader
        kicker={content.text("bsg.kicker")}
        title={content.text("bsg.headline")}
        kickerStyle={content.style("bsg.kicker")}
        titleStyle={content.style("bsg.headline")}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal
            key={p.key}
            delay={i * 0.08}
            className="panel group relative overflow-hidden p-8 transition-colors duration-500 hover:border-evergreen"
          >
            {/* pillar index + hairline */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-emerald">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="kicker text-slate">{p.label}</span>
            </div>

            <h3
              className="mt-6 font-display text-2xl font-semibold text-mist"
              style={content.style(`bsg.${p.key}.title`)}
            >
              {content.text(`bsg.${p.key}.title`)}
            </h3>
            <p
              className="mt-3 leading-relaxed text-sage"
              style={content.style(`bsg.${p.key}.body`)}
            >
              {content.text(`bsg.${p.key}.body`)}
            </p>

            {/* quiet corner glow on hover */}
            <div className="glow-core pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
