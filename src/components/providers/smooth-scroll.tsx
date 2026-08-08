"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { GsapBridge } from "@/components/motion/gsap-bridge";

/**
 * Global momentum scroll (Lenis). Scroll always belongs to the user —
 * no scroll-jacking. Under `prefers-reduced-motion` we fall back to native
 * scrolling entirely (guardrail §9.3). GSAP ScrollTrigger is synced to this
 * instance in the motion layer (Phase 5).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}
