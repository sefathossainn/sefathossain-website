import type { Metadata } from "next";
import type { PageContent } from "@/lib/cms/queries";
import { absoluteUrl } from "@/lib/utils";
import { seedAssets } from "@/lib/cms/defaults/media";

type PageMetaArgs = {
  content: PageContent;
  path: string;
  ogImage?: string | null;
};

/**
 * Build page metadata from CMS `meta.*` blocks. The copy's meta titles already
 * include "| Sefat Hossain", so we use `absolute` to bypass the layout template.
 */
export function pageMetadata({
  content,
  path,
  ogImage,
}: PageMetaArgs): Metadata {
  const title = content.text("meta.title");
  const description = content.text("meta.description");
  const url = absoluteUrl(path);

  // CMS SEO overrides (edited via /admin → Pages → SEO panel).
  const canonicalOverride = content.text("meta.canonical");
  const noindex = content.text("meta.noindex") === "true";
  const metaOg = content.raw["meta.og_image"]?.url;
  const image = metaOg || ogImage || seedAssets.ogDefault;
  const canonical = canonicalOverride || url;

  return {
    title: title ? { absolute: title } : undefined,
    description: description || undefined,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url,
      title: title || undefined,
      description: description || undefined,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: image ? [image] : undefined,
    },
  };
}
