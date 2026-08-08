"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Faq } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <div className="divide-y divide-line/70 border-y border-line/70">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.id ?? i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "font-display text-lg font-medium transition-colors md:text-xl",
                  isOpen ? "text-mist" : "text-sage",
                )}
              >
                {faq.question}
              </span>
              <span
                aria-hidden
                className={cn(
                  "relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-sage transition-all duration-300",
                  isOpen && "rotate-45 border-emerald text-emerald",
                )}
              >
                <span className="absolute h-px w-3.5 bg-current" />
                <span className="absolute h-3.5 w-px bg-current" />
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
                  <p className="max-w-2xl pb-6 leading-relaxed text-sage">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
