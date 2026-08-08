# sefathossain.com — Project Handoff

Everything needed to own, run, and deploy the website.

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase (Postgres + Auth + Storage)
- **What's included:** full source code, the database (`supabase/database.sql` = schema + all content), and this guide.
- **What's NOT included (on purpose):** secret keys, `node_modules`, the build folder. You'll add your own keys (below).

---

## The two ways to take this over

### Option A — Keep the existing Supabase + hosting (easiest, nothing to migrate)
The site is already live with a working database, storage, and deployment. The simplest handoff is to **transfer ownership** of the existing accounts to you, or be added to them:
- **Supabase:** the current project already has all the schema, content, and uploaded images. Ask the developer to add you as a member (Supabase → Project → Settings → Team) or transfer the project.
- **Hosting (Vercel):** ask to be added to / transferred the project so deploys and the domain keep working.

With Option A you do **not** need to run `database.sql` — everything already exists. Just get the env keys and you're set.

### Option B — Fresh setup from this package (full independence)
Create your own Supabase + hosting and import the database from this package. Steps below.

---

## Option B — Step-by-step

### 1. Install
Requires **Node.js 20+**.
```bash
npm install
```

### 2. Create a Supabase project
1. Go to https://supabase.com → new project (pick a region near your audience).
2. Open **SQL Editor** → paste the entire contents of **`supabase/database.sql`** → Run.
   This creates every table, security policy, and loads all the current site content.
   *(Do NOT run `npm run seed` — the content is already in that SQL.)*
3. **Settings → API** → copy: **Project URL**, **anon key**, and **service_role key**.

### 3. Environment variables
Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...(anon key)
SUPABASE_SERVICE_ROLE_KEY=...(service_role key — server only, keep secret)
RESEND_API_KEY=...(for contact-form emails — see step 6)
```

### 4. Create your admin login
The admin panel lives at **`/admin`**. Create your account:
1. Supabase → **Authentication → Users → Add user** → your email + a password, and tick **Auto Confirm**.
2. Copy that new user's **UID**.
3. SQL Editor → run (replace the UID + email):
   ```sql
   insert into public.admin_users (id, email, username, role, status)
   values ('PASTE-THE-UID', 'you@email.com', 'Your Name', 'super_admin', 'active');
   ```
Now sign in at `/admin/login`.

### 5. Run it
```bash
npm run dev      # local at http://localhost:3000
npm run build    # production build
```

### 6. Contact-form email (Resend)
Emails are sent via Resend. In the current setup the domain `sefathossain.com` is verified there.
- Create a free account at https://resend.com, verify **your** domain, and put the API key in `RESEND_API_KEY`.
- Set who receives submissions in **/admin → Site Settings → “Form submissions email.”**
- The sender address is `notifications@sefathossain.com` in `src/lib/notify.ts` — change it to an address on your verified domain.
- Every submission is always saved under **/admin → Leads / Audit Requests**, regardless of email.

### 7. Images (Storage) — important for Option B
A few images (the navbar logo, and anything uploaded via **/admin → Media**) live in the **old** Supabase project's Storage, so their URLs won't work on a brand-new project. After importing:
- Re-upload them in **/admin → Media**, then reselect the logo in **Site Settings** and any affected images.
- Photos that live in **`/public/images/…`** ship with the code and work automatically — only Storage-hosted uploads need re-uploading.

### 8. Deploy
Host anywhere that runs Node (Vercel is easiest — the current setup uses it):
1. Import the repo / upload the project.
2. Add the same environment variables from step 3.
3. Deploy, then point your domain's DNS at the host.
4. In **Supabase → Authentication → URL Configuration**, set the Site URL and add a redirect like `https://your-domain.com/**` so admin login works.

---

## Where things live (quick map)
- **Pages/content:** `/admin → Pages` (each page's text, SEO, per-text size/color, hero icon).
- **Blog, Case Studies, Testimonials, Services, FAQs:** their own sections in `/admin`.
- **Global look (brand colors + text sizes):** `/admin → Appearance`.
- **Logo, favicon, social links, form-recipient email:** `/admin → Site Settings`.
- **Team / admin users & roles:** `/admin → Team`.
- **Code:** page components in `src/app/(public)/…` and `src/components/…`; CMS defaults in `src/lib/cms/defaults/…`; database schema in `supabase/migrations/…`.

## Security notes
- Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- If any key was ever shared in plain text, rotate it in Supabase and update the host's env vars.
