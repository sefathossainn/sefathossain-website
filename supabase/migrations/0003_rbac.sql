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
