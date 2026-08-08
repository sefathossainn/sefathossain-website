import { cn } from "@/lib/utils";

/**
 * CSS "Secure Lattice" backdrop — a precision grid receding into fog around a
 * soft signal-green core. This is the elegant static poster served on mobile
 * and under `prefers-reduced-motion` (guardrail §9), and the layer the R3F
 * scene fades in over on capable desktops (Phase 5).
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Deep field */}
      <div className="absolute inset-0 bg-obsidian" />

      {/* Perspective precision grid — structure, order, protection */}
      <div
        className="absolute inset-x-0 bottom-0 top-1/3 opacity-40 [transform:perspective(600px)_rotateX(62deg)] [transform-origin:center_bottom]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-evergreen) 65%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-evergreen) 65%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(120% 80% at 50% 100%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 100%, #000 20%, transparent 75%)",
        }}
      />

      {/* The protected core — the single low-key light source */}
      <div className="glow-core absolute left-1/2 top-[42%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2" />
      <div
        className="absolute left-1/2 top-[42%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-signal) 55%, transparent), transparent 70%)",
        }}
      />

      {/* Faceted vault glyph — suggests architecture without cliché */}
      <svg
        viewBox="0 0 200 200"
        className="absolute left-1/2 top-[42%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-emerald/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
        <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" />
        <path d="M100,20 L100,50 M170,60 L145,75 M170,140 L145,125 M100,180 L100,150 M30,140 L55,125 M30,60 L55,75" />
      </svg>

      {/* Atmospheric fog closing the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_40%,var(--color-obsidian)_92%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />
    </div>
  );
}
