import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPosts, getBlogPost } from "@/lib/cms/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { seedAssets } from "@/lib/cms/defaults/media";
import { siteConfig } from "@/lib/site-config";

import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { BlogCard } from "@/components/cms/blog-card";
import { CtaBand } from "@/components/cms/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt ?? "";
  const image = post.seo?.og_image ?? post.featured_image ?? seedAssets.ogDefault;
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: { absolute: `${title} | Sefat Hossain` },
    description,
    alternates: { canonical: post.seo?.canonical || url },
    robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.published_at,
      authors: [post.author],
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const related = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Header */}
      <header className="pt-32 md:pt-40">
        <div className="container-brand">
          <Reveal className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="kicker mb-8 inline-flex items-center gap-2 text-slate transition-colors hover:text-mist"
            >
              <span aria-hidden>←</span> All articles
            </Link>
            <div className="kicker flex flex-wrap items-center gap-3 text-slate">
              {post.category && (
                <span className="text-emerald">{post.category}</span>
              )}
              <span>{formatDate(post.published_at)}</span>
              {post.reading_minutes ? (
                <span>{post.reading_minutes} min read</span>
              ) : null}
            </div>
            <h1 className="mt-5 font-display text-[clamp(2rem,1.3rem+2.8vw,3.4rem)] font-semibold leading-[1.08] tracking-tight text-mist">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-sage">
                {post.excerpt}
              </p>
            )}
          </Reveal>
        </div>
      </header>

      {/* Featured image */}
      {post.featured_image && (
        <div className="container-brand mt-12">
          <Reveal className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-[var(--radius-xl)] border border-line">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 1024px"
              className="object-cover"
            />
          </Reveal>
        </div>
      )}

      {/* Body */}
      <Section className="!pt-14">
        <div className="mx-auto max-w-3xl">
          <RichText html={post.body} />

          <div className="mt-14 flex items-center justify-between border-t border-line/70 pt-8">
            <p className="kicker text-slate">Written by {post.author}</p>
            <Link href="/blog" className="text-sm text-emerald">
              ← Back to blog
            </Link>
          </div>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section surface>
          <Kicker className="mb-8">Keep reading</Kicker>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        title="Worried about your own site?"
        primary={{ label: "Get a free security audit", href: "/security-audit" }}
        secondary={{ label: "Talk to me", href: "/contact" }}
      />
    </article>
  );
}
