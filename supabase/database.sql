-- =============================================================
-- sefathossain.com — FULL DATABASE (schema + content)
-- Run this once on a fresh Supabase project (SQL Editor).
-- Schema = migrations 0001-0004; then the CMS content.
-- =============================================================


-- ==================== 0001_init.sql ====================
-- ============================================================================
-- sefathossain.com — schema, RLS, storage
-- Apply via: Supabase SQL Editor (paste), or `supabase db push`.
-- Idempotent where practical. RLS is ON for every table (defense in depth,
-- even though the service-role key bypasses it).
-- ============================================================================

create extension if not exists pgcrypto;

-- ── updated_at trigger helper ──────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Reference tables first (case_studies FK → testimonials; blog FK → categories)
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text,
  author text,
  role text,
  company text,
  avatar text,
  rating int,
  source text,                                   -- 'upwork' | 'fiverr' | 'direct'
  featured bool default false,
  sort_order int default 0,
  status text default 'published',
  created_at timestamptz default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text,
  slug text unique
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text,
  slug text unique
);

-- Editable per-page content (any headline/paragraph/image on any page)
create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,                       -- 'home','about','services',...
  block_key text not null,                       -- 'hero.headline','hero.image'...
  value jsonb not null,                          -- { text } | { url, alt } | { items:[] }
  updated_at timestamptz default now(),
  unique (page_slug, block_key)
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  tagline text,
  situation text,                                -- rich text / html
  approach text,
  outcome text,
  metrics jsonb,                                 -- [{label,value}] (may be empty)
  hero_image text,
  gallery jsonb,
  testimonial_id uuid references public.testimonials(id) on delete set null,
  category text,                                 -- 'security' | 'build' | 'performance'
  featured bool default false,
  status text default 'draft',                   -- 'draft' | 'published'
  sort_order int default 0,
  seo jsonb,                                      -- {title,description,og_image}
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text,
  summary text,
  live_url text,
  images jsonb,
  stack jsonb,
  type text,
  featured bool default false,
  status text default 'draft',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  excerpt text,
  body text,                                     -- rich text / html
  featured_image text,
  author text default 'Sefat Hossain',
  category_id uuid references public.categories(id) on delete set null,
  tags jsonb,
  status text default 'draft',                   -- 'draft' | 'published'
  published_at timestamptz,
  seo jsonb,                                     -- {title,description,og_image}
  reading_minutes int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  group_name text,                               -- 'Build' | 'Secure' | 'Grow'
  title text,
  description text,
  items jsonb,
  sort_order int default 0,
  status text default 'published'
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text,
  answer text,
  sort_order int default 0,
  status text default 'published'
);

-- Lead capture (no anon read; inserts via server route / service role)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  need text,
  message text,
  source_page text,
  created_at timestamptz default now()
);

create table if not exists public.audit_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  website_url text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  created_at timestamptz default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  alt text,
  type text,
  width int,
  height int,
  bucket text default 'media',
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  id int primary key default 1,
  logo_url text,
  profile_photo text,                              -- Sefat's portrait (trust signal)
  nav jsonb,
  footer jsonb,
  social jsonb,
  seo_defaults jsonb,
  calendar_url text,
  constraint site_settings_singleton check (id = 1)
);
-- idempotent: add the column if the table already existed from an earlier apply
alter table public.site_settings
  add column if not exists profile_photo text;

-- ── Indexes ────────────────────────────────────────────────────────────────
create index if not exists idx_content_blocks_page on public.content_blocks(page_slug);
create index if not exists idx_case_studies_status on public.case_studies(status, sort_order);
create index if not exists idx_projects_status on public.projects(status, sort_order);
create index if not exists idx_blog_status_pub on public.blog_posts(status, published_at desc);
create index if not exists idx_services_group on public.services(status, sort_order);
create index if not exists idx_faqs_status on public.faqs(status, sort_order);
create index if not exists idx_testimonials_status on public.testimonials(status, sort_order);

-- ── updated_at triggers ────────────────────────────────────────────────────
drop trigger if exists trg_content_blocks_updated on public.content_blocks;
create trigger trg_content_blocks_updated before update on public.content_blocks
  for each row execute function public.set_updated_at();

drop trigger if exists trg_blog_posts_updated on public.blog_posts;
create trigger trg_blog_posts_updated before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table public.content_blocks  enable row level security;
alter table public.case_studies    enable row level security;
alter table public.projects        enable row level security;
alter table public.testimonials    enable row level security;
alter table public.blog_posts      enable row level security;
alter table public.categories      enable row level security;
alter table public.tags            enable row level security;
alter table public.services        enable row level security;
alter table public.faqs            enable row level security;
alter table public.media           enable row level security;
alter table public.site_settings   enable row level security;
alter table public.leads           enable row level security;
alter table public.audit_requests  enable row level security;
alter table public.subscribers     enable row level security;

-- ── Public (anon) SELECT: published-only where a status column exists ───────
drop policy if exists "anon read published case_studies" on public.case_studies;
create policy "anon read published case_studies" on public.case_studies
  for select to anon using (status = 'published');

drop policy if exists "anon read published projects" on public.projects;
create policy "anon read published projects" on public.projects
  for select to anon using (status = 'published');

drop policy if exists "anon read published testimonials" on public.testimonials;
create policy "anon read published testimonials" on public.testimonials
  for select to anon using (status = 'published');

drop policy if exists "anon read published blog_posts" on public.blog_posts;
create policy "anon read published blog_posts" on public.blog_posts
  for select to anon using (status = 'published');

drop policy if exists "anon read published services" on public.services;
create policy "anon read published services" on public.services
  for select to anon using (status = 'published');

drop policy if exists "anon read published faqs" on public.faqs;
create policy "anon read published faqs" on public.faqs
  for select to anon using (status = 'published');

-- ── Public (anon) SELECT: no status column → readable (they are content/config)
drop policy if exists "anon read content_blocks" on public.content_blocks;
create policy "anon read content_blocks" on public.content_blocks
  for select to anon using (true);

drop policy if exists "anon read media" on public.media;
create policy "anon read media" on public.media
  for select to anon using (true);

drop policy if exists "anon read site_settings" on public.site_settings;
create policy "anon read site_settings" on public.site_settings
  for select to anon using (true);

drop policy if exists "anon read categories" on public.categories;
create policy "anon read categories" on public.categories
  for select to anon using (true);

drop policy if exists "anon read tags" on public.tags;
create policy "anon read tags" on public.tags
  for select to anon using (true);

-- ── leads / audit_requests / subscribers: NO anon policy at all ────────────
--    RLS on + no policy = anon fully denied (no read, no write). Inserts happen
--    exclusively through the server route using the service-role key, which
--    bypasses RLS. This is the point: PII is never exposed to the browser.

-- ── Authenticated admin: full access to everything (single admin user) ──────
--    Reads drafts, manages content, views leads. Service role also bypasses.
do $$
declare t text;
begin
  foreach t in array array[
    'content_blocks','case_studies','projects','testimonials','blog_posts',
    'categories','tags','services','faqs','media','site_settings',
    'leads','audit_requests','subscribers'
  ] loop
    execute format('drop policy if exists "admin all %1$s" on public.%1$I;', t);
    execute format(
      'create policy "admin all %1$s" on public.%1$I for all to authenticated using (true) with check (true);',
      t
    );
  end loop;
end $$;

-- ============================================================================
-- STORAGE — one public bucket `media`
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');


-- ==================== 0002_admin_users.sql ====================
-- ============================================================================
-- Admin identity + role. Uses Supabase Auth for credentials; this table only
-- records role/username, keyed by the Auth user id. Apply after 0001_init.sql.
-- The single super-admin row is created by scripts/seed-admin.ts (service role).
-- ============================================================================

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text,
  role text not null default 'super_admin',
  created_at timestamptz default now()
);

alter table public.admin_users enable row level security;

-- A signed-in user may read ONLY their own row (to verify their role in the
-- app). Non-recursive on purpose — no policy references admin_users itself.
drop policy if exists "admin read own row" on public.admin_users;
create policy "admin read own row" on public.admin_users
  for select to authenticated using (auth.uid() = id);

-- No anon access, and no authenticated writes: creating/updating admins happens
-- only through the service role (the seed script), never from the browser.


-- ==================== 0003_rbac.sql ====================
-- ============================================================================
-- RBAC: roles for admin_users + a lightweight activity log.
-- Roles: super_admin | admin | seo_expert | editor. Fine-grained permission
-- checks live in the application layer (src/lib/admin/permissions.ts); this
-- constrains the role/status values and records who created each account.
-- ============================================================================

