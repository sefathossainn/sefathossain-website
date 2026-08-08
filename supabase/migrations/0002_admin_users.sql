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
