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
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
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
