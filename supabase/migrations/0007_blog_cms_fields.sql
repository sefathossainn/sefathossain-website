-- ==================== 0007_blog_cms_fields.sql ====================
-- Editable "Quick answer" and "Key takeaways" for blog posts, so any post
-- (existing or new) can show the highlighted answer box and the takeaways
-- checklist. Both are optional; the post page falls back to the excerpt for the
-- quick answer and to built-in defaults for takeaways when these are empty.

alter table public.blog_posts add column if not exists quick_answer text;
alter table public.blog_posts add column if not exists key_takeaways jsonb;
