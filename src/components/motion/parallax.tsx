"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Restrained scroll-linked parallax (GSAP ScrollTrigger, scrubbed). Transform
 * only — never hides content. Disabled under `prefers-reduced-motion`.
 */
export function Parallax({
  children,
  amount = 8,
  className,
}: {
  children: React.ReactNode;
  /** yPercent travel across the scroll range. */
  amount?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
