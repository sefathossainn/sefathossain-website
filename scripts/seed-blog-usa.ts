/**
 * USA batch seed — stages the 30-post content batch for DAILY drip publishing.
 *
 * Like scripts/seed-blog.ts, this only touches `categories` and `blog_posts`
 * (never site_settings, media, etc.), so it's safe on a live site. It assigns
 * each post a scheduled `published_at`, one per day, starting from START_DATE.
 *
 * Because the site publishes on a time gate (a post with a FUTURE published_at
 * stays hidden until its time), this means one post goes live automatically
 * each day. Add each post's featured image in /admin before its day.
 *
 * Requires DB columns quick_answer, key_takeaways, faqs (run migrations
 * 0007_blog_cms_fields.sql and 0008_blog_faqs.sql first).
 *
 * Usage (env inline, no --env-file):
 *
 *   NEXT_PUBLIC_SUPABASE_URL='https://xxx.supabase.co' \
 *   SUPABASE_SERVICE_ROLE_KEY="$(cat key.txt)" \
 *   START_DATE=2026-10-01 \        # optional; default = tomorrow
 *   PUBLISH_HOUR_UTC=14 \          # optional; default = 14:00 UTC (~9–10am US ET)
 *   npm run seed:blog-usa
 */
import { createClient } from "@supabase/supabase-js";

import { usaBlogBatch } from "@/lib/cms/content/blog-usa-batch";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with them set in the environment, e.g.:\n" +
      "  NEXT_PUBLIC_SUPABASE_URL='https://xxx.supabase.co' \\\n" +
      '  SUPABASE_SERVICE_ROLE_KEY="$(cat key.txt)" \\\n' +
      "  npm run seed:blog-usa",
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

/** Publish hour (UTC). 14:00 UTC ≈ 9–10am US Eastern. */
const publishHour = Number(process.env.PUBLISH_HOUR_UTC ?? "14");

/** Base date: START_DATE (YYYY-MM-DD) or tomorrow, at publishHour UTC. */
function baseDate(): Date {
  const raw = process.env.START_DATE;
  const d = raw ? new Date(`${raw}T00:00:00.000Z`) : new Date();
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid START_DATE "${raw}" (use YYYY-MM-DD).`);
  }
  if (!raw) d.setUTCDate(d.getUTCDate() + 1); // default: start tomorrow
  d.setUTCHours(publishHour, 0, 0, 0);
  return d;
}

function scheduledAt(base: Date, dayOffset: number): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + dayOffset);
  return d.toISOString();
}

async function main() {
  const base = baseDate();
  console.log(
    `Staging ${usaBlogBatch.length} USA posts — one per day from ${base
      .toISOString()
      .slice(0, 10)} at ${String(publishHour).padStart(2, "0")}:00 UTC …`,
  );

  // Categories → id map
  const categoryNames = Array.from(
    new Set(usaBlogBatch.map((p) => p.category).filter(Boolean) as string[]),
  );
  const catId = new Map<string, string>();
  for (const name of categoryNames) {
    const { data, error } = await sb
      .from("categories")
      .upsert({ name, slug: slugify(name) }, { onConflict: "slug" })
      .select("id")
      .single();
    if (error) throw new Error(`categories: ${error.message}`);
    catId.set(name, data.id);
  }
  console.log(`  ✓ categories: ${categoryNames.length}`);

  // Posts: map category → category_id, assign a daily published_at.
  const rows = usaBlogBatch.map(({ category, ...post }, i) => ({
    ...post,
    category_id: category ? (catId.get(category) ?? null) : null,
    published_at: scheduledAt(base, i),
  }));

  const { error } = await sb
    .from("blog_posts")
    .upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(`blog_posts: ${error.message}`);
  console.log(`  ✓ blog_posts: ${rows.length}`);

  const first = rows[0].published_at.slice(0, 10);
  const last = rows[rows.length - 1].published_at.slice(0, 10);
  console.log(
    `Done. First goes live ${first}, last ${last} — one per day. ` +
      "Add each post's featured image in /admin before its publish day.",
  );
}

main().catch((e) => {
  console.error("\nUSA blog seed failed:", e.message);
  process.exit(1);
});
