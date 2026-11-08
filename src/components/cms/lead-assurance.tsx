import Link from "next/link";
import { leadAssurance } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * One-line trust strip for under CTAs: reply time, starting price (linked to
 * the cost guide) and, optionally, the free hacked-site checker.
 */
export function LeadAssurance({
  className,
  showChecker = false,
  align = "start",
}: {
  className?: string;
  showChecker?: boolean;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-sm text-sage",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className={cn("flex flex-wrap gap-x-3 gap-y-1", align === "center" && "justify-center")}>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald" />
          {leadAssurance.responseTime}
        </span>
        <span aria-hidden className="hidden text-slate sm:inline">·</span>
        <Link
          href={leadAssurance.priceHref}
          className="underline decoration-line underline-offset-4 transition-colors hover:text-mist hover:decoration-emerald"
        >
          {leadAssurance.priceFrom}
        </Link>
      </p>
      {showChecker && (
        <Link
          href={leadAssurance.checkerHref}
          className="font-medium text-emerald underline-offset-4 hover:underline"
        >
          {leadAssurance.checkerLabel} →
        </Link>
      )}
    </div>
  );
}
