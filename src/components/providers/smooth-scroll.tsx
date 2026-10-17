"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";

/**
 * Global momentum scroll (Lenis). Scroll always belongs to the user —
 * no scroll-jacking. Under `prefers-reduced-motion` we fall back to native
 * scrolling entirely (guardrail §9.3).
 *
 * GSAP is no longer bridged here: ScrollTrigger is only used by <Parallax>
 * (case-study pages), so it syncs itself to Lenis there. Importing GSAP in
 * this provider shipped ~110 KB of JS to every page.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
      {children}
    </ReactLenis>
  );
}