alter table public.admin_users
  add column if not exists created_by uuid references public.admin_users(id) on delete set null,
  add column if not exists status text not null default 'active';

alter table public.admin_users drop constraint if exists admin_users_role_check;
alter table public.admin_users add constraint admin_users_role_check
  check (role in ('super_admin', 'admin', 'seo_expert', 'editor'));

alter table public.admin_users drop constraint if exists admin_users_status_check;
alter table public.admin_users add constraint admin_users_status_check
  check (status in ('active', 'disabled'));

-- ── Activity log ────────────────────────────────────────────────────────────
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.admin_users(id) on delete set null,
  actor_email text,
  action text not null,           -- e.g. 'user.invite', 'content.publish'
  target_table text,
  target_id text,
  detail text,
  created_at timestamptz default now()
);
create index if not exists idx_activity_log_created on public.activity_log(created_at desc);

alter table public.activity_log enable row level security;

-- Any signed-in admin may log their own actions; only super_admin can read.
drop policy if exists "admin insert own activity" on public.activity_log;
create policy "admin insert own activity" on public.activity_log
  for insert to authenticated with check (actor_id = auth.uid());

drop policy if exists "super admin read activity" on public.activity_log;
create policy "super admin read activity" on public.activity_log
  for select to authenticated using (
    exists (
      select 1 from public.admin_users a
      where a.id = auth.uid() and a.role = 'super_admin'
    )
  );


-- ==================== 0004_cms_extras.sql ====================
-- ─────────────────────────────────────────────────────────────────────────────
-- 0004 · CMS extras (added after 0003)
-- Navbar name/title, favicon, global theme, and the contact-form recipient.
-- Idempotent so it is safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.site_settings
  add column if not exists brand_name  text,  -- navbar logo name
  add column if not exists brand_title text,  -- navbar logo tagline
  add column if not exists favicon_url text,  -- browser-tab icon (falls back to profile photo)
  add column if not exists theme       jsonb, -- global colors + type-scale overrides
  add column if not exists lead_email  text;  -- where contact/audit submissions are emailed


-- ==================== content data ====================
-- =============================================================
-- sefathossain.com — CMS content data export
-- Run AFTER the schema migrations (0001-0004) on a fresh database.
-- Excludes runtime/auth data (leads, audit_requests, admin_users, activity_log).
-- =============================================================

begin;

delete from public.blog_posts;
delete from public.media;
delete from public.content_blocks;
delete from public.faqs;
delete from public.services;
delete from public.projects;
delete from public.case_studies;
delete from public.testimonials;
delete from public.tags;
delete from public.categories;
delete from public.site_settings;

-- site_settings (1 rows)
insert into public.site_settings ("id", "logo_url", "profile_photo", "nav", "footer", "social", "seo_defaults", "calendar_url", "brand_name", "brand_title", "favicon_url", "theme", "lead_email") values (1, 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1784193426662-chatgpt-image-jul-16-2026-03-16-42-pm.png', '/images/sefat-photo.png', '[{"href":"/work","label":"Work"},{"href":"/services","label":"Services"},{"href":"/about","label":"About"},{"href":"/blog","label":"Blog"},{"href":"/contact","label":"Contact"}]'::jsonb, '{"credit":{"href":"https://mohammademmon.com","label":"Site by Mohammad Emmon"}}'::jsonb, '{"GitHub":"https://github.com/sefathossainn","Upwork":"https://www.upwork.com/freelancers/sefathossain","LinkedIn":"https://www.linkedin.com/in/sefathossainn/"}'::jsonb, '{"title":"Sefat Hossain | WordPress Security Expert","description":"I build secure, high-performance WordPress, Elementor, and Shopify websites that stay fast, protected, and ready to grow long after launch."}'::jsonb, NULL, 'Sefat Hossain', 'WordPress Security Expert', 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1784193426662-chatgpt-image-jul-16-2026-03-16-42-pm.png', NULL, 'sefathossainn@gmail.com');

-- categories (2 rows)
insert into public.categories ("id", "name", "slug") values ('11aa4655-44f9-4cb5-aae8-7399e128f750', 'Security', 'security');
insert into public.categories ("id", "name", "slug") values ('c6174360-ec58-43c6-be26-c3694bb1183d', 'Performance', 'performance');

-- tags: (no rows)

-- testimonials (2 rows)
insert into public.testimonials ("id", "quote", "author", "role", "company", "avatar", "rating", "source", "featured", "sort_order", "status", "created_at") values ('23ec7e86-cd19-4e5e-8ad8-23e1561d5c91', 'HostGator took all my sites down, and I needed someone immediately to remove the malware and get everything back online. Sefat responded quickly, fixed everything right the first time, and got my business back up fast. Highly recommended!', 'Verified Upwork Client', 'Business Owner', 'Private Company', NULL, 5, 'upwork', true, 1, 'published', '2026-07-08T22:50:26.363193+00:00');
insert into public.testimonials ("id", "quote", "author", "role", "company", "avatar", "rating", "source", "featured", "sort_order", "status", "created_at") values ('450f302f-03f3-4ef4-994c-c66dd96ca91f', 'Sample review — replace with a real client quote in the CMS. Kept calm through a stressful hack and explained every step in plain language.', 'Demo Client', 'Business owner', NULL, NULL, NULL, 'direct', true, 1, 'draft', '2026-07-08T22:50:26.363193+00:00');

