import type { Metadata } from "next";
import Link from "next/link";

import { getPageContent, getSiteSettings } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, socialLinks, profile } from "@/lib/site-config";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { ContactForm } from "@/components/forms/contact-form";
import { ProfilePhoto } from "@/components/brand/profile-photo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("contact");
  return pageMetadata({ content, path: "/contact" });
}

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getPageContent("contact"),
    getSiteSettings(),
  ]);
  const calendarUrl = settings.calendar_url;
  const whatsappNumber = settings.whatsapp_number;
  const photo = settings.profile_photo;
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL;

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

      <Section className="!pt-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Alternatives */}
          <Reveal delay={0.1} className="grid content-start gap-8">
            {/* Who you'll be talking to */}
            <div className="panel flex items-center gap-4 p-5">
              <ProfilePhoto
                src={photo}
                alt={profile.alt}
                className="h-16 w-16 shrink-0"
                sizes="64px"
              />
              <div>
                <p className="font-display text-sm font-semibold text-mist">
                  {profile.name}
                </p>
                <p className="mt-1 text-sm text-sage">
                  I read every message myself — you&rsquo;ll hear back from me
                  directly.
                </p>
              </div>
            </div>

            <div>
              <Kicker className="mb-4">Prefer to talk?</Kicker>
              <div className="grid gap-3">
                {calendarUrl ? (
                  <Link
                    href={calendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="panel flex items-center justify-between px-5 py-4 transition-colors hover:border-evergreen"
                  >
                    <span className="text-mist">Book a call</span>
                    <span aria-hidden className="text-emerald">↗</span>
                  </Link>
                ) : (
                  <p className="text-sm text-slate">
                    Booking link coming soon — send a message and we&rsquo;ll
                    find a time.
                  </p>
                )}

                {whatsappNumber && (
                  <Link
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="panel flex items-center justify-between px-5 py-4 transition-colors hover:border-evergreen"
                  >
                    <span className="text-mist">WhatsApp me</span>
                <span aria-hidden className="text-emerald">→</span>
                  </Link>
                )}

                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="panel flex items-center justify-between px-5 py-4 transition-colors hover:border-evergreen"
                >
                  <span className="text-mist">Email me directly</span>
                  <span aria-hidden className="text-emerald">→</span>
                </Link>

                {cvUrl && (
                  <Link
                    href={cvUrl}
                    className="panel flex items-center justify-between px-5 py-4 transition-colors hover:border-evergreen"
                  >
                    <span className="text-mist">Download CV</span>
                    <span aria-hidden className="text-emerald">↓</span>
                  </Link>
                )}
              </div>
            </div>

            <div>
              <Kicker className="mb-4">Elsewhere</Kicker>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-sage transition-colors hover:text-mist"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
