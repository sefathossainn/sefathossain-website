import type { Metadata } from "next";

import { getPageContent, getBlogPosts, getBlogCategories } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { BlogCard } from "@/components/cms/blog-card";
import { BlogList } from "@/components/cms/blog-list";
import Link from "next/link";
import { BLOG_TOPICS, postsInTopic } from "@/lib/blog-topics";

// Short window so scheduled posts go live close to their set time.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("blog");
  return pageMetadata({ content, path: "/blog" });
}

export default async function BlogPage() {
  const [content, posts, categories] = await Promise.all([
    getPageContent("blog"),
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        kicker={content.text("hero.kicker")}
        title={content.text("hero.h1")}
        intro={content.text("intro.text")}
        kickerStyle={content.style("hero.kicker")}
        titleStyle={content.style("hero.h1")}
        introStyle={content.style("intro.text")}
      />

      {/* Two topics, matching the site's two pillars */}
      <Section className="!pb-0 !pt-10">
        <div className="grid gap-4 md:grid-cols-2">
          {BLOG_TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/blog/topic/${t.slug}`}
              className="group flex items-center justify-between gap-6 rounded-[var(--radius-xl)] border border-line bg-forest/30 p-6 transition-colors hover:border-emerald"
            >
              <span>
                <span className="kicker text-emerald">{postsInTopic(posts, t).length} guides</span>
                <span className="mt-2 block font-display text-xl font-semibold text-mist group-hover:text-emerald">
                  {t.name}
                </span>
                <span className="mt-1 block text-sm text-sage">{t.intro.split(". ")[0]}.</span>
              </span>
              <span aria-hidden className="text-2xl text-emerald transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Keeps the heading outline H1 → H2 → H3 (cards use h3). */}
      <h2 className="sr-only">Articles</h2>

      {featured && (
        <Section className="!pt-10">
          <Reveal>
            <Kicker className="mb-6">Featured</Kicker>
            <BlogCard post={featured} featured priority />
          </Reveal>
        </Section>
      )}

      <Section className="!pt-4">
        <BlogList posts={rest.length ? rest : posts} categories={categories} />
      </Section>
    </>
  );
}