-- case_studies (5 rows)
insert into public.case_studies ("id", "slug", "title", "tagline", "situation", "approach", "outcome", "metrics", "hero_image", "gallery", "testimonial_id", "category", "featured", "status", "sort_order", "seo", "created_at") values ('99d09e9a-71ba-4181-8abd-7fa32d647156', 'malware-recovery', 'Bringing a hacked business website back from the brink', 'Complete WordPress malware removal & website recovery', '<p>A business owner reached out in the worst possible state: their WordPress website — the front door to their business — had been compromised. Customers couldn''t trust what they were seeing, and every hour the site stayed compromised was doing quiet damage to a reputation that took years to build.</p><p>By the time most owners find me, they''ve already tried the obvious things and made it worse. They''re not looking for someone to panic with them. They''re looking for someone calm who has seen this before.</p>', '<p>Recovering a hacked site is methodical work, not guesswork. Rushing it is how you miss the backdoor that lets the attacker walk straight back in a week later. My process:</p><ul><li>Isolated the site and took a full forensic snapshot before touching anything, so nothing was lost and the damage could be understood.</li><li>Ran a complete malware scan across core files, themes, plugins, and the database to map every piece of malicious code — not just the obvious symptom.</li><li>Identified the entry point — the outdated plugin, weak credential, or vulnerability the attacker actually used — because cleaning without finding the door is temporary.</li><li>Removed all malware, injected code, and hidden backdoors, then replaced compromised core files with clean versions.</li><li>Submitted the site for review to lift any Google blacklist or “deceptive site” warning and restore its standing in search.</li><li>Hardened the essentials before handing it back, so recovery didn''t just return the site to the same vulnerable state it started in.</li></ul>', '<p>The site was returned clean, delisted, and back online — but more importantly, the owner got their peace of mind back. That''s the part that matters. A website isn''t just files; for the person who owns it, it''s their livelihood.</p>', '[]'::jsonb, 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163020_1737c12c-156f-45ff-bbb2-98bdd9dad2c5.png', NULL, NULL, 'security', true, 'published', 1, NULL, '2026-07-08T22:50:26.724219+00:00');
insert into public.case_studies ("id", "slug", "title", "tagline", "situation", "approach", "outcome", "metrics", "hero_image", "gallery", "testimonial_id", "category", "featured", "status", "sort_order", "seo", "created_at") values ('d05e9f19-00bd-4918-bda9-00cf32460a8e', 'security-hardening', 'Turning an exposed business site into a locked front door', 'WordPress security hardening for business websites', '<p>A business came to me with a site that looked fine — it loaded, it worked, it made sales. What they didn''t see was how exposed it was underneath. Nothing had gone wrong yet. That''s exactly the moment most people ignore security — and exactly the moment it''s cheapest to fix.</p><p>My belief drives this kind of work: launching a website is the beginning, not the finish line. A site that isn''t protected isn''t finished — it''s just waiting.</p>', '<p>I don''t bolt on a security plugin and call it done. Hardening is a layered process, each layer closing a door an attacker would otherwise use:</p><ul><li>Audited the full attack surface — logins, user roles, plugins, themes, file permissions, and server configuration — to find what was actually exploitable.</li><li>Locked down access with strong authentication, brute-force protection, and limited login attempts, since credentials are the most common way in.</li><li>Installed and configured a proper firewall / web application firewall to filter malicious traffic before it reaches the site.</li><li>Brought the whole stack current — core, themes, and plugins — and removed the unused, abandoned ones that quietly become vulnerabilities.</li><li>Set up automated backups and scheduled malware scanning, so if anything ever does happen, recovery is a button, not a crisis.</li><li>Documented what was done in plain language, so the owner understands their own site instead of depending on blind trust.</li></ul>', '<p>The site went from silently exposed to actively protected and monitored — firewalled, backed up, updated, and watched. The owner stopped worrying about the thing they didn''t previously know to worry about.</p><p>This is the work that never makes the news, because when it''s done right, nothing happens. That''s the whole point.</p>', '[]'::jsonb, 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163028_10f89cbf-51e2-486d-a860-f9b1033f66d5.png', NULL, NULL, 'security', true, 'published', 2, NULL, '2026-07-08T22:50:26.724219+00:00');
insert into public.case_studies ("id", "slug", "title", "tagline", "situation", "approach", "outcome", "metrics", "hero_image", "gallery", "testimonial_id", "category", "featured", "status", "sort_order", "seo", "created_at") values ('b90e10e2-1d8c-43f4-9b2d-1b03cd24a688', 'elementor-business-website', 'A premium business website that earns its first impression', 'Premium Elementor business website development', '<p>A business needed a website that matched the quality of what they actually offer. What they had — or what they''d been quoted elsewhere — was the usual: a generic template that looks like a thousand others and quietly tells visitors “this is a small operation.” For a business trying to win serious clients, that first impression is a cost.</p>', '<ul><li>Started with the business goal, not the design — who the site needs to convince, and what action it needs to drive.</li><li>Designed and built in Elementor for a clean, premium, fully custom look — no cookie-cutter template, structured so the client can actually update it themselves later.</li><li>Built performance in from the start: optimized assets, clean structure, and fast load times, rather than treating speed as an afterthought.</li><li>Made it genuinely responsive across phone, tablet, and desktop — designed mobile-first, since that''s where most visitors actually arrive.</li><li>Laid an SEO-ready foundation — proper structure, headings, and metadata — so the site could be found, not just admired.</li><li>Handed over with a walkthrough, so the client owns their site instead of being locked into needing a developer for every small change.</li></ul>', '<p>The result was a website the business could stand behind — premium, fast, easy to manage, and built to grow with them.</p>', '[]'::jsonb, NULL, NULL, NULL, 'build', true, 'published', 3, NULL, '2026-07-08T22:50:26.724219+00:00');
insert into public.case_studies ("id", "slug", "title", "tagline", "situation", "approach", "outcome", "metrics", "hero_image", "gallery", "testimonial_id", "category", "featured", "status", "sort_order", "seo", "created_at") values ('52ba6893-f85c-4194-80e5-0a582b2cb3d2', 'shopify-store', 'A Shopify store built to sell, not just to exist', 'Shopify store design & customization', '<p>An online store owner needed more than a default Shopify theme switched on. They needed a store that reflected their brand, made products easy to find, and gave shoppers a clear, trustworthy path to checkout — the difference between a store that gets visitors and one that gets orders.</p>', '<ul><li>Set up and customized the Shopify theme to match the brand, rather than leaving it looking like every other store on the same template.</li><li>Structured products, collections, and navigation so customers find what they want in as few steps as possible.</li><li>Designed the storefront and product pages around conversion — clear imagery, obvious calls to action, and a checkout flow with no friction.</li><li>Configured the essentials properly: payments, shipping rules, and the right apps for the store''s actual needs, without bloating it with plugins it doesn''t use.</li><li>Optimized for speed and mobile, because a slow store on a phone is a lost sale.</li><li>Handed over a store the owner can run day to day — adding products and managing orders without needing a developer on call.</li></ul>', '<p>The owner launched with a store that looked professional, worked smoothly, and was theirs to manage.</p>', '[]'::jsonb, NULL, NULL, NULL, 'build', false, 'published', 4, NULL, '2026-07-08T22:50:26.724219+00:00');
insert into public.case_studies ("id", "slug", "title", "tagline", "situation", "approach", "outcome", "metrics", "hero_image", "gallery", "testimonial_id", "category", "featured", "status", "sort_order", "seo", "created_at") values ('cc14ced9-2e5a-47b7-9170-9d2bc3efd2a9', 'performance-optimization', 'Making a slow website fast enough to keep its visitors', 'Website performance optimization', '<p>A website was quietly losing people before they ever saw it. Speed isn''t a vanity metric. A slow site frustrates visitors, gets ranked lower by Google, and turns paid traffic into wasted spend. The owner could feel the problem even before they could measure it.</p>', '<ul><li>Ran a full performance audit against Core Web Vitals to find what was actually slowing things down, instead of guessing.</li><li>Compressed and correctly sized images — usually the single biggest cause of a heavy page — and enabled modern formats and lazy loading.</li><li>Set up proper caching and minified the CSS and JavaScript, so browsers do less work on every visit.</li><li>Cleaned up the database and removed the plugin bloat that accumulates on most sites over time.</li><li>Added a CDN where it made sense, so the site loads quickly regardless of where the visitor is.</li><li>Re-tested and tuned until the numbers held up on both desktop and mobile — not just on the developer''s fast connection.</li></ul>', '<p>The site went from sluggish to genuinely fast — better for visitors, better for search ranking, and better for every marketing dollar pointed at it.</p>', '[]'::jsonb, NULL, NULL, NULL, 'performance', true, 'published', 5, NULL, '2026-07-08T22:50:26.724219+00:00');

-- projects: (no rows)

-- services (3 rows)
insert into public.services ("id", "group_name", "title", "description", "items", "sort_order", "status") values ('816cd3e3-286c-4ce0-9b66-02f84bf050fb', 'Build', 'Website Design & Development', 'Premium, high-performance sites designed to convert — not just to exist.', '["Premium business websites with Elementor — custom, fast, and built to convert.","Shopify store design and customization — stores built to sell, not just exist.","Performance optimization — faster load times, better Core Web Vitals, better ranking.","Responsive, mobile-first, and SEO-ready from the ground up."]'::jsonb, 1, 'published');
insert into public.services ("id", "group_name", "title", "description", "items", "sort_order", "status") values ('d639c8c1-8bc9-4969-b32d-b6495814cb3a', 'Secure', 'Website Security', 'Hardened and protected from the start — malware removed, attacks prevented.', '["Malware removal and hacked-site recovery — calm, thorough, and complete.","Security hardening — closing the doors before anyone finds them.","Firewall setup, login protection, and automated backups.","Blacklist removal — getting your site clean and trusted again."]'::jsonb, 2, 'published');
insert into public.services ("id", "group_name", "title", "description", "items", "sort_order", "status") values ('c4434c40-24f1-4345-aa6f-0a935fd60bb0', 'Grow', 'Ongoing Care & Maintenance', 'The part most freelancers skip — and the part that matters most. A monthly care plan keeps your site secure, updated, backed up, and monitored, so problems get caught before they become emergencies.', '["Regular updates, security monitoring, and scheduled backups.","Priority support when you need something changed or fixed.","Peace of mind — someone reliable who already knows your site."]'::jsonb, 3, 'published');

-- faqs (6 rows)
insert into public.faqs ("id", "question", "answer", "sort_order", "status") values ('96985eb6-637f-45ad-9c13-0d1d2b00809a', 'My site''s been hacked — can you help right now?', 'Yes. Malware removal and hacked-site recovery is core to what I do. I isolate the site, find how the attacker got in, remove everything they left behind, and get you delisted from any Google warning — then harden it so it doesn''t happen again. Reach out through the contact form or book a call and tell me what you''re seeing.', 1, 'published');
insert into public.faqs ("id", "question", "answer", "sort_order", "status") values ('16ed69ce-f3c8-4687-b7c0-8b6590f6e097', 'What platforms do you work with?', 'WordPress and Elementor for business sites, and Shopify for stores. Whatever the platform, the approach is the same: build it properly, secure it from the start, and keep it fast.', 2, 'published');
insert into public.faqs ("id", "question", "answer", "sort_order", "status") values ('eac44ff5-4f94-47c2-8982-3cd3e639f3ae', 'Do you offer ongoing maintenance?', 'Yes — the care plan is the part most freelancers skip and the part that matters most. Regular updates, security monitoring, scheduled backups, and priority support, so problems get caught before they become emergencies.', 3, 'published');
insert into public.faqs ("id", "question", "answer", "sort_order", "status") values ('9dbea472-9c4e-4e92-a964-19c413bd3f78', 'How much does it cost?', 'It depends on the work — a one-off malware cleanup is different from a full build or a monthly care plan. I''d rather scope it to what your site actually needs than quote a number blind. Start with a free audit or a quick call.', 4, 'published');
insert into public.faqs ("id", "question", "answer", "sort_order", "status") values ('4c3a0c8e-6673-4839-a536-baa2ed1cae29', 'What exactly is the free security audit?', 'A no-obligation review of your WordPress site for the common weaknesses attackers look for. You get a plain-language report on what''s exposed and what to fix — whether you handle it yourself or have me do it.', 5, 'published');
insert into public.faqs ("id", "question", "answer", "sort_order", "status") values ('9733d106-f089-4ab4-bb60-70cdf7833a01', 'Will I be able to manage the site myself?', 'That''s the goal. I build and hand over so you own your site — with a walkthrough — instead of needing a developer for every small change.', 6, 'published');

-- content_blocks (105 rows)
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('47c582e1-680f-4edd-92a3-9bfbd36171ed', 'home', 'hero.kicker', '{"text":"Hi, I''m Sefat Hossain","style":{"size":13}}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('60f68154-ec10-4d32-b2b5-6372c0d6c148', 'home', 'hero.kicker_icon', '{"text":"shield-check"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e1471312-ed97-4a4a-b162-429794431905', 'home', 'hero.headline', '{"text":"Website Security Expert You Can Trust","style":{"size":60,"weight":700}}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('58721ed3-b474-4ec4-b1b8-916c427b44cd', 'home', 'hero.subhead', '{"text":"I help businesses recover hacked WordPress websites, remove malware, strengthen security, and keep their websites protected long after launch."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('574ab44c-1ed0-4768-9033-03b4adcce0db', 'home', 'hero.cta_primary', '{"text":"Get your free security audit"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('220f0fb9-bb36-4e38-854c-ffc9e23775da', 'home', 'hero.cta_secondary', '{"text":"View my work"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('2ab74e02-1a57-45cc-896e-09ad73a31cc2', 'work', 'meta.title', '{"text":"Work & Case Studies — WordPress Security & Website Projects | Sefat Hossain"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4eaec94b-8d3c-4658-bcdf-baa9287ad2a4', 'work', 'meta.description', '{"text":"Real recovery stories and website projects — malware removal, security hardening, Elementor builds, Shopify stores, and performance work."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('bbd8486f-209d-45ae-a22e-7271ae43c3c4', 'work', 'hero.kicker', '{"text":"Selected work"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('90d1508d-824f-48c3-834e-f314995f2b69', 'work', 'hero.h1', '{"text":"The work, told as it actually happened."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('addfe73a-ff8f-4355-b97c-2320184c9468', 'work', 'intro.text', '{"text":"Some of my best work is invisible — a hack cleaned up before customers noticed, an attack that never happened because the door was already closed. So instead of just showing screenshots, I''ll tell you the story: what the problem was, what I did, and how it turned out."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('eb98c72e-2950-4b69-bafd-535aed68a1d9', 'work', 'projects.kicker', '{"text":"Build gallery"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e41b7c4a-4559-4ed1-8eef-f842534f2344', 'services', 'hero.kicker', '{"text":"BUILD • SECURE • GROW"}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('2ea41f62-78c9-4e8a-8d6d-63ea449f8624', 'home', 'trust.text', '{"text":"Trusted by business owners, agencies, startups, and e-commerce stores who treat their website as more than a brochure."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('34f238a3-06ee-459b-bce4-1c6d7a62e49d', 'home', 'bsg.kicker', '{"text":"Build · Secure · Grow"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('9678fc44-0a0d-4015-ba3f-1de7b7f48656', 'home', 'bsg.headline', '{"text":"A website isn''t finished at launch. That''s where the real work begins."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4bc5d591-5225-4649-8d86-a3a1d6a76a67', 'home', 'bsg.build.title', '{"text":"Build."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('d80343a3-2dd8-4531-8dda-94b5ac1366fe', 'home', 'meta.title', '{"text":"Sefat Hossain | WordPress Security Expert"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('af47de14-1784-4715-9f38-b39ef3b6bdc8', 'home', 'meta.description', '{"text":"I build and protect high-performance WordPress, Elementor, and Shopify websites — secure from day one and looked after long after launch. Get a free security audit."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('425630a5-7877-4dac-b2d0-36a6c5ecf904', 'work', 'projects.note', '{"text":"A lighter gallery of build work sits below the case studies. It fills in once the live URLs and screenshots for the Elementor and Shopify projects are in — real proof only, never mock-ups."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('a7b3d457-3632-44d8-b1dd-853254bdb784', 'work', 'cta.text', '{"text":"Have a project in mind? Let''s talk"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('7af547fd-36c9-4917-a17c-2a17d75b3117', 'about', 'meta.title', '{"text":"About Sefat Hossain — WordPress Security & Web Development Specialist"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('d0b76b0a-419c-4b07-8a84-45ca2ec0f763', 'about', 'meta.description', '{"text":"I help businesses build, secure, and grow their websites — with a focus on WordPress security, Elementor, and Shopify. Here''s how I work and what I believe."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('0737714e-9e4f-4733-920d-447671bdad0e', 'about', 'hero.kicker', '{"text":"About"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('210de3c1-fcb9-4eef-9b65-42f6b7c2782b', 'about', 'hero.h1', '{"text":"I build secure websites businesses can trust and grow with."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4a85e43b-359a-48e2-a564-535ec79856f9', 'about', 'story.kicker', '{"text":"The story"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('2ffff759-f246-47fe-b945-45caa00ac616', 'about', 'story.body', '{"text":"It started with curiosity — a fascination with how websites actually work behind the scenes. That pulled me into WordPress security and malware removal, where I spent a lot of time helping businesses recover sites that had been hacked. Seeing what that recovery meant to them — the relief, the trust restored — is what pushed me to go further: into Elementor and Shopify, so I could build complete, secure websites from the ground up, not just fix them after the fact."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4c27ac52-557b-47be-a30d-c17f261ca912', 'about', 'belief.kicker', '{"text":"The belief"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('83925871-477d-4575-89aa-5591b4fb9d53', 'about', 'belief.headline', '{"text":"A website should be secure, optimized, easy to manage, and built to grow."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('bd21ca80-749e-4662-b966-8bbdc18a078a', 'about', 'belief.body', '{"text":"Most people treat launching a site as the finish line. I don''t. That''s the moment the real work starts — keeping it safe, fast, and useful as the business changes around it."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('7dcd2fc7-84c0-4d54-8a3d-53b518ad8160', 'about', 'work.kicker', '{"text":"How I work"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e5251c2f-9e49-46cd-bc3b-09e9a77cce0a', 'about', 'work.body', '{"text":"I''m calm, detail-oriented, and honest — especially when the news isn''t good. I''d rather tell you exactly what''s wrong and what it''ll take to fix it than sell you something you don''t need. I work best with clients who value quality, transparency, and a long-term relationship over a quick job."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('12edd29e-485e-444a-859c-84b0132989db', 'about', 'skills.kicker', '{"text":"Skills · Stack"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('22eafb3d-4aeb-4078-872e-25d861222974', 'about', 'skills.items', '{"items":["WordPress security, malware removal, and hardening","Elementor design and development","Shopify store design and customization","Performance optimization and technical SEO"]}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('67249f22-639f-4596-85b2-a954cc4c1a7a', 'about', 'outside.kicker', '{"text":"Outside work"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('364e8f2f-7658-4fa6-af1d-e4898b502f92', 'about', 'outside.body', '{"text":"Away from the screen, I play cricket and stay endlessly curious — I spend a lot of time researching cybersecurity, new web technologies, and how businesses actually grow. The learning never really stops, and I like it that way."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('d9cae4ae-3dd1-4a7e-89ee-a05ff18bec3b', 'about', 'credentials.kicker', '{"text":"Credentials"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('cdc4838e-60ea-418d-8b4d-7c765d82fce1', 'about', 'credentials.body', '{"text":"I''m currently expanding my professional certifications while continuing to invest in advanced, hands-on learning."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('fc9007f7-067a-4d6c-bfe6-cad9494c3466', 'about', 'cta.primary', '{"text":"Work with me"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('1232871e-e5b3-40c1-a557-a768155cf18a', 'about', 'cta.secondary', '{"text":"Download CV"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('cfb5338c-3d8e-4f9f-8aa3-1d9c7189da26', 'blog', 'meta.title', '{"text":"Blog — WordPress Security, Speed & Web Tips | Sefat Hossain"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('39813a76-9b4c-42a0-aae4-e07ef88e83d6', 'blog', 'meta.description', '{"text":"Practical, plain-language articles on WordPress security, malware prevention, website speed, and getting more from your site."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('3729cdfa-ddb3-4e35-9db5-ec48c7292e36', 'blog', 'hero.kicker', '{"text":"Writing"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('369fbfe0-30ef-4b92-808e-9aeff87685f0', 'blog', 'hero.h1', '{"text":"Practical advice for keeping your website safe and fast."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('3a6dbec8-d208-4f70-a1c9-6b18c1dc9fdf', 'blog', 'intro.text', '{"text":"No jargon, no fear-selling — just clear, useful writing on the things business owners actually run into: hacked sites, slow pages, security worries, and how to stay ahead of them."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('7d2085df-3e36-4cd7-833e-bcbc6b9ec587', 'contact', 'meta.title', '{"text":"Contact — Let''s Build Something Secure | Sefat Hossain"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('38247f3e-85fb-4bca-9af4-10f4db85fb7a', 'contact', 'meta.description', '{"text":"Have a project, a hacked site, or a website that needs care? Book a call or send a message — I reply personally."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('7fcb4602-1c20-4f27-96d8-fde98712b676', 'contact', 'hero.kicker', '{"text":"Contact"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('9362fb92-64c3-40bb-8945-5ddf9a9cf3d7', 'contact', 'hero.h1', '{"text":"Let''s talk about your website."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('658e2738-0f2f-4b14-9009-28740e94d150', 'contact', 'intro.text', '{"text":"Whether you''re launching something new, recovering from a hack, or just want your site properly looked after — tell me what''s going on. I read every message myself and reply personally."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('46089134-59cf-41d1-9542-98fb0ce30df7', 'security-audit', 'meta.title', '{"text":"Free WordPress Security Audit — Find Out What''s Exposed | Sefat Hossain"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('651c999a-76b9-42c3-8147-661d914b8db3', 'security-audit', 'meta.description', '{"text":"Get a free, no-obligation security audit of your WordPress site. I''ll check for common vulnerabilities and send a plain-language report on what to fix."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('31011657-3fef-4466-9128-1bf6622c6bb4', 'security-audit', 'hero.kicker', '{"text":"Free security audit"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e6f36baa-72a4-48d1-bfac-48bd5fb864c4', 'security-audit', 'hero.h1', '{"text":"Find out what''s exposed — before someone else does."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('7a2ebde2-7c3e-4aee-a4f6-14d30c3b111c', 'security-audit', 'offer.body', '{"text":"Most website owners have no idea how exposed their site is until something goes wrong. A free security audit changes that. I''ll review your WordPress site for the common weaknesses attackers look for, and send you a clear, jargon-free report — what''s at risk, and what to do about it."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('d8181b55-b711-4cf9-82bd-322660bab92e', 'security-audit', 'what.kicker', '{"text":"What you get"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('353b25de-8fce-4f48-a506-05514a46f2d1', 'security-audit', 'what.items', '{"items":["A check for common vulnerabilities, outdated software, and weak points.","A plain-language report you can actually understand.","Clear next steps — whether you fix them yourself or have me handle it.","No obligation, no pressure, no jargon."]}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('04918b17-35c2-4d60-86ac-12a5a53fc8d8', 'security-audit', 'reassurance.text', '{"text":"Your details stay private. I use them only to run your audit and send your report — nothing else."}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('bc9df30c-0798-41a7-9247-b2714db3178c', 'security-audit', 'cta.text', '{"text":"Get my free audit"}'::jsonb, '2026-07-08T22:50:25.517374+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('f3af093f-52fc-47d1-88d5-1ac67aaba6d7', 'services', 'meta.title', '{"text":"Services — WordPress Security, Elementor & Shopify Expert | Sefat Hossain"}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('39e2ccb8-76bc-4ac0-89ad-8d63f85f7ba3', 'home', 'testimonials.stat_number', '{"text":""}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('57151e8c-c321-4c50-a957-c57f576f9219', 'services', 'meta.description', '{"text":"Professional WordPress security, malware removal, Elementor website design, Shopify store setup, speed optimization, and ongoing website maintenance to keep your business secure and growing."}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('75df1039-0cdb-43f4-848f-d2a4d46ff240', 'services', 'hero.h1', '{"text":"Build.\nProtect.\nGrow."}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('1c9b7c58-6215-45e4-a48b-44a5711b9cac', 'services', 'intro.text', '{"text":"A great website is more than great design. It should be fast, secure, easy to manage, and built to support your business for years—not just impress on launch day."}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('855288f1-e714-43b3-8bed-b40448d9bc34', 'services', 'grow.note', '{"text":"Launching your website is only the beginning. Regular updates, security monitoring, backups, and performance optimization keep your business protected and running smoothly as it grows."}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('9adf5237-86ed-4172-b007-bc0fe55a0213', 'services', 'pricing.note', '{"text":"Every business has different goals. Instead of fixed packages, I recommend solutions based on your website, your challenges, and your growth plans. Start with a free audit or a quick discovery call."}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('33893c9f-6c44-440c-b78c-d4164421cae0', 'services', 'cta.headline', '{"text":"Let''s find the right solution for your website."}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e95ae457-e3e5-47d7-a93e-62cfb419b44d', 'services', 'cta.primary', '{"text":"Get a Free Security Audit"}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('6d6e2f67-6b7e-4179-9070-8b3e5dffe00d', 'services', 'cta.secondary', '{"text":"Book a call"}'::jsonb, '2026-07-09T15:26:25.025601+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('540aaf0a-99bf-498e-8283-4beef4f645cf', 'home', 'hero.person_name', '{"text":"Sefat Hossain"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('c4b87b93-292c-4fc0-a337-94597315bb26', 'home', 'hero.person_role', '{"text":"WordPress Security Expert"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('80fc34c5-010a-4434-a379-0c2b3483d607', 'home', 'bsg.build.body', '{"text":"Premium, high-performance sites in WordPress, Elementor, and Shopify — designed to convert, not just to exist."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4623406e-8e72-4db9-97be-a64efce7fee2', 'home', 'bsg.secure.title', '{"text":"Secure."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('de850d4e-7152-4952-83c5-490109d7e644', 'home', 'bsg.secure.body', '{"text":"Hardened and protected from the start. Malware removed, attacks prevented, trust kept intact."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('39ea7e1d-db66-4632-92da-a9511c236065', 'home', 'bsg.grow.title', '{"text":"Grow."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('c97bae52-bd34-4b0e-b785-31eb9d8017cb', 'home', 'bsg.grow.body', '{"text":"Maintained and optimized over time, so your site becomes an asset that supports the business — not a liability that surprises you."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('546af481-8abf-4502-8bd2-8e8ddec02aa9', 'home', 'work.kicker', '{"text":"Featured work"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('d3fbbe06-75b4-4893-83d7-b8fe57f6a57b', 'home', 'work.headline', '{"text":"Real problems, quietly solved."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4c14acd2-9109-4ed9-88fb-5fc2a18edc31', 'home', 'work.subhead', '{"text":"From hacked sites brought back online to stores rebuilt to sell — here''s a look at what that work actually involves."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e27489d0-be1d-4d98-b7ea-d539b8e81868', 'home', 'work.cta', '{"text":"See all case studies"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('727b39a3-7da7-4161-a4bf-6323d5b98a1b', 'home', 'belief.kicker', '{"text":"The belief"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('2273f2db-e22e-4b9c-b938-d74eeb653d76', 'home', 'belief.headline', '{"text":"Most people think launching a website is the finish line. I think it''s the starting line."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('9e0bf9ae-05bb-48f7-a7bb-6893df9924a4', 'home', 'belief.body', '{"text":"A website should be secure, fast, easy to manage, and built to support real growth. Anyone can put a site online. Keeping it safe, quick, and working for your business — month after month — is the part that actually matters. That''s the part I care about."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('53eee3c4-d170-4a2e-a969-c14479708f62', 'home', 'testimonials.kicker', '{"text":"Testimonials"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('b3043809-ddff-4ce2-abb7-eef230fc8c81', 'home', 'testimonials.headline', '{"text":"What clients say."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('891fbc3c-9055-46cd-9dcc-bb538778d992', 'home', 'testimonials.stat_label', '{"text":"Happy clients"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('4c67a363-649f-4473-a335-1c30c566517f', 'home', 'testimonials.stat_subtext', '{"text":"Building secure sites for people and brands."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('ebe6b4fc-116a-4839-8e4c-ffc0f6dcc669', 'home', 'testimonials.slider_autoplay', '{"text":"true"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('6e1bea53-227d-4b85-bece-bd63ad8749b9', 'home', 'testimonials.slider_interval', '{"text":"6"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('c797824e-95cd-4ac4-ac33-ff122807afa0', 'home', 'audit.kicker', '{"text":"Free security audit"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('e6aac777-57c6-4a77-8c7f-d5c415111c66', 'home', 'audit.headline', '{"text":"Is your website actually secure? Most owners don''t know until it''s too late."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('65eff17c-14fe-45ef-a41e-e1db8e099422', 'home', 'meta.focus_keyword', '{"text":""}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('3176830c-b32b-4009-af28-3a8ae05b7822', 'home', 'meta.canonical', '{"text":""}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('335b75b5-c0ed-471d-8ea4-d8f61058a6ee', 'home', 'meta.og_image', '{"alt":"","url":""}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('8faa5b75-4b2d-40b5-8b3b-8956bd3d66e0', 'home', 'meta.noindex', '{"text":"false"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('71f5136c-4c2f-4f5a-8cda-603151dc7733', 'home', 'audit.body', '{"text":"Get a free security audit. I''ll check your site for the common vulnerabilities attackers look for, and send you a plain-language report on what''s exposed and what to fix — no obligation, no jargon."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('5ee5149c-4d00-41a6-b76d-33ccff2f4d01', 'home', 'audit.cta', '{"text":"Get my free audit"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('50348499-f252-4184-891d-8da822629611', 'home', 'final.headline', '{"text":"Let''s make your website something you never have to worry about."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('3671c9f8-a991-42fe-95a5-49e4d3811c3f', 'home', 'final.cta_primary', '{"text":"Book a call"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('c59a8c1b-15f6-43da-b2d7-9df082032845', 'home', 'final.cta_secondary', '{"text":"Start a project"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('ac7c1c8d-4134-4df5-ae27-6684bb3ceaf3', 'home', 'getshielded.eyebrow', '{"text":"Agency partner"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('125e2956-c06b-437a-b9b9-d45ce5372147', 'home', 'getshielded.blurb', '{"text":"Part of Get Shielded — a WordPress security, design, development & lead-marketing studio building trusted, high-performing websites."}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('b265c45d-438a-4e12-9eda-4a42be9aaef1', 'home', 'getshielded.cta', '{"text":"Visit Get Shielded"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('160bba5b-8869-4677-9596-55a37d88f522', 'home', 'getshielded.url', '{"text":"https://getshielded.agency"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');
insert into public.content_blocks ("id", "page_slug", "block_key", "value", "updated_at") values ('422d55f5-4ebc-4e98-8a03-d9d2bb7c921b', 'home', 'getshielded.logo', '{"alt":"Get Shielded","url":"https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1784384182243-gs-lo-2.png"}'::jsonb, '2026-07-19T15:07:11.381179+00:00');

-- media (9 rows)
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('0eea527e-64be-40df-959f-311c1ff8bf2d', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_162954_f38d770d-4f2b-4b4f-a62e-fbed2a2cc2e0.png', 'Secure lattice — hero poster', 'image/png', NULL, NULL, 'media', '2026-07-08T22:50:25.753353+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('314387a9-3d3e-42ac-8a87-840d66f31ac0', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163001_5b86dc92-2a16-4afd-a81a-45d7c69ee55a.png', 'Build · Secure · Grow background', 'image/png', NULL, NULL, 'media', '2026-07-08T22:50:25.753353+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('410900bd-b17d-4147-ae62-e1be4dedd1a8', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163020_1737c12c-156f-45ff-bbb2-98bdd9dad2c5.png', 'Malware recovery — abstract', 'image/png', NULL, NULL, 'media', '2026-07-08T22:50:25.753353+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('379b7f0a-8a4d-4cdc-9977-b96d3e92cdd9', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163028_10f89cbf-51e2-486d-a860-f9b1033f66d5.png', 'Security hardening — abstract', 'image/png', NULL, NULL, 'media', '2026-07-08T22:50:25.753353+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('3184d2d7-dc48-4de3-ba4b-b24983f23261', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163033_f60ed521-8569-4e73-8c04-db6a37fa1cf5.png', 'Blog featured-image template', 'image/png', NULL, NULL, 'media', '2026-07-08T22:50:25.753353+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('43254a3b-2119-4792-8a17-8be4b9dabcf3', 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1783615441014-profile-pic.png', NULL, 'image/png', NULL, NULL, 'media', '2026-07-09T16:44:02.593403+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('acba13ba-34d2-474f-b82d-cff3f5ef23fc', 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1784193176738-chatgpt-image-jul-16-2026-03-11-22-pm-2-.png', NULL, 'image/png', NULL, NULL, 'media', '2026-07-16T09:12:59.165053+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('c4fe8e1d-ce22-4aa6-b4c0-35e1fd241586', 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1784193426662-chatgpt-image-jul-16-2026-03-16-42-pm.png', NULL, 'image/png', NULL, NULL, 'media', '2026-07-16T09:17:08.838087+00:00');
insert into public.media ("id", "url", "alt", "type", "width", "height", "bucket", "created_at") values ('460e4777-3fb0-40f2-b482-7da271faac92', 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1785690446164-wordpress-hacked.png', NULL, 'image/png', NULL, NULL, 'media', '2026-08-02T17:07:27.560257+00:00');

-- blog_posts (3 rows)
insert into public.blog_posts ("id", "slug", "title", "excerpt", "body", "featured_image", "author", "category_id", "tags", "status", "published_at", "seo", "reading_minutes", "created_at", "updated_at") values ('1fb43ce0-7564-446c-aca5-25d2fd668dad', '5-signs-your-website-has-malware', '5 signs your website has malware', 'Malware doesn''t always announce itself. Here are the quiet signals that something''s wrong under the hood — before your visitors notice.', '<p>The worst malware is the quiet kind. It doesn''t deface your homepage — it hides, redirects a fraction of your visitors, or sends spam in the background for months. Here are the signals worth watching for.</p>
<h2>1. Unexpected redirects</h2>
<p>Visitors — often only on mobile, or only from Google — get bounced to a site you''ve never heard of. This is one of the most common symptoms of a compromised WordPress install.</p>
<h2>2. A Google warning or a blacklist</h2>
<p>“This site may be harmful,” a red interstitial, or a sudden collapse in traffic usually means a search engine has flagged you. It''s a signal, not the disease — but it needs handling quickly.</p>
<h2>3. New admin users or files you didn''t create</h2>
<p>An unfamiliar administrator account, or files with random names in your uploads folder, are classic backdoor signatures. Attackers leave themselves a way back in.</p>
<h2>4. Your host suspends the account or flags spam</h2>
<p>If your hosting provider emails you about outbound spam or unusual resource usage, take it seriously. A compromised site is often quietly used to send email or attack others.</p>
<h2>5. Strange behaviour in search results</h2>
<p>Search listings showing pages you never published — often in another language, selling products you don''t sell — mean someone has injected content to piggyback on your rankings.</p>
<h2>If two or more of these ring true</h2>
<p>Don''t wait for it to get worse. A proper scan across core files, themes, plugins, and the database will tell you exactly what''s there — and a free audit is a low-stakes way to find out where you stand.</p>', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163033_f60ed521-8569-4e73-8c04-db6a37fa1cf5.png', 'Sefat Hossain', '11aa4655-44f9-4cb5-aae8-7399e128f750', '["WordPress","Malware"]'::jsonb, 'published', '2026-06-17T09:00:00+00:00', '{"title":"5 signs your website has malware","description":"Malware often hides. Here are five quiet signals that your WordPress site may be compromised — spot them before your visitors do."}'::jsonb, 4, '2026-07-08T22:50:26.617146+00:00', '2026-07-08T22:50:26.617146+00:00');
insert into public.blog_posts ("id", "slug", "title", "excerpt", "body", "featured_image", "author", "category_id", "tags", "status", "published_at", "seo", "reading_minutes", "created_at", "updated_at") values ('579a5f7d-aadf-4693-a8d8-c598912d6014', 'why-your-website-is-slow-and-how-to-fix-it', 'Why your website is slow (and how to fix it)', 'Speed isn''t a vanity metric — it''s ranking, conversions, and wasted ad spend. Here''s what actually makes sites slow, and the fixes that move the needle.', '<p>A slow site frustrates visitors, gets ranked lower by Google, and turns paid traffic into wasted spend. The good news: most slowness comes from a short list of causes, and each has a well-understood fix.</p>
<h2>Images are almost always the biggest culprit</h2>
<p>Uploading a 4000px photo and letting the browser shrink it means every visitor downloads a huge file for a small space. Compress, size correctly, serve modern formats (WebP/AVIF), and lazy-load anything below the fold.</p>
<h2>No caching means every visit does the same work twice</h2>
<p>Without page and browser caching, your server rebuilds each page from scratch on every request. Proper caching lets browsers and the server do far less work, and the difference is immediate.</p>
<h2>Plugin bloat adds up quietly</h2>
<p>Every plugin adds code that loads on the page. Over the years, sites accumulate plugins nobody uses. Auditing and removing the dead weight — and the scripts they load — is often the single biggest win.</p>
<h2>Render-blocking CSS and JavaScript</h2>
<p>Large, unminified stylesheets and scripts block the page from painting. Minifying them, and deferring what isn''t needed for the first view, gets content on screen faster.</p>
<h2>Distance from your visitors</h2>
<p>If your server is in one country and your visitors are worldwide, a CDN caches your site closer to them so it loads quickly regardless of where they are.</p>
<h2>Measure, fix, then measure again</h2>
<p>Guessing wastes time. Run a real audit against Core Web Vitals, fix the biggest offenders first, and re-test on both desktop and mobile — not just on a fast developer connection. Speed you can measure is speed you can defend.</p>', 'https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg/hf_20260708_163033_f60ed521-8569-4e73-8c04-db6a37fa1cf5.png', 'Sefat Hossain', 'c6174360-ec58-43c6-be26-c3694bb1183d', '["Performance","Core Web Vitals","Speed"]'::jsonb, 'published', '2026-06-10T09:00:00+00:00', '{"title":"Why your website is slow (and how to fix it)","description":"The real causes of a slow WordPress site — and the practical fixes that improve Core Web Vitals, ranking, and conversions."}'::jsonb, 6, '2026-07-08T22:50:26.617146+00:00', '2026-07-08T22:50:26.617146+00:00');
insert into public.blog_posts ("id", "slug", "title", "excerpt", "body", "featured_image", "author", "category_id", "tags", "status", "published_at", "seo", "reading_minutes", "created_at", "updated_at") values ('5f6f5a1b-1083-4f9e-827c-cdee67c45510', 'wordpress-site-hacked', 'What to do the moment your WordPress site is hacked', 'A calm, step-by-step checklist for the first hour after you discover your site has been compromised — what to do, and what not to.', '<h2>What to Do Immediately After Your WordPress Site Is Hacked</h2>

<p>
A <strong>WordPress Site Hacked</strong> incident can happen without warning. Whether you run a business website, an online store, or a personal blog, discovering that your WordPress site has been hacked can lead to malware infections, SEO penalties, lost customers, and financial damage. This guide explains exactly what to do immediately to recover your website safely and prevent future attacks.
</p>

<p>
The biggest mistake most website owners make is reacting emotionally. They immediately start deleting files, reinstalling plugins, or restoring random backups without understanding how the attacker gained access. This often makes the situation worse.
</p>

<p>
Instead, follow a structured recovery process. In this guide, you''ll learn exactly what to do during the first few hours after discovering your WordPress website has been compromised.
</p>

<hr>

<h2>1. Stay Calm and Don''t Delete Anything</h2>

<p>
Your first instinct may be to delete suspicious files immediately. Don''t.
</p>

<p>
Malicious files often contain valuable evidence that helps identify how the attacker entered your website. Removing files without understanding the infection source may allow the hacker to return days or weeks later.
</p>

<p>
Instead:
</p>

<ul>
<li>Stop making unnecessary changes.</li>
<li>Document what you noticed.</li>
<li>Take screenshots of unusual behavior.</li>
<li>Write down any error messages.</li>
</ul>

<p>
Think of your website like a crime scene—you don''t clean it before investigating what happened.
</p>

<hr>

<h2>2. Put Your Website Into Maintenance Mode</h2>

<p>
If visitors are seeing spam pages, phishing content, malware warnings, or suspicious redirects, temporarily place the website into maintenance mode.
</p>

<p>
This helps:
</p>

<ul>
<li>Protect your visitors.</li>
<li>Prevent further damage to your reputation.</li>
<li>Reduce the chance of search engines indexing malicious pages.</li>
<li>Prevent customers from entering sensitive information.</li>
</ul>

<p>
If your hosting provider supports temporary maintenance pages, use that instead of simply deleting the website.
</p>

<hr>

<h2>3. Take a Complete Backup Before Cleaning Anything</h2>

<p>
Even if your website is infected, create a complete backup before making any changes.
</p>

<p>
Your backup should include:
</p>

<ul>
<li>All website files</li>
<li>WordPress database</li>
<li>Uploads folder</li>
<li>Configuration files</li>
<li>Server logs (if available)</li>
</ul>

<p>
This backup becomes your recovery point if something goes wrong during cleanup and may also help identify how the malware entered your website.
</p>

<hr>

<h2>4. Change Every Password Immediately</h2>

<p>
Never assume only the WordPress admin password has been compromised.
</p>

<p>
Update passwords for:
</p>

<ul>
<li>WordPress administrator accounts</li>
<li>Hosting control panel</li>
<li>FTP/SFTP accounts</li>
<li>SSH users</li>
<li>Database users</li>
<li>Email accounts connected to the website</li>
<li>Cloudflare or CDN accounts</li>
<li>Domain registrar account</li>
</ul>

<p>
Use strong, unique passwords with at least 16 characters and enable Two-Factor Authentication (2FA) wherever possible.
</p>

<hr>

<h2>5. Scan the Entire Website for Malware</h2>

<p>
A hacked website usually contains more than one malicious file. Attackers often install multiple backdoors so they can regain access even after the obvious malware is removed.
</p>

<p>
Perform a complete security scan of:
</p>

<ul>
<li>WordPress core files</li>
<li>Themes</li>
<li>Plugins</li>
<li>Uploads directory</li>
<li>Must-use plugins</li>
<li>Hidden PHP files</li>
<li>Database entries</li>
</ul>

<p>
Don''t rely on a single automated scanner. Manual inspection is often necessary to identify sophisticated malware and hidden backdoors.
</p>

<hr>

<h2>6. Remove Unknown Users</h2>

<p>
Hackers frequently create hidden administrator accounts to maintain access after the initial compromise.
</p>

<p>
Review every user account inside your WordPress dashboard.
</p>

<ul>
<li>Delete unknown administrators.</li>
<li>Remove suspicious editor accounts.</li>
<li>Check recently created users.</li>
<li>Review user permissions carefully.</li>
</ul>

<p>
If you find accounts you didn''t create, investigate immediately before deleting them.
</p>
<hr>

<h2>7. Identify How the Attack Happened</h2>

<p>
Removing malware is only part of the recovery process. If you don''t identify how attackers gained access, your website may become compromised again.
</p>

<p>
Some of the most common causes include:
</p>

<ul>
<li>Outdated WordPress core files</li>
<li>Vulnerable plugins or themes</li>
<li>Weak administrator passwords</li>
<li>Compromised hosting accounts</li>
<li>Insecure file permissions</li>
<li>Exposed FTP or SSH credentials</li>
<li>Pirated or nulled themes and plugins</li>
</ul>

<p>
Understanding the root cause allows you to fix the vulnerability instead of repeatedly cleaning the same infection.
</p>

<hr>

<h2>8. Update WordPress, Themes, and Plugins</h2>

<p>
Once your website has been cleaned, update everything to the latest stable version.
</p>

<p>
Security updates are released regularly to fix known vulnerabilities that attackers actively scan for.
</p>

<ul>
<li>Update WordPress Core</li>
<li>Update Themes</li>
<li>Update Plugins</li>
<li>Delete unused plugins and themes</li>
</ul>

<p>
Never leave inactive plugins installed if you don''t use them. They can still become attack vectors.
</p>

<hr>

<h2>9. Check Your Database for Hidden Malware</h2>

<p>
Modern WordPress malware often hides inside the database rather than website files. Attackers may inject malicious JavaScript, spam links, SEO spam, or hidden administrator settings directly into database tables.
</p>

<p>
Review:
</p>

<ul>
<li>wp_options</li>
<li>wp_posts</li>
<li>wp_postmeta</li>
<li>wp_users</li>
<li>wp_usermeta</li>
</ul>

<p>
Look for suspicious code, unknown administrator accounts, hidden redirects, and spam content.
</p>

<hr>

<h2>10. Check Google for Security Warnings</h2>

<p>
After a successful attack, Google may flag your website as dangerous or unsafe.
</p>

<p>
Check whether your website has:
</p>

<ul>
<li>Security warnings</li>
<li>Spam indexing</li>
<li>Blacklisted URLs</li>
<li>Malware notifications</li>
</ul>

<p>
If your website is connected to Google Search Console, review the Security Issues section and resolve every reported problem before requesting a review.
</p>

<hr>

<h2>11. Change Security Keys</h2>

<p>
WordPress security keys (SALTs) help protect logged-in sessions.
</p>

<p>
After recovering a hacked website, regenerate your WordPress security keys to force every logged-in user to authenticate again.
</p>

<p>
This immediately invalidates stolen login cookies that attackers may still possess.
</p>

<hr>

<h2>12. Strengthen Your Website Security</h2>

<p>
Cleaning malware isn''t enough. Your goal should be preventing future attacks.
</p>

<p>
Consider implementing:
</p>

<ul>
<li>Web Application Firewall (WAF)</li>
<li>Login protection</li>
<li>Two-Factor Authentication</li>
<li>Automatic backups</li>
<li>Malware scanning</li>
<li>File integrity monitoring</li>
<li>Security hardening</li>
<li>Cloudflare protection</li>
</ul>

<p>
Website security should become part of your regular maintenance routine rather than something you think about only after an incident.
</p>

<hr>

<h2>13. Monitor Your Website After Recovery</h2>

<p>
Even after successfully cleaning your website, continue monitoring it for several weeks.
</p>

<p>
Watch for:
</p>

<ul>
<li>Unexpected file changes</li>
<li>New administrator accounts</li>
<li>Spam pages appearing in search engines</li>
<li>Suspicious login attempts</li>
<li>Performance issues</li>
<li>Unknown scheduled tasks</li>
</ul>

<p>
Early detection can prevent another successful attack.
</p>
<hr>

<h2>Final Thoughts</h2>

<p>
A hacked WordPress website doesn''t always mean starting from scratch. In most cases, a successful recovery is possible if you act quickly, follow a structured process, and address the root cause of the compromise.
</p>

<p>
Many website owners focus only on removing visible malware, but true recovery goes much further. You need to eliminate hidden backdoors, secure every access point, update vulnerable software, and strengthen your overall security posture.
</p>

<p>
Website security is not a one-time task. It is an ongoing process that includes monitoring, maintenance, regular updates, backups, and proactive protection. Investing in prevention is always easier and less expensive than recovering from another attack.
</p>

<hr>

<h2>Frequently Asked Questions</h2>

<h3>Can I recover a hacked WordPress website?</h3>

<p>
Yes. Most hacked WordPress websites can be recovered if the infection is identified correctly and every malicious file, database infection, and backdoor is removed.
</p>

<h3>Should I restore an old backup?</h3>

<p>
Restoring a clean backup may help, but only if the vulnerability that caused the hack has been fixed. Otherwise, the website can become compromised again.
</p>

<h3>Can malware come back after removal?</h3>

<p>
Yes. If hidden backdoors, infected database entries, or vulnerable plugins remain, attackers may regain access.
</p>

<h3>Is SSL enough to protect my website?</h3>

<p>
No. SSL encrypts data during transmission but does not protect your WordPress website from malware, vulnerable plugins, brute-force attacks, or hacked administrator accounts.
</p>

<h3>How often should I scan my website?</h3>

<p>
For business websites, regular automated monitoring combined with periodic manual security reviews provides much better protection than occasional scans.
</p>

<hr>

<h2>Need Professional WordPress Security Help?</h2>

<p>
If your WordPress website has been hacked, infected with malware, or you''re looking to strengthen its security before problems occur, professional assistance can save you time, reduce downtime, and prevent future attacks.
</p>

<ul>
<li>✔ WordPress Malware Removal</li>
<li>✔ Hacked Website Recovery</li>
<li>✔ Website Security Hardening</li>
<li>✔ Security Audits</li>
<li>✔ Ongoing Security Monitoring</li>
<li>✔ Website Protection & Cleanup</li>
</ul>

<p>
<strong>Website:</strong> https://sefathossain.com<br>
<strong>Email:</strong> admin@sefathossain.com
</p>

<hr>

<h2>About the Author</h2>

<p>
<strong>Sefat Hossain</strong> is a <strong>WordPress Security Expert</strong> specializing in malware removal, hacked website recovery, security hardening, and long-term website protection. His goal is to help businesses keep their WordPress websites secure, reliable, and resilient against modern cyber threats.
</p>
<hr>

<h2>Final Thoughts</h2>

<p>
A hacked WordPress website doesn''t always mean starting from scratch. In most cases, a successful recovery is possible if you act quickly, follow a structured process, and address the root cause of the compromise.
</p>

<p>
Many website owners focus only on removing visible malware, but true recovery goes much further. You need to eliminate hidden backdoors, secure every access point, update vulnerable software, and strengthen your overall security posture.
</p>

<p>
Website security is not a one-time task. It is an ongoing process that includes monitoring, maintenance, regular updates, backups, and proactive protection. Investing in prevention is always easier and less expensive than recovering from another attack.
</p>

<hr>

<h2>Frequently Asked Questions</h2>

<h3>Can I recover a hacked WordPress website?</h3>

<p>
Yes. Most hacked WordPress websites can be recovered if the infection is identified correctly and every malicious file, database infection, and backdoor is removed.
</p>

<h3>Should I restore an old backup?</h3>

<p>
Restoring a clean backup may help, but only if the vulnerability that caused the hack has been fixed. Otherwise, the website can become compromised again.
</p>

<h3>Can malware come back after removal?</h3>

<p>
Yes. If hidden backdoors, infected database entries, or vulnerable plugins remain, attackers may regain access.
</p>

<h3>Is SSL enough to protect my website?</h3>

<p>
No. SSL encrypts data during transmission but does not protect your WordPress website from malware, vulnerable plugins, brute-force attacks, or hacked administrator accounts.
</p>

<h3>How often should I scan my website?</h3>

<p>
For business websites, regular automated monitoring combined with periodic manual security reviews provides much better protection than occasional scans.
</p>

<hr>

<h2>Need Professional WordPress Security Help?</h2>

<p>
If your WordPress website has been hacked, infected with malware, or you''re looking to strengthen its security before problems occur, professional assistance can save you time, reduce downtime, and prevent future attacks.
</p>

<ul>
<li>✔ WordPress Malware Removal</li>
<li>✔ Hacked Website Recovery</li>
<li>✔ Website Security Hardening</li>
<li>✔ Security Audits</li>
<li>✔ Ongoing Security Monitoring</li>
<li>✔ Website Protection & Cleanup</li>
</ul>

<p>
<strong>Website:</strong> https://sefathossain.com<br>
<strong>Email:</strong> admin@sefathossain.com
</p>

<hr>

<h2>About the Author</h2>

<p>
<strong>Sefat Hossain</strong> is a <strong>WordPress Security Expert</strong> specializing in malware removal, hacked website recovery, security hardening, and long-term website protection. His goal is to help businesses keep their WordPress websites secure, reliable, and resilient against modern cyber threats.
</p>', 'https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/media/uploads/1785690446164-wordpress-hacked.png', 'Sefat Hossain', '11aa4655-44f9-4cb5-aae8-7399e128f750', '["WordPress Security","WordPress Malware","Website Security","Malware Removal","Hacked Website","WordPress Recovery","Cyber Security","Website Protection"]'::jsonb, 'published', '2026-06-24T09:00:00+00:00', '{"title":"WordPress Site Hacked? What To Do Immediately","description":"WordPress site hacked? Learn exactly what to do immediately after a hack with this step-by-step recovery checklist to secure your website.","focus_keyword":"WordPress Site Hacked"}'::jsonb, 5, '2026-07-08T22:50:26.617146+00:00', '2026-08-02T17:21:08.802031+00:00');

commit;
