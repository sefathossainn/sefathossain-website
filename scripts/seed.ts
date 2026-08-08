/**
 * Seed the Supabase database from the code defaults (single source of truth).
 * Run AFTER applying supabase/migrations/0001_init.sql.
 *
 *   npm run seed
 *
 * Uses the service-role key (server-only). Idempotent: content_blocks, media,
 * case_studies and blog_posts upsert on their natural keys; services/faqs/
 * testimonials insert only when their table is empty.
 */
import { createClient } from "@supabase/supabase-js";

import { defaultBlocks } from "@/lib/cms/defaults/blocks";
import { seedMediaRows } from "@/lib/cms/defaults/media";
import { defaultServices } from "@/lib/cms/defaults/services";
import { defaultFaqs } from "@/lib/cms/defaults/faqs";
import { seedTestimonials } from "@/lib/cms/defaults/testimonials";
import { defaultCaseStudies } from "@/lib/cms/defaults/case-studies";
import { defaultPosts } from "@/lib/cms/defaults/blog";
import { defaultSiteSettings } from "@/lib/cms/defaults/site-settings";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Run with:  node --env-file=.env.local ... (npm run seed does this).",
  );
  process.exit(1);
}

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function insertIfEmpty(table: string, rows: unknown[]) {
  const { count } = await sb
    .from(table)
    .select("id", { count: "exact", head: true });
  if ((count ?? 0) > 0) {
    console.log(`  · ${table}: already has ${count} rows — skipped`);
    return;
  }
  const { error } = await sb.from(table).insert(rows as never);
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`  ✓ ${table}: inserted ${rows.length}`);
}

async function main() {
  console.log("Seeding sefathossain.com …");

  // Site settings (singleton)
  {
    const { error } = await sb
      .from("site_settings")
      .upsert({ id: 1, ...defaultSiteSettings }, { onConflict: "id" });
    if (error) throw new Error(`site_settings: ${error.message}`);
    console.log("  ✓ site_settings");
  }

  // Content blocks
  {
    const rows = Object.entries(defaultBlocks).flatMap(([page_slug, blocks]) =>
      Object.entries(blocks).map(([block_key, value]) => ({
        page_slug,
        block_key,
        value,
      })),
    );
    const { error } = await sb
      .from("content_blocks")
      .upsert(rows, { onConflict: "page_slug,block_key" });
    if (error) throw new Error(`content_blocks: ${error.message}`);
    console.log(`  ✓ content_blocks: ${rows.length}`);
  }

  // Media library
  await insertIfEmpty("media", seedMediaRows);

  // Services / FAQs / Testimonials (no natural unique key)
  await insertIfEmpty("services", defaultServices);
  await insertIfEmpty("faqs", defaultFaqs);
  await insertIfEmpty("testimonials", seedTestimonials);

  // Categories (from blog defaults) → id map
  const categoryNames = Array.from(
    new Set(defaultPosts.map((p) => p.category).filter(Boolean) as string[]),
  );
  const catId = new Map<string, string>();
  for (const name of categoryNames) {
    const slug = slugify(name);
    const { data, error } = await sb
      .from("categories")
      .upsert({ name, slug }, { onConflict: "slug" })
      .select("id")
      .single();
    if (error) throw new Error(`categories: ${error.message}`);
    catId.set(name, data.id);
  }
  console.log(`  ✓ categories: ${categoryNames.length}`);

  // Blog posts (map category → category_id; drop the transient `category`)
  {
    const rows = defaultPosts.map(({ category, ...post }) => ({
      ...post,
      category_id: category ? (catId.get(category) ?? null) : null,
    }));
    const { error } = await sb
      .from("blog_posts")
      .upsert(rows, { onConflict: "slug" });
    if (error) throw new Error(`blog_posts: ${error.message}`);
    console.log(`  ✓ blog_posts: ${rows.length}`);
  }

  // Case studies
  {
    const { error } = await sb
      .from("case_studies")
      .upsert(defaultCaseStudies, { onConflict: "slug" });
    if (error) throw new Error(`case_studies: ${error.message}`);
    console.log(`  ✓ case_studies: ${defaultCaseStudies.length}`);
  }

  console.log("Done. Content is live in Supabase — editable from /admin.");
}

main().catch((e) => {
  console.error("\nSeed failed:", e.message);
  console.error(
    "Have you applied supabase/migrations/0001_init.sql to the project yet?",
  );
  process.exit(1);
});
