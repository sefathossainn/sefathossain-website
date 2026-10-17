"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section";
  /**
   * Above-the-fold / LCP-critical content. Keeps the element fully painted on
   * first render (opacity stays 1, so it counts toward LCP immediately) and
   * plays only a subtle upward settle — pure CSS, no in-view gate.
   */
  eager?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

/**
 * Reveal & settle — the core motion primitive. Eased, purposeful, once.
 *
 * CSS transitions + one IntersectionObserver instead of framer-motion: the
 * animation library was ~130 KB of JS on every page (mostly unused), which
 * pushed back the hero's paint on mobile. Styles live in globals.css
 * (.reveal / .reveal-eager) and honour `prefers-reduced-motion` there.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
  eager = false,
  style,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [shown, setShown] = React.useState(eager);

  React.useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-12% 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  // All allowed tags share HTMLElement props; type as div for JSX.
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(eager ? "reveal-eager" : "reveal", className)}
      data-shown={shown ? "" : undefined}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
