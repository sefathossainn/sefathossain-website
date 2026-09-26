import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Visible breadcrumb trail. Pair with `breadcrumbSchema` (JSON-LD) for the
 * matching structured data. The last item is the current page.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: { name: string; path: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span className="text-sage" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="transition-colors hover:text-mist">
                    {c.name}
                  </Link>
                  <span aria-hidden className="text-line">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
