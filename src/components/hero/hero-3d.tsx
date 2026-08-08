"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Lazy, client-only. The 3D bundle never blocks first paint; the CSS poster
// (HeroBackdrop) is what renders until — and unless — this mounts.
const LatticeCanvas = dynamic(() => import("@/components/hero/lattice-canvas"), {
  ssr: false,
});

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
  return (
    <div className={cn("absolute inset-0 z-[1]", className)} aria-hidden>
      <LatticeCanvas
        offsetX={offsetX}
        intensity={intensity}
        className={canvasClassName}
      />
    </div>
  );
}
