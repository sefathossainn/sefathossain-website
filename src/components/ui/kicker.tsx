import { cn } from "@/lib/utils";

/**
 * Mono section label (JetBrains Mono, uppercase, wide tracking). Optional
 * two-digit index for the "01 · LABEL" numbering used across the site.
 */
export function Kicker({
  children,
  index,
  className,
  emerald,
  style,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  emerald?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <p className={cn("kicker flex items-center gap-3", className)} style={style}>
      {typeof index === "number" && (
        <span className="text-emerald">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span aria-hidden className="inline-block h-px w-6 bg-current opacity-40" />
      <span className={emerald ? "kicker-emerald" : undefined}>{children}</span>
    </p>
  );
}
