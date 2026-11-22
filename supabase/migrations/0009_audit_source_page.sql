-- ==================== 0009_audit_source_page.sql ====================
-- Where each audit request first landed (leads already has source_page).
-- Additive and safe to re-run. The app works before and after it is applied.
alter table public.audit_requests add column if not exists source_page text;
notify pgrst, 'reload schema';
