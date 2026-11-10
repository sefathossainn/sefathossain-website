import Image from "next/image";
import type { Project } from "@/lib/cms/types";

/**
 * Card for a built website shown with a live demo link (the `projects`
 * table). `type` is shown as the badge, e.g. "Website concept" for the
 * industry demo sites, so a concept is never presented as client work.
 */
export function ConceptCard({ project }: { project: Project }) {
  const image = project.images?.[0];
  const inner = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
        {image && (
          <Image
            src={image}
            alt={`${project.title} homepage`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {project.type && (
          <span className="absolute left-4 top-4 rounded-full border border-line bg-obsidian/75 px-3 py-1 text-xs font-medium text-mist backdrop-blur">
            {project.type}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-mist group-hover:text-emerald">
          {project.title}
        </h3>
        {project.summary && (
          <p className="mt-2 text-sm leading-relaxed text-sage">{project.summary}</p>
        )}
        {project.stack && project.stack.length > 0 && (
          <p className="mt-3 text-xs text-slate">{project.stack.join(" · ")}</p>
        )}
        {project.live_url && (
          <span className="mt-auto pt-4 text-sm font-medium text-emerald">
            View live demo <span aria-hidden>↗</span>
          </span>
        )}
      </div>
    </>
  );
  const cls =
    "group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-forest/30 transition-colors hover:border-evergreen";
  return project.live_url ? (
    <a href={project.live_url} target="_blank" rel="noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
