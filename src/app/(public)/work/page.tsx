import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getPageContent, getCaseStudies, getProjects } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CaseStudyCard } from "@/components/cms/case-study-card";
import { CtaBand } from "@/components/cms/cta-band";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("work");
  return pageMetadata({ content, path: "/work" });
}

export default async function WorkPage() {
  const [content, studies, projects] = await Promise.all([
    getPageContent("work"),
    getCaseStudies(),
    getProjects(),
  ]);

  return (
    <>
      <PageHero
        kicker={content.text("hero.kicker")}
        title={content.text("hero.h1")}
        intro={content.text("intro.text")}
        kickerStyle={content.style("hero.kicker")}
        titleStyle={content.style("hero.h1")}
        introStyle={content.style("intro.text")}
      />

      {/* Case study grid — security stories foregrounded */}
      <Section className="!pt-12">
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 2) * 0.08}>
              <CaseStudyCard study={study} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Build gallery */}
      <Section surface>
        <SectionHeader
          kicker={content.text("projects.kicker")}
          title="Selected builds"
          kickerStyle={content.style("projects.kicker")}
        />
        {projects.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug ?? project.title} delay={i * 0.06}>
                <div className="panel group overflow-hidden">
                  {project.images?.[0] && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-mist">
                      {project.title}
                    </h3>
                    {project.summary && (
                      <p className="mt-2 text-sm text-sage">{project.summary}</p>
                    )}
                    {project.live_url && (
                      <Link
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-emerald"
                      >
                        Visit live site <span aria-hidden>↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-8 max-w-2xl">
            <p className="leading-relaxed text-sage" style={content.style("projects.note")}>
              {content.text("projects.note")}
            </p>
          </Reveal>
        )}
      </Section>

      <CtaBand
        title="Have a project in mind?"
        primary={{ label: "Let's talk", href: "/contact" }}
        secondary={{ label: "Get a free audit", href: "/security-audit" }}
      />
    </>
  );
}
