import type { Metadata } from "next";

import { getPageContent, getBlogPosts, getBlogCategories } from "@/lib/cms/queries";
import { pageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Kicker } from "@/components/ui/kicker";
import { BlogCard } from "@/components/cms/blog-card";
import { BlogList } from "@/components/cms/blog-list";

export const revalidate = 3600;

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
