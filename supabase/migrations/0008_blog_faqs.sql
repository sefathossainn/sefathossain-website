-- ==================== 0008_blog_faqs.sql ====================
-- Editable "People also ask" follow-up questions for blog posts. Rendered as an
-- accordion at the foot of each post and emitted as FAQPage structured data, so
-- posts become eligible for Google FAQ rich results and AI answer-engine
-- citations. Optional — the post page falls back to built-in per-post questions
-- when this is empty.

alter table public.blog_posts add column if not exists faqs jsonb;
