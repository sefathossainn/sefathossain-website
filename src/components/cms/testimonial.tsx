import type { Testimonial } from "@/lib/cms/types";
import { cn } from "@/lib/utils";
import { ProfilePhoto } from "@/components/brand/profile-photo";

/** Two-letter initials from a name, for the avatar fallback. */
function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** A single quote — used for real testimonials and the signature fallback. */
export function TestimonialQuote({
  quote,
  author,
  role,
  company,
  avatar,
  className,
}: {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string | null;
  className?: string;
}) {
  return (
    <figure className={cn("panel relative p-8 md:p-10", className)}>
      <span
        aria-hidden
        className="absolute right-7 top-4 font-display text-6xl leading-none text-evergreen/70 select-none"
      >
        &rdquo;
      </span>
      <blockquote className="relative text-lg leading-relaxed text-mist md:text-xl">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <ProfilePhoto
          src={avatar}
          alt={`${author} — photo`}
          initials={initialsOf(author)}
          className="h-11 w-11 shrink-0"
          sizes="44px"
        />
        <div className="flex flex-col">
          <span className="font-display text-sm font-semibold text-mist">
            {author}
          </span>
          {(role || company) && (
            <span className="kicker text-slate">
              {[role, company].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {testimonials.map((t, i) => (
        <TestimonialQuote
          key={t.id ?? i}
          quote={t.quote}
          author={t.author}
          role={t.role}
          company={t.company}
          avatar={t.avatar}
        />
      ))}
    </div>
  );
}
