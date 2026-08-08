import { cn } from "@/lib/utils";

/**
 * Renders CMS rich text (HTML) in brand prose styles. Content originates from
 * the TipTap editor / seeded defaults — trusted, admin-authored HTML.
 */
export function RichText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn("prose-brand", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
