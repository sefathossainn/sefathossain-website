import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getBlogPosts,
  getBlogPost,
  getSiteSettings,
  getCaseStudies,
} from "@/lib/cms/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { seedAssets } from "@/lib/cms/defaults/media";
import { siteConfig } from "@/lib/site-config";
import { withToc } from "@/lib/toc";

import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { ProfilePhoto } from "@/components/brand/profile-photo";
import { BlogCard } from "@/components/cms/blog-card";
import { CtaBand } from "@/components/cms/cta-band";
import { AuthorBio } from "@/components/cms/author-bio";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { QuickAnswerBlock, KeyTakeaways } from "@/components/blog/callouts";
import { PeopleAlsoAsk } from "@/components/blog/people-also-ask";
import { TakeItFurther } from "@/components/blog/take-it-further";
import {
  getKeyTakeaways,
  getBlogFaqs,
  getRelatedService,
  pickRelatedCaseStudy,
} from "@/lib/cms/blog-extras";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

// Short window so a scheduled post's own URL becomes reachable near its time.
export const revalidate = 300;

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
  const [post, all, settings, caseStudies] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
    getSiteSettings(),
    getCaseStudies(),
  ]);
  if (!post) notFound();

  const { html, toc } = withToc(post.body);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const quickAnswer = post.quick_answer || post.excerpt;
  const takeaways = post.key_takeaways?.length
    ? post.key_takeaways
    : getKeyTakeaways(post.slug);
  const faqs = post.faqs?.length ? post.faqs : getBlogFaqs(post.slug);
  const relatedCaseStudy = pickRelatedCaseStudy(caseStudies, post.slug);
  const relatedService = getRelatedService(post.slug);

  const related = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const keepReading = (related.length ? related : all.filter((p) => p.slug !== post.slug)).slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(post.category ? [{ name: post.category, path: "/blog" }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: post.author || siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: url,
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
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}

      {/* Header */}
      <header className="relative overflow-hidden pt-32 md:pt-40">
        <div
          aria-hidden
          className="glow-core pointer-events-none absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 opacity-50"
        />
        <div className="container-brand relative">
          <Reveal className="mx-auto max-w-4xl">
            <Breadcrumbs items={crumbs} className="mb-6" />
            <h1 className="font-display text-[clamp(2.1rem,1.3rem+3vw,3.6rem)] font-semibold leading-[1.06] tracking-tight text-mist">
              {post.title}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate">
              <span>{formatDate(post.published_at)}</span>
              {post.updated_at &&
                post.updated_at.slice(0, 10) !==
                  (post.published_at ?? "").slice(0, 10) && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="text-emerald">
                      Updated {formatDate(post.updated_at)}
                    </span>
                  </>
                )}
              {post.reading_minutes ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.reading_minutes} min read</span>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span className="flex items-center gap-2 text-mist">
                <ProfilePhoto
                  src={settings.profile_photo}
                  className="h-6 w-6"
                  sizes="24px"
                />
                By {post.author}
              </span>
            </div>

            <div className="mt-7">
              <ShareButtons url={url} title={post.title} />
            </div>
          </Reveal>
        </div>
      </header>

      {/* Featured image */}
      {post.featured_image && (
        <div className="container-brand mt-9">
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

      {/* Quick answer — prominent, snippet/AIO-friendly */}
      {quickAnswer && (
        <div className="container-brand mt-9">
          <Reveal className="mx-auto max-w-4xl">
            <QuickAnswerBlock>{quickAnswer}</QuickAnswerBlock>
          </Reveal>
        </div>
      )}

      {/* Body — sticky TOC + article */}
      <Section className="!pt-12">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          {toc.length > 1 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={toc} />
              </div>
            </aside>
          ) : (
            <div className="hidden lg:block" aria-hidden />
          )}

          <div className="min-w-0">
            {takeaways.length > 0 && <KeyTakeaways items={takeaways} />}

            <RichText
              html={html}
              className="mt-10 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28"
            />

            {/* In-content CTA */}
            <div className="mt-14 rounded-[var(--radius-xl)] border border-emerald/30 bg-emerald/[0.06] p-7 md:p-8">
              <p className="kicker text-emerald">Free security check</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-mist">
                Worried your site is infected?
              </h2>
              <p className="mt-3 leading-relaxed text-sage">
                Get a free security assessment — I&apos;ll tell you if your
                WordPress site is compromised and exactly what it needs. No
                obligation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/security-audit"
                  className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3 font-medium text-obsidian transition hover:opacity-90"
                >
                  Get a Free Assessment
                </Link>
                <Link
                  href="/tools/is-my-wordpress-site-hacked"
                  className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 font-medium text-mist transition hover:border-emerald hover:text-emerald"
                >
                  Try the free checker
                </Link>
              </div>
            </div>

            {/* Take it further — related case study + service */}
            <div className="mt-16">
              <TakeItFurther
                caseStudy={relatedCaseStudy}
                service={relatedService}
              />
            </div>

            <AuthorBio name={post.author} />
          </div>
        </div>
      </Section>

      {/* People also ask */}
      {faqs.length > 0 && (
        <Section className="!pt-4">
          <div className="mx-auto max-w-4xl">
            <PeopleAlsoAsk items={faqs} />
          </div>
        </Section>
      )}

      {/* Keep reading */}
      {keepReading.length > 0 && (
        <Section surface>
          <Kicker className="mb-8">Keep reading</Kicker>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keepReading.map((p) => (
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
