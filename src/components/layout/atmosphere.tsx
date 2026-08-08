/**
 * Global atmosphere — subtle film grain and edge vignette that sit above the
 * page but below content. Fixed, pointer-events-none, cheap. Gives the deep
 * green its cinematic weight (Brand Guide §06).
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      {/* Film grain */}
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
      {/* Edge vignette — atmospheric fog at the boundaries */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_180px_60px_rgba(6,12,9,0.9)]" />
    </div>
  );
}
