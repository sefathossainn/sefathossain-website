# sefathossain.com — setup

Cinematic, dark-green, CMS-driven portfolio. Next.js (App Router) · Supabase · Vercel.

## 1. Install & run

```bash
npm install
npm run dev          # http://localhost:3000
```

The site is **fallback-first**: it renders the full signed-off copy from code
even before Supabase is set up. Content switches to the CMS automatically once
the database is provisioned and seeded.

## 2. Environment

Copy `.env.example` → `.env.local` and fill it in (already done for local dev).

| Var | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | client + server | canonical origin |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | safe to expose |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | never `NEXT_PUBLIC_`, never in the client bundle |

> **Security:** the service-role key was shared in plaintext during setup —
> **rotate it in Supabase → Settings → API before launch**, then set the fresh
> value in Vercel. `.env.local` is git-ignored; only `.env.example` is committed.

## 3. Provision the database — ✅ done

The schema is applied (migrations [`0001_init.sql`](supabase/migrations/0001_init.sql)
+ [`0002_admin_users.sql`](supabase/migrations/0002_admin_users.sql), run via the
Management API) and the CMS content is seeded. To re-seed content later (idempotent):

```bash
npm run seed   # content_blocks, case_studies, services, faqs, blog_posts, media, site_settings, demo testimonials
```

## 3b. Admin access (/admin) — ✅ provisioned

The CMS lives at `/admin` behind **Supabase Auth**. The single super-admin exists:

- **Email:** `admin@mohammademmon.com` · **username:** `mohammademmon` ·
  **role:** `super_admin` (in `admin_users`, email-confirmed).
- `/admin/*` requires an authenticated session **and** `role = super_admin`;
  anyone else is refused.
- **Sign in at `/admin/login` and change the temporary password immediately**
  (Supabase has no force-change flag). The one-time seed script has been deleted.
- To rotate later: Supabase → Authentication → Users → reset password. To add
  another admin: create the Auth user, then insert their id into `admin_users`
  with `role = 'super_admin'` (service role / SQL).

Inside, you can edit every page's copy + SEO (**Pages**), manage **Case Studies
/ Projects / Blog / Testimonials / Services / FAQs**, upload to the **Media**
library, read **Leads / Audit Requests** (CSV export), and change **Site
Settings** — all publishing to the live site within minutes (ISR), no redeploy.

## 4. Deploy (Vercel)

- Import the repo, set the four env vars above (use the **rotated** service key).
- Set the custom domain `sefathossain.com`.
- `next build` runs on deploy; content routes are SSR/ISR and revalidate on
  publish.

Image uploads from `/admin` go to the Supabase Storage `media` bucket (public
read), and a row is recorded in the `media` library table — works on Vercel /
serverless.

## QA / launch checklist

- [x] `npm run build` clean · `npm run lint` clean · TypeScript passes.
- [x] **No service-role key in the client bundle** (audited `.next/static` — key,
      `service_role` literal, and env name all absent).
- [x] Reduced-motion: static reveals, no Lenis, no WebGL (poster only).
- [x] Mobile: WebGL gated off, static cinematic poster instead.
- [x] Content routes are static/SSG + ISR; 3D is `ssr:false` and never blocks paint.
- [ ] **After migration**, verify RLS from the SQL editor / anon key:
      `select * from leads;` as anon must return **0 rows / permission denied**;
      published content selects must succeed. (Design guarantees it — no anon
      policy exists on `leads` / `audit_requests` / `subscribers`.)
- [ ] Run Lighthouse on the deployed URL (target perf/SEO/a11y ≥ 90).

## Security posture (this is a security specialist's site)

- **RLS on** for every table, even though the service key bypasses it — defense
  in depth.
- Anon can `SELECT` only published content. `leads`, `audit_requests`,
  `subscribers` have **no anon policy at all** — no public read, ever. Form
  submissions insert through server route handlers using the service key.
- No secret in the repo; no service key in any client component or
  `NEXT_PUBLIC_` var.

## Real assets still needed (drop in via /admin — never generated/mocked)

Logo (SVG/PNG) · professional photo · CV/résumé file · **live URLs or
screenshots of the Elementor build and Shopify store** (the only showable
proof) · real client testimonials. Until then, honest fallbacks stand in.

## Source of truth

Signed-off brand docs live in [`brand-source/`](brand-source/). Site copy is
verbatim from the Website Copy doc; nothing is invented as fact.
```
