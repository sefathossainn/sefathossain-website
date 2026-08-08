import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line/70 pb-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-mist">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-sage">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("panel p-5", className)}>{children}</div>;
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="panel p-5">
      <div className="font-display text-3xl font-semibold text-mist">
        {value}
      </div>
      <div className="kicker mt-2 text-slate">{label}</div>
    </div>
  );
}

export function Pill({
  status,
}: {
  status?: string | null;
}) {
  const s = status ?? "—";
  const tone =
    s === "published"
      ? "text-signal border-signal/40 bg-signal/10"
      : s === "new"
        ? "text-mist border-emerald/40 bg-emerald/10"
        : "text-sage border-line bg-pine/40";
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-wide",
        tone,
      )}
    >
      {s}
    </span>
  );
}

/** Small link styled as a button for admin toolbars. */
export function AdminLinkButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors",
        primary
          ? "bg-signal text-obsidian hover:bg-[#2fb673]"
          : "border border-line text-mist hover:border-evergreen",
      )}
    >
      {children}
    </Link>
  );
}

/** Reusable table shell. */
export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-line/70">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b border-line/70 bg-forest/40 px-4 py-3 text-left kicker font-medium text-slate">
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("border-b border-line/50 px-4 py-3 text-sage", className)}>
      {children}
    </td>
  );
}
