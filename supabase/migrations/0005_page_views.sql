-- ==================== 0005_page_views.sql ====================
-- First-party, privacy-friendly analytics. Stores one row per page view with
-- NO personal data: coarse country + device, path, referrer host, and a
-- daily-rotating one-way visitor hash (never the raw IP). Writes happen only
-- from the server via the service-role client (/api/track); reads are for
-- signed-in admins.

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,                 -- external referrer host only ('' for direct)
  country text,                  -- ISO country code from the edge, or null
  device text,                   -- 'mobile' | 'tablet' | 'desktop'
  visitor_hash text,             -- sha256(ip+ua+day+salt), truncated — not PII
  created_at timestamptz default now()
);

create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);

alter table public.page_views enable row level security;

-- No anon access at all (private analytics). Inserts come from the service-role
-- client, which bypasses RLS. Authenticated admins may read/manage.
drop policy if exists "admin all page_views" on public.page_views;
create policy "admin all page_views" on public.page_views
  for all to authenticated using (true) with check (true);
