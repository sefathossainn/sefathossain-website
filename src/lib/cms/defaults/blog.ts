import type { BlogPost } from "@/lib/cms/types";
import { seedAssets } from "@/lib/cms/defaults/media";

/**
 * Starter posts — the topics the Copy doc suggests Sefat could own. Plain,
 * useful, no fear-selling. Educational content (no client claims), fully
 * editable in /admin. Seeded as published so the blog isn't empty at launch.
 */
export const defaultPosts: BlogPost[] = [
  {
    slug: "what-to-do-when-your-wordpress-site-is-hacked",
    title: "What to do the moment your WordPress site is hacked",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Malware", "Recovery"],
    status: "published",
    published_at: "2026-06-24T09:00:00.000Z",
    reading_minutes: 5,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "A calm, step-by-step checklist for the first hour after you discover your site has been compromised — what to do, and what not to.",
    seo: {
      title: "What to do the moment your WordPress site is hacked",
      description:
        "A calm, step-by-step checklist for the first hour after your WordPress site is compromised — what to do, and what to avoid.",
    },
    body: `<p>Discovering your website has been hacked is a stomach-drop moment. The instinct is to start deleting things and hope it goes away. Don't. The first hour matters, and a few calm, deliberate steps will save you from making it worse.</p>
<h2>1. Don't panic-delete</h2>
<p>Deleting files at random destroys the evidence you need to understand how the attacker got in. If you clean without finding the entry point, they walk straight back in a week later. Slow down.</p>
<h2>2. Take a full backup first — even of the hacked site</h2>
<p>Snapshot everything as it is: files and database. A compromised backup is still forensically useful, and it means nothing is lost while you work.</p>
<h2>3. Put the site into maintenance mode</h2>
<p>If the site is defaced, redirecting visitors to spam, or serving malware, take it offline for visitors while you work. Protecting the people who trust your site comes first.</p>
<h2>4. Change every password and rotate keys</h2>
<p>WordPress admin, hosting, database, FTP/SFTP, and any connected email. Assume credentials are compromised. While you're there, regenerate your WordPress security keys (salts).</p>
<h2>5. Find the entry point before you clean</h2>
<p>Most hacks come in through an outdated plugin or theme, a weak password, or a known vulnerability. Identify the door before you sweep the floor — otherwise you're just tidying up for the next visit.</p>
<h2>6. Clean thoroughly, then harden</h2>
<p>Remove the malware, injected code, and any hidden backdoors, replace core files with clean versions, and then close the vulnerabilities so recovery doesn't just return you to where you started.</p>
<h2>When to call for help</h2>
<p>If you're seeing a Google “this site may be harmful” warning, a full defacement, or you simply can't find the source, that's the moment to bring in someone who has done this before. Recovery is methodical work, and a calm second pair of hands is often the fastest route back online.</p>`,
  },
  {
    slug: "5-signs-your-website-has-malware",
    title: "5 signs your website has malware",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Malware"],
    status: "published",
    published_at: "2026-06-17T09:00:00.000Z",
    reading_minutes: 4,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "Malware doesn't always announce itself. Here are the quiet signals that something's wrong under the hood — before your visitors notice.",
    seo: {
      title: "5 signs your website has malware",
      description:
        "Malware often hides. Here are five quiet signals that your WordPress site may be compromised — spot them before your visitors do.",
    },
    body: `<p>The worst malware is the quiet kind. It doesn't deface your homepage — it hides, redirects a fraction of your visitors, or sends spam in the background for months. Here are the signals worth watching for.</p>
<h2>1. Unexpected redirects</h2>
<p>Visitors — often only on mobile, or only from Google — get bounced to a site you've never heard of. This is one of the most common symptoms of a compromised WordPress install.</p>
<h2>2. A Google warning or a blacklist</h2>
<p>“This site may be harmful,” a red interstitial, or a sudden collapse in traffic usually means a search engine has flagged you. It's a signal, not the disease — but it needs handling quickly.</p>
<h2>3. New admin users or files you didn't create</h2>
<p>An unfamiliar administrator account, or files with random names in your uploads folder, are classic backdoor signatures. Attackers leave themselves a way back in.</p>
<h2>4. Your host suspends the account or flags spam</h2>
<p>If your hosting provider emails you about outbound spam or unusual resource usage, take it seriously. A compromised site is often quietly used to send email or attack others.</p>
<h2>5. Strange behaviour in search results</h2>
<p>Search listings showing pages you never published — often in another language, selling products you don't sell — mean someone has injected content to piggyback on your rankings.</p>
<h2>If two or more of these ring true</h2>
<p>Don't wait for it to get worse. A proper scan across core files, themes, plugins, and the database will tell you exactly what's there — and a free audit is a low-stakes way to find out where you stand.</p>`,
  },
  {
    slug: "why-your-website-is-slow-and-how-to-fix-it",
    title: "Why your website is slow (and how to fix it)",
    author: "Sefat Hossain",
    category: "Performance",
    tags: ["Performance", "Core Web Vitals", "Speed"],
    status: "published",
    published_at: "2026-06-10T09:00:00.000Z",
    reading_minutes: 6,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "Speed isn't a vanity metric — it's ranking, conversions, and wasted ad spend. Here's what actually makes sites slow, and the fixes that move the needle.",
    seo: {
      title: "Why your website is slow (and how to fix it)",
      description:
        "The real causes of a slow WordPress site — and the practical fixes that improve Core Web Vitals, ranking, and conversions.",
    },
    body: `<p>A slow site frustrates visitors, gets ranked lower by Google, and turns paid traffic into wasted spend. The good news: most slowness comes from a short list of causes, and each has a well-understood fix.</p>
<h2>Images are almost always the biggest culprit</h2>
<p>Uploading a 4000px photo and letting the browser shrink it means every visitor downloads a huge file for a small space. Compress, size correctly, serve modern formats (WebP/AVIF), and lazy-load anything below the fold.</p>
<h2>No caching means every visit does the same work twice</h2>
<p>Without page and browser caching, your server rebuilds each page from scratch on every request. Proper caching lets browsers and the server do far less work, and the difference is immediate.</p>
<h2>Plugin bloat adds up quietly</h2>
<p>Every plugin adds code that loads on the page. Over the years, sites accumulate plugins nobody uses. Auditing and removing the dead weight — and the scripts they load — is often the single biggest win.</p>
<h2>Render-blocking CSS and JavaScript</h2>
<p>Large, unminified stylesheets and scripts block the page from painting. Minifying them, and deferring what isn't needed for the first view, gets content on screen faster.</p>
<h2>Distance from your visitors</h2>
<p>If your server is in one country and your visitors are worldwide, a CDN caches your site closer to them so it loads quickly regardless of where they are.</p>
<h2>Measure, fix, then measure again</h2>
<p>Guessing wastes time. Run a real audit against Core Web Vitals, fix the biggest offenders first, and re-test on both desktop and mobile — not just on a fast developer connection. Speed you can measure is speed you can defend.</p>`,
  },
  {
    slug: "how-much-does-it-cost-to-remove-malware-from-a-wordpress-site",
    title: "How much does it cost to remove malware from a WordPress site?",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Malware", "Pricing"],
    status: "published",
    published_at: "2026-09-16T09:00:00.000Z",
    reading_minutes: 6,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "A plain-English breakdown of what WordPress malware removal actually costs in the US — the typical ranges, what moves the price, and how to avoid paying twice.",
    seo: {
      title: "How much does WordPress malware removal cost? (US pricing)",
      description:
        "What WordPress malware removal costs in the US — typical ranges from $100–300 to $800–2,500+, what drives the price, and how to avoid paying for it twice.",
      focus_keyword: "wordpress malware removal cost",
    },
    body: `<p>If your WordPress site has been hacked, one of the first questions is a practical one: what is this going to cost me? The honest answer is that it depends on the scope — but the ranges are predictable enough to plan around.</p>
<h2>The typical ranges</h2>
<p>For most US website owners, malware removal falls into three bands. A simple, recent infection on a single site usually runs <strong>$100–300</strong>. A deeper compromise — hidden backdoors, spam injection, or a Google blacklist warning that needs a review request — tends to land at <strong>$300–800</strong>. Complex or business-critical cases, such as WooCommerce stores, multisite networks, or repeated reinfections, are typically <strong>$800–2,500 or more</strong>.</p>
<h2>What actually moves the price</h2>
<p>The number isn't arbitrary. It's driven by how many sites are affected, how deep the infection goes (files only, or files plus the database), whether backdoors have been left for re-entry, whether Google or your host has already flagged the site, and how urgently it needs to be back online.</p>
<h2>Why the cheapest option can cost the most</h2>
<p>A common mistake is paying for a quick file cleanup that never finds the entry point. The malware comes back within days, and now you're paying a second time. A proper cleanup identifies how the attacker got in and closes that door — that's the part that makes the price worth it.</p>
<h2>Flat fee or hourly?</h2>
<p>Most reputable cleanups are quoted as a fixed price once the scope is clear, so you know the cost up front instead of watching an hourly meter climb. Be cautious of anyone quoting a firm number before they've looked at the actual compromise.</p>
<h2>Getting an accurate quote</h2>
<p>The only way to know your exact cost is a quick assessment of what's actually going on. If you want a real number for your situation, a free assessment is the low-stakes way to get one before committing to anything.</p>`,
  },
  {
    slug: "how-to-remove-deceptive-site-ahead-warning-wordpress",
    title: "How to remove the “Deceptive site ahead” warning on WordPress",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Google", "Blacklist", "Malware"],
    status: "published",
    published_at: "2026-09-09T09:00:00.000Z",
    reading_minutes: 6,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "That red full-screen warning in Chrome is costing you visitors by the minute. Here's what it means, why it appears, and the steps to get your WordPress site cleared.",
    seo: {
      title: "Remove the “Deceptive site ahead” warning on WordPress",
      description:
        "Why Chrome shows “Deceptive site ahead” on your WordPress site, what it means for your traffic, and the exact steps to clean up and request a review.",
      focus_keyword: "deceptive site ahead warning",
    },
    body: `<p>Few things drop a website's traffic faster than a full-screen red “Deceptive site ahead” warning in Google Chrome. Visitors bounce instantly, and trust takes a hit. The good news: it's fixable, and understanding what it means is the first step.</p>
<h2>What the warning actually means</h2>
<p>The warning comes from Google Safe Browsing, which Chrome, Firefox, and Safari all use. It means Google has detected something on your site it considers harmful — usually injected malware, a phishing page, or malicious redirects. It's a symptom, not the disease.</p>
<h2>Why it's showing on your WordPress site</h2>
<p>The most common cause is a compromise: an outdated plugin or theme let an attacker inject code, and Google's crawler caught it. Sometimes it's a hacked page you can't even see, redirecting only certain visitors to spam or scam content.</p>
<h2>Step 1: Confirm and investigate</h2>
<p>Check Google Search Console under Security Issues — it often tells you which URLs are flagged. Then scan your WordPress core, themes, plugins, and database for malicious code. Don't skip this: clearing the warning without cleaning the site just gets you flagged again.</p>
<h2>Step 2: Clean thoroughly</h2>
<p>Remove the injected code, malicious files, and any hidden backdoors, and replace compromised core files with clean versions. Then find and close the entry point that let the attacker in.</p>
<h2>Step 3: Request a review</h2>
<p>Once the site is genuinely clean, request a review in Google Search Console. Reviews for deceptive-site flags are usually processed within a few days. If you submit before the site is clean, the review fails and the warning stays.</p>
<h2>Step 4: Harden so it doesn't return</h2>
<p>After the flag is lifted, harden the site — update everything, tighten access, and set up monitoring — so you're not back in the same position next month.</p>
<h2>When to get help</h2>
<p>If you can't find the source, the flag keeps returning, or the site is business-critical, bringing in someone who has cleared these warnings before is often the fastest way back to normal.</p>`,
  },
  {
    slug: "is-my-wordpress-site-hacked-how-to-check",
    title: "Is my WordPress site hacked? How to check",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Malware", "Security"],
    status: "published",
    published_at: "2026-09-02T09:00:00.000Z",
    reading_minutes: 5,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "Not sure if your site is compromised or just acting up? Here's a practical checklist to confirm — or rule out — a hack before you panic.",
    seo: {
      title: "Is my WordPress site hacked? How to check",
      description:
        "A practical checklist to confirm whether your WordPress site is hacked — the signs to look for, where to look, and what to do next.",
      focus_keyword: "is my wordpress site hacked",
    },
    body: `<p>Something feels off, but you're not sure whether your WordPress site has actually been hacked or is just misbehaving. Before you panic — or dismiss it — here's how to check properly.</p>
<h2>1. Look for redirects</h2>
<p>Open your site in an incognito window, and try it from your phone on mobile data. Attackers often redirect only certain visitors — mobile users, or people arriving from Google — so it can look fine to you while sending others to spam.</p>
<h2>2. Check for a Google warning</h2>
<p>Search your site name on Google and look for a “This site may be hacked” label under the result. Then open Google Search Console and check the Security Issues report — it's the most direct signal that Google has detected something.</p>
<h2>3. Review your users</h2>
<p>In WordPress under Users, look for administrator accounts you don't recognize. An unfamiliar admin is one of the clearest signs of a compromise — attackers create them to keep access.</p>
<h2>4. Look for files you didn't create</h2>
<p>Random-named PHP files in your uploads folder, or recently modified core files, are classic backdoor signatures. If you're comfortable with file access, check modification dates for anything that changed without your involvement.</p>
<h2>5. Watch for host or performance warnings</h2>
<p>Emails from your host about outbound spam or unusual resource usage, sudden slowdowns, or unexpected traffic spikes can all point to a site being quietly used by an attacker.</p>
<h2>If two or more of these ring true</h2>
<p>Treat it as a likely compromise. Take a full backup before touching anything, avoid deleting files at random, and run a thorough scan across core, themes, plugins, and the database. If you'd rather have a second pair of eyes, a free security audit will tell you exactly where you stand.</p>`,
  },
  {
    slug: "wordpress-security-checklist",
    title: "A practical WordPress security checklist",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Security", "Hardening"],
    status: "published",
    published_at: "2026-08-26T09:00:00.000Z",
    reading_minutes: 7,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "Most WordPress hacks exploit a short list of avoidable weaknesses. Here's a practical, plain-language checklist to close them before an attacker finds them.",
    seo: {
      title: "A practical WordPress security checklist",
      description:
        "A plain-language WordPress security checklist — the practical steps that close the weaknesses attackers actually exploit, from updates to logins to backups.",
      focus_keyword: "wordpress security checklist",
    },
    body: `<p>Most WordPress sites don't get hacked by some sophisticated, targeted attack. They get hacked through a short list of avoidable weaknesses — an outdated plugin, a weak password, no backups. Close those, and you've handled the overwhelming majority of the risk. Here's the checklist.</p>
<h2>1. Keep everything updated</h2>
<p>Core, themes, and plugins. Outdated software with known vulnerabilities is the single most common way in. If a plugin is abandoned and no longer updated, replace it — an unmaintained plugin is a liability waiting to be exploited.</p>
<h2>2. Remove what you don't use</h2>
<p>Every installed plugin and theme is attack surface, even when deactivated. Delete the ones you're not using. Fewer moving parts means fewer doors.</p>
<h2>3. Use strong, unique passwords — and 2FA</h2>
<p>Weak or reused admin passwords are a gift to attackers running automated login attempts. Use strong, unique passwords for WordPress, hosting, and database, and turn on two-factor authentication for admin accounts.</p>
<h2>4. Limit login attempts</h2>
<p>Brute-force attacks hammer your login page with guesses. Limiting failed attempts and adding basic login protection stops most of them cold.</p>
<h2>5. Audit your users</h2>
<p>Only give admin access to people who genuinely need it, and remove accounts that are no longer used. Every admin account is a potential entry point.</p>
<h2>6. Install a firewall</h2>
<p>A web application firewall filters malicious traffic before it reaches your site. It's one of the highest-value layers you can add, catching common attacks automatically.</p>
<h2>7. Back up — and test the backup</h2>
<p>Automated, off-site backups mean a compromise or a mistake is a recovery, not a catastrophe. A backup you've never tested restoring isn't really a backup — check that it works.</p>
<h2>8. Never use nulled themes or plugins</h2>
<p>Pirated “nulled” themes and plugins are one of the most reliable ways to get malware onto your site — the cracked software often has it bundled in. The cost saved is never worth it.</p>
<h2>9. Use HTTPS everywhere</h2>
<p>An SSL certificate encrypts traffic between your visitors and your site. It's standard, usually free, and expected by both browsers and search engines.</p>
<h2>10. Monitor for changes</h2>
<p>Scheduled malware scanning and file-change monitoring catch problems early — while they're small — instead of when a customer or Google tells you.</p>
<h2>Start where the risk is highest</h2>
<p>If you do nothing else today: update everything, set strong passwords with 2FA, and confirm you have working backups. Those three close most of the risk. If you'd like a second pair of eyes on where your site actually stands, a free security audit is a low-stakes way to find out.</p>`,
  },
  {
    slug: "why-nulled-themes-and-plugins-get-you-hacked",
    title: "Why nulled themes and plugins get you hacked",
    author: "Sefat Hossain",
    category: "Security",
    tags: ["WordPress", "Malware", "Nulled"],
    status: "published",
    published_at: "2026-08-19T09:00:00.000Z",
    reading_minutes: 5,
    featured_image: seedAssets.blogDefault,
    excerpt:
      "That “free” premium theme could be the most expensive thing on your site. Here's why nulled WordPress software is one of the most common ways sites get infected.",
    seo: {
      title: "Why nulled WordPress themes and plugins get you hacked",
      description:
        "Nulled (pirated) WordPress themes and plugins are a leading cause of infections. Here's how the malware gets in — and why the “free” version costs far more.",
      focus_keyword: "nulled wordpress themes",
    },
    body: `<p>It's tempting. A premium theme or plugin costs money; a “nulled” — pirated — copy is free. But nulled WordPress software is one of the most common ways sites get infected, and the savings almost never survive contact with reality.</p>
<h2>The malware is usually already inside</h2>
<p>When someone cracks a premium theme or plugin to distribute it for free, they're not doing it out of generosity. The cracked version very often has malware bundled directly into the code — backdoors, spam injectors, or self-replicating infections like wp-vcd — waiting to activate the moment you install it.</p>
<h2>It hides where you won't look</h2>
<p>The malicious code is buried in files you'd never inspect. Your site works, the theme looks right, and meanwhile there's a backdoor giving an attacker access, or a script quietly injecting spam and redirects that only Google and your visitors see.</p>
<h2>It keeps coming back</h2>
<p>Because the infection is baked into the theme or plugin itself, cleaning the visible symptoms doesn't fix it — reinstalling or updating the nulled software just reinfects the site. This is exactly how wp-vcd and similar infections persist: the source is the very software you installed.</p>
<h2>You get no updates — including security fixes</h2>
<p>Legitimate themes and plugins get security patches. Nulled copies don't. So even if a nulled plugin started clean, you're frozen on a version that will never receive the fix for the next vulnerability found in it.</p>
<h2>The real cost</h2>
<p>A cleanup, lost customer trust, a Google blacklist, a suspended hosting account — any one of these costs far more than the license you skipped. The “free” theme is routinely the most expensive thing on the site.</p>
<h2>What to do instead</h2>
<p>Buy from the official developer or a reputable marketplace, use well-reviewed free plugins from the WordPress repository, and if you already installed nulled software, treat the site as potentially compromised — replace the software with a legitimate version and have it checked. If you're not sure what's lurking, a free security audit will tell you where you stand.</p>`,
  },
];
