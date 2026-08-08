"use client";

import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Syncs GSAP ScrollTrigger to Lenis momentum scroll, so scroll-linked
 * animations track the smoothed scroll position rather than the native one.
 * Rendered inside the Lenis provider (only when smooth scroll is active).
 */
export function GsapBridge() {
  useLenis(() => ScrollTrigger.update());
  return null;
}
