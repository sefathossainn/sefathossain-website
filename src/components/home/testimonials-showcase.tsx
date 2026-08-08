"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import type { Testimonial } from "@/lib/cms/types";
import { ProfilePhoto } from "@/components/brand/profile-photo";
import { CmsIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Item = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string | null;
  rating?: number;
};

export function TestimonialsShowcase({
  kicker,
  headline,
  statNumber,
  statLabel,
  statSubtext,
  autoplay,
  interval,
  testimonials,
  signature,
  kickerStyle,
  headlineStyle,
}: {
  kicker: string;
  headline: string;
  statNumber?: string;
  statLabel?: string;
  statSubtext?: string;
  autoplay: boolean;
  interval: number; // seconds
  testimonials: Testimonial[];
  signature: Item;
  kickerStyle?: React.CSSProperties;
  headlineStyle?: React.CSSProperties;
}) {
  const items: Item[] = testimonials.length ? testimonials : [signature];
  const many = items.length > 1;

  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const safeIndex = index % items.length;
  const go = (i: number) => setIndex(((i % items.length) + items.length) % items.length);

  React.useEffect(() => {
    if (!autoplay || !many || paused) return;
    const ms = 3000;
    const t = setInterval(() => setIndex((n) => n + 1), ms);
    return () => clearInterval(t);
  }, [autoplay, many, paused, interval, items.length]);

  const current = items[safeIndex];
  const avatars = items.filter((t) => t.avatar).slice(0, 4);
  const stackSource = avatars.length ? avatars : items.slice(0, 4);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      {/* Left — heading + social proof */}
      <Reveal>
        <span
          className="kicker kicker-emerald inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/5 px-4 py-2"
          style={kickerStyle}
        >
          <CmsIcon name="sparkles" className="h-3.5 w-3.5 text-emerald" />
          {kicker}
        </span>

        <h2
          className="mt-6 font-display text-display font-semibold text-mist"
          style={headlineStyle}
        >
          {headline}
        </h2>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-emerald to-transparent" />
          <span className="h-1.5 w-1.5 rotate-45 bg-emerald" />
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="mt-8 flex items-center gap-4">
          {stackSource.length > 0 && (
            <div className="flex -space-x-3">
              {stackSource.map((t, i) => (
                <ProfilePhoto
                  key={i}
                  src={t.avatar}
                  alt={`${t.author} — photo`}
                  initials={initialsOf(t.author)}
                  className="h-11 w-11 ring-2 ring-obsidian"
                  sizes="44px"
                />
              ))}
            </div>
          )}
          <div>
            <p className="font-display text-base font-semibold text-mist">
              {statNumber ? `${statNumber} ` : ""}
              {statLabel}
            </p>
            {statSubtext && (
              <p className="mt-0.5 text-sm text-sage">{statSubtext}</p>
            )}
          </div>
        </div>
      </Reveal>

      {/* Right — sliding testimonial card */}
      <Reveal delay={0.1}>
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-gradient-to-br from-pine to-forest/60 p-8 md:p-10">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal/10 blur-3xl"
            />

            {/* dots */}
            {many && (
              <div className="absolute right-6 top-6 z-10 flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => go(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === safeIndex
                        ? "w-5 bg-signal"
                        : "w-2 bg-line hover:bg-evergreen",
                    )}
                  />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {current.company && (
                  <p className="kicker mb-4 text-emerald">{current.company}</p>
                )}

                <blockquote className="min-h-[7.5rem] text-lg leading-relaxed text-mist md:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ProfilePhoto
                      src={current.avatar}
                      alt={`${current.author} — photo`}
                      initials={initialsOf(current.author)}
                      className="h-12 w-12 shrink-0"
                      sizes="48px"
                    />
                    <div>
                      <p className="font-display text-base font-semibold text-mist">
                        {current.author}
                      </p>
                      {current.role && (
                        <p className="text-sm italic text-sage">{current.role}</p>
                      )}
                    </div>
                  </div>

                  {typeof current.rating === "number" && current.rating > 0 && (
                    <div className="hidden text-right sm:block">
                      <p className="kicker text-slate">Review score</p>
                      <div className="mt-1.5 flex justify-end gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Sparkle
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < current.rating!
                                ? "fill-emerald text-emerald"
                                : "fill-transparent text-line",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* bottom accent bar */}
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-1 rounded-t-full bg-gradient-to-r from-emerald to-signal" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
