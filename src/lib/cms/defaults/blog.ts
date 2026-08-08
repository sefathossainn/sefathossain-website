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
];
