import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/cms/types";
import { formatDate, cn } from "@/lib/utils";

export function BlogCard({
  post,
  featured,
  priority,
}: {
  post: BlogPost;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-forest/40",
        "transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-evergreen",
        featured && "md:flex-row",
      )}
    >
      {post.featured_image && (
        <div
          className={cn(
            "relative aspect-[16/9] w-full overflow-hidden",
            featured && "md:aspect-auto md:w-1/2",
          )}
        >
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            priority={priority}
            sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col p-6 md:p-7", featured && "md:justify-center md:p-10")}>
        <div className="kicker flex items-center gap-3 text-slate">
          {post.category && <span className="text-emerald">{post.category}</span>}
          {post.reading_minutes ? <span>{post.reading_minutes} min read</span> : null}
        </div>
        <h3
          className={cn(
            "mt-4 font-display font-semibold text-mist",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-sage">
            {post.excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3 text-xs text-slate">
          <span>{formatDate(post.published_at)}</span>
        </div>
      </div>
    </Link>
  );
}
