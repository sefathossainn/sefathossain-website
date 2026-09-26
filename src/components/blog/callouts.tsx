import type { ReactNode } from "react";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden fill="none">
      <path
        d="m5 12.5 4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Prominent, snippet/AIO-friendly direct answer at the top of an article. */
export function QuickAnswerBlock({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-emerald/30 bg-emerald/[0.05] p-6 md:p-9">
      <div className="flex flex-col gap-5 sm:flex-row">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald/40 bg-emerald/10 text-emerald">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="kicker text-emerald">Quick answer</p>
          <p className="mt-3 text-lg leading-relaxed text-mist/90 md:text-xl md:leading-relaxed">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Skimmable checklist of the article's main points. */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-[var(--radius-xl)] border border-line bg-forest/30 p-6 md:p-8">
      <p className="kicker text-emerald">Key takeaways</p>
      <ul className="mt-5 grid gap-4">
        {items.map((t) => (
          <li key={t} className="flex gap-3 leading-relaxed text-mist/90">
            <span className="mt-0.5 shrink-0 text-emerald">
              <Check />
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
