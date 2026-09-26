"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type QA = { question: string; answer: string };

/**
 * "People also ask" — a follow-up-questions accordion at the foot of a post.
 * Mirrors Google's PAA block (and pairs with FAQPage JSON-LD), so it's strong
 * for both featured snippets and AI answer engines. First item opens by default.
 */
export function PeopleAlsoAsk({ items }: { items: QA[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const reduced = useReducedMotion();

  if (!items.length) return null;

  return (
    <div>
      <p className="kicker text-emerald">Follow-up questions</p>
      <h2 className="mt-4 font-display text-[clamp(1.9rem,1.3rem+2vw,2.75rem)] font-semibold tracking-tight text-mist">
        People also ask
      </h2>

      <div className="mt-10 divide-y divide-line/70 border-y border-line/70">
        {items.map((qa, i) => {
          const isOpen = open === i;
          return (
            <div key={qa.question}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-display text-lg font-semibold transition-colors md:text-xl",
                    isOpen ? "text-emerald" : "text-mist",
                  )}
                >
                  {qa.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid h-7 w-7 shrink-0 place-items-center transition-colors",
                    isOpen ? "text-emerald" : "text-emerald/80",
                  )}
                >
                  {/* horizontal bar (always) */}
                  <span
                    className={cn(
                      "absolute h-px w-4 bg-current transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  />
                  {/* vertical bar → rotates to form an × when open */}
                  <span
                    className={cn(
                      "absolute h-4 w-px bg-current transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-7 leading-relaxed text-sage">
                      {qa.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
