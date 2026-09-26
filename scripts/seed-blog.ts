/**
 * Blog-only seed — upserts ONLY categories and blog_posts.
 *
 * Unlike `scripts/seed.ts`, this never touches site_settings, content_blocks,
 * services, faqs, testimonials, case_studies or media — so it is safe to run
 * against a live, already-configured site (it won't reset your logo, homepage
 * copy, or other CMS content). Use it to publish new blog posts.
 *
 * Reads credentials from the environment (no --env-file), so you can pass them
 * inline:
 *
 *   NEXT_PUBLIC_SUPABASE_URL='https://xxx.supabase.co' \
 *   SUPABASE_SERVICE_ROLE_KEY="$(cat key.txt)" \
 *   npm run seed:blog
 */
import { createClient } from "@supabase/supabase-js";

import { defaultPosts } from "@/lib/cms/defaults/blog";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with them set in the environment, e.g.:\n" +
      "  NEXT_PUBLIC_SUPABASE_URL='https://xxx.supabase.co' \\\n" +
      "  SUPABASE_SERVICE_ROLE_KEY=\"$(cat key.txt)\" \\\n" +
      "  npm run seed:blog",
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

async function main() {
  console.log("Seeding blog posts only (safe — no other content touched) …");

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
  const rows = defaultPosts.map(({ category, ...post }) => ({
    ...post,
    category_id: category ? (catId.get(category) ?? null) : null,
  }));
  const { error } = await sb
    .from("blog_posts")
    .upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(`blog_posts: ${error.message}`);
  console.log(`  ✓ blog_posts: ${rows.length}`);

  console.log("Done. Blog posts are live in Supabase.");
}

main().catch((e) => {
  console.error("\nBlog seed failed:", e.message);
  process.exit(1);
});
