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
