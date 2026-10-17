"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Lazy, client-only. The 3D bundle never blocks first paint; the CSS poster
// (HeroBackdrop) is what renders until — and unless — this mounts.
const LatticeCanvas = dynamic(() => import("@/components/hero/lattice-canvas"), {
  ssr: false,
});

/**
 * Decide whether to load the 3D scene at all, BEFORE importing it. The gate
 * used to live only inside LatticeCanvas, so phones still downloaded and
 * parsed the whole three.js / react-three-fiber chunk just to render nothing —
 * main-thread work that delayed the hero portrait's paint (mobile LCP 5–8 s,
 * mostly "render delay"). Now mobile, reduced-motion and low-core devices
 * never fetch it, and desktop fetches it once the browser is idle.
 */
function useDeferred3D() {
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const enoughCores = (navigator.hardwareConcurrency ?? 4) >= 4;
    if (reduced || !wideEnough || !enoughCores) return;

    const start = () => setLoad(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  return load;
}

export function Hero3D({
  offsetX = 0,
  intensity = 1,
  className,
  canvasClassName,
}: {
  offsetX?: number;
  intensity?: number;
  className?: string;
  canvasClassName?: string;
}) {
  const load = useDeferred3D();

  return (
    <div className={cn("absolute inset-0 z-[1]", className)} aria-hidden>
      {load && (
        <LatticeCanvas
          offsetX={offsetX}
          intensity={intensity}
          className={canvasClassName}
        />
      )}
    </div>
  );
}
