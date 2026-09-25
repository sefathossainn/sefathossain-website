"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

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
   * plays only a subtle upward settle on mount — no fade-in, no in-view gate.
   */
  eager?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Reveal & settle — the core motion primitive. Eased, purposeful, once.
 * Honors `prefers-reduced-motion` by rendering statically (guardrail §9.3).
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
  eager = false,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (eager) {
    // LCP-safe: visible from first paint; only a transform settle animates.
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 1, y }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
