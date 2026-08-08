import type { Metric } from "@/lib/cms/types";

/**
 * Metric card — rendered ONLY where a real number exists. Never a fabricated
 * or zero metric (Brief §8): pages omit this entirely and show the qualitative
 * outcome when `metrics` is empty.
 */
export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="panel px-6 py-7">
      <div className="font-mono text-3xl font-medium tracking-tight text-signal md:text-4xl">
        {metric.value}
      </div>
      <div className="kicker mt-3 text-slate">{metric.label}</div>
    </div>
  );
}

export function MetricRow({ metrics }: { metrics: Metric[] }) {
  if (!metrics.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((m, i) => (
        <MetricCard key={`${m.label}-${i}`} metric={m} />
      ))}
    </div>
  );
}
