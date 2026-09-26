-- ==================== 0006_page_views_deep.sql ====================
-- Deeper analytics fields. Fully idempotent and self-sufficient: it creates the
-- base page_views table if 0005 was never applied, then adds the richer columns.
-- Still privacy-friendly — visitor_id is a first-party random id kept in the
-- browser's localStorage (not a cross-site cookie), never an IP or personal data.

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  country text,
  device text,
  visitor_hash text,
  created_at timestamptz default now()
);

alter table public.page_views add column if not exists browser text;
alter table public.page_views add column if not exists os text;
alter table public.page_views add column if not exists utm_source text;
alter table public.page_views add column if not exists utm_medium text;
alter table public.page_views add column if not exists utm_campaign text;
alter table public.page_views add column if not exists visitor_id text;
alter table public.page_views add column if not exists is_entry boolean default false;

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);
create index if not exists page_views_visitor_id_idx on public.page_views (visitor_id);

alter table public.page_views enable row level security;
drop policy if exists "admin all page_views" on public.page_views;
create policy "admin all page_views" on public.page_views
  for all to authenticated using (true) with check (true);
