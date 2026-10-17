import { renderOgImage } from "@/lib/og";
import { getBlogPost } from "@/lib/cms/queries";

// Not an opengraph-image file on purpose: file-based OG overrides metadata,
// which would hide an og_image or real featured image set in /admin. The post
// page points og:image here only when it has no image of its own.
export const revalidate = 3600;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return renderOgImage({
    kicker: post?.category ? `Blog · ${post.category}` : "Blog",
    title: post?.title ?? "WordPress security guides",
  });
}
