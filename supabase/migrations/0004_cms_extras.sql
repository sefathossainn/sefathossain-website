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
