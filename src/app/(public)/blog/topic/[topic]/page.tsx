import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPosts } from "@/lib/cms/queries";
import { BLOG_TOPICS, getBlogTopic, postsInTopic } from "@/lib/blog-topics";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/cms/blog-card";

// Same window as /blog, so scheduled posts appear here when they go live.
export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = getBlogTopic(topic);
  if (!t) return {};
  const path = `/blog/topic/${t.slug}`;
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: absoluteUrl(path), title: t.title, description: t.description },
  };
}

export default async function BlogTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = getBlogTopic(topic);
  if (!t) notFound();

  const posts = postsInTopic(await getBlogPosts(), t);
  const path = `/blog/topic/${t.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: t.name, path },
  ];
  const other = BLOG_TOPICS.find((o) => o.slug !== t.slug)!;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t.title,
            description: t.description,
            url: absoluteUrl(path),
          },
        ]}
      />
      <section className="border-b border-line bg-obsidian px-6 pb-14 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <p className="kicker text-emerald">BLOG · {t.name.toUpperCase()}</p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight text-mist md:text-5xl">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-sage">{t.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-emerald bg-emerald/10 px-4 py-1.5 text-mist">{t.name}</span>
            <Link href={`/blog/topic/${other.slug}`} className="rounded-full border border-line px-4 py-1.5 text-sage transition hover:border-emerald hover:text-mist">
              {other.name}
            </Link>
            <Link href="/blog" className="rounded-full border border-line px-4 py-1.5 text-sage transition hover:border-emerald hover:text-mist">
              All articles
            </Link>
          </div>
        </div>
      </section>

      <Section className="!pt-10">
        <h2 className="sr-only">{t.name} articles</h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="text-sage">New {t.name.toLowerCase()} guides are on the way.</p>
        )}
        <p className="mt-12 text-sm text-slate">
          Need hands-on help? See{" "}
          <Link href={t.service.href} className="text-emerald hover:underline">{t.service.label}</Link>.
        </p>
      </Section>
    </>
  );
}
