import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageContent } from "@/lib/cms/queries";
import { defaultBlocks } from "@/lib/cms/defaults/blocks";
import type { PageSlug, BlockValue } from "@/lib/cms/types";
import { requireSection } from "@/lib/admin/guard";
import { pageBlocksSeoOnly, isSeoBlockKey } from "@/lib/admin/permissions";
import { absoluteUrl } from "@/lib/utils";
import { AdminHeader } from "@/components/admin/ui";
import { PageBlocksEditor } from "@/components/admin/page-blocks-editor";

export default async function PageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in defaultBlocks)) notFound();

  const { role } = await requireSection("pages");
  const content = await getPageContent(slug as PageSlug);

  // seo_expert only sees/edits SEO + H1 blocks (also enforced server-side).
  const seoOnly = pageBlocksSeoOnly(role!);
  const blocks: Record<string, BlockValue> = seoOnly
    ? Object.fromEntries(
        Object.entries(content.raw).filter(([k]) => isSeoBlockKey(k)),
      )
    : content.raw;

  // Derived from the FULL page (not the filtered view) so keyword/length
  // analysis stays accurate even for the SEO-only editor.
  const pageTitle =
    content.text("hero.headline") ||
    content.text("hero.h1") ||
    content.text("meta.title") ||
    slug;
  const bodyText = Object.entries(content.raw)
    .filter(([k]) => !k.startsWith("meta."))
    .map(([, v]) => `${v.text ?? ""} ${(v.items ?? []).join(" ")}`)
    .join(" ");
  const path = slug === "home" ? "/" : `/${slug}`;

  return (
    <>
      <AdminHeader
        title={`Edit: ${slug}`}
        description={
          seoOnly
            ? "SEO & headline fields for this page."
            : "Changes publish to the live site within a few minutes."
        }
        action={
          <Link href="/admin/pages" className="text-sm text-sage hover:text-mist">
            ← All pages
          </Link>
        }
      />
      <PageBlocksEditor
        slug={slug}
        blocks={blocks}
        title={pageTitle}
        content={bodyText}
        siteUrl={absoluteUrl("")}
        path={path}
      />
    </>
  );
}
