"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { SecureLatticeScene } from "@/components/hero/secure-lattice-scene";
import { cn } from "@/lib/utils";

/**
 * Guardrailed R3F mount (Brief §9). Renders the Secure Lattice ONLY when the
 * device is capable and motion is allowed:
 *  - respects `prefers-reduced-motion`
 *  - desktop-ish widths only (mobile keeps the static poster)
 *  - pauses the render loop when the hero scrolls out of view (battery)
 *  - caps DPR; never blocks first paint (dynamically imported, ssr:false)
 * When gated out it renders nothing, so the CSS poster remains the hero.
 */
export default function LatticeCanvas({
  offsetX = 0,
  intensity = 1,
  className,
}: {
  offsetX?: number;
  intensity?: number;
  className?: string;
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    const enoughCores =
      typeof navigator !== "undefined"
        ? (navigator.hardwareConcurrency ?? 4) >= 4
        : true;
    // Client-only capability detection — must run post-mount (no window on SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!reduced && wideEnough && enoughCores);
  }, []);

  React.useEffect(() => {
    if (!enabled || !wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "absolute inset-0 transition-opacity duration-1000 ease-out",
        className,
      )}
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
      >
        <SecureLatticeScene offsetX={offsetX} intensity={intensity} />
      </Canvas>
    </div>
  );
}
