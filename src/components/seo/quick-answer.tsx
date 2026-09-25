/**
 * A short, plainly-worded answer block placed near the top of a page. Search
 * featured snippets and AI answer engines lift concise, self-contained answers
 * like this, so it doubles as a GEO (generative-engine optimization) signal.
 */
export function QuickAnswer({
  children,
  label = "Quick answer",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-line border-l-2 border-l-emerald bg-forest/40 p-6 md:p-7">
      <p className="kicker text-emerald">{label}</p>
      <p className="mt-3 text-lg leading-relaxed text-mist/90">{children}</p>
    </div>
  );
}
