import Link from "next/link";
import type { Service } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/reveal";

/** One Build/Secure/Grow group: label, title, description, ticked item list. */
export function ServiceGroup({
  index,
  service,
  highlight,
}: {
  index: number;
  service: Service;
  /** Grow / care-plan gets the raised, retainer emphasis. */
  highlight?: boolean;
}) {
  return (
    <Reveal
      className={`grid gap-8 border-t border-line/70 py-12 md:grid-cols-[0.9fr_1.1fr] ${
        highlight ? "rounded-[var(--radius-xl)] border border-line bg-forest/40 px-8" : ""
      }`}
    >
      <div>
        <p className="kicker">
          <span className="text-emerald">
            {String(index).padStart(2, "0")}
          </span>{" "}
          / {service.group_name}
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-mist md:text-3xl">
          {service.title}
        </h2>
        {service.description && (
          <p className="mt-4 max-w-md leading-relaxed text-sage">
            {service.description}
          </p>
        )}
      </div>

      <ul className="grid gap-4 self-center">
        {service.items.map((item, i) => (
          <li key={i} className="relative flex gap-3 text-mist/90">
            <span
              aria-hidden
              className="mt-[0.5em] h-[0.55rem] w-[0.55rem] shrink-0 rotate-[-45deg] border-b-[1.5px] border-l-[1.5px] border-emerald"
            />
            {service.group_name === "Secure" && service.title === "Website Security" && i === 0 ? (
          <Link
            href="/services/wordpress-malware-removal"
            className="leading-relaxed transition hover:text-emerald"
          >
            {item}
          </Link>
        ) : (
          <span className="leading-relaxed">{item}</span>
        )}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
