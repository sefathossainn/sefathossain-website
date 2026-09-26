/**
 * Per-post "key takeaways" keyed by slug. Rendered as a checklist box near the
 * top of each article (skimmable + strong for AI answer engines). Kept in code,
 * keyed by slug, so it renders regardless of where the post body comes from.
 * Add an entry when you publish a new post (or leave it out — the box only shows
 * when takeaways exist).
 */
export const keyTakeawaysBySlug: Record<string, string[]> = {
  "what-to-do-when-your-wordpress-site-is-hacked": [
    "Don't panic-delete — random deletions destroy the evidence you need to find how they got in.",
    "Back up the hacked site first, then take it offline if it's harming visitors.",
    "Change every password (WordPress, hosting, database, FTP) and rotate your security keys.",
    "Find the entry point before you clean, or the attacker simply walks back in.",
  ],
  "5-signs-your-website-has-malware": [
    "Unexpected redirects — often only on mobile or from Google — are a top warning sign.",
    "A Google warning or blacklist means a search engine has already flagged you.",
    "Unknown admin accounts and random files are classic backdoor signatures.",
    "Two or more signs together mean it's time for a full scan.",
  ],
  "why-your-website-is-slow-and-how-to-fix-it": [
    "Oversized images are almost always the single biggest cause of a slow site.",
    "Without caching, the server rebuilds every page from scratch on each visit.",
    "Plugin bloat and render-blocking CSS/JS quietly pile up over time.",
    "Measure against Core Web Vitals, fix the biggest offenders, then re-test on mobile.",
  ],
  "how-much-does-it-cost-to-remove-malware-from-a-wordpress-site": [
    "Typical US ranges: $100–300 simple, $300–800 deeper, $800–2,500+ complex.",
    "Price is driven by scope — how many sites, how deep the infection, how urgent.",
    "The cheapest fix that skips the entry point usually costs you twice.",
    "Most reputable cleanups are quoted as a fixed price once the scope is clear.",
  ],
  "how-to-remove-deceptive-site-ahead-warning-wordpress": [
    "The warning comes from Google Safe Browsing — it's a symptom, not the disease.",
    "It usually means injected malware, phishing, or malicious redirects on your site.",
    "Clean the site fully before requesting a review, or the review fails.",
    "Harden afterward so the flag doesn't come back next month.",
  ],
  "is-my-wordpress-site-hacked-how-to-check": [
    "Check for redirects in an incognito window and on mobile data.",
    "Look for a Google “this site may be hacked” label and Search Console security issues.",
    "Review your admin users and any recently modified files.",
    "Two or more signs → back up, don't delete at random, and scan thoroughly.",
  ],
  "wordpress-security-checklist": [
    "Keep core, themes, and plugins updated — outdated software is the #1 way in.",
    "Use strong, unique passwords with two-factor login, and limit login attempts.",
    "Keep working, off-site backups and never use nulled themes or plugins.",
    "Add a firewall and monitoring so problems get caught early.",
  ],
  "why-nulled-themes-and-plugins-get-you-hacked": [
    "Nulled (pirated) plugins and themes usually ship with malware already inside.",
    "The infection hides in files you'd never inspect and often reinfects on update.",
    "You get no security updates, so you're frozen on a vulnerable version.",
    "A cleanup, blacklist, or lost trust costs far more than the license you skipped.",
  ],
};

export function getKeyTakeaways(slug: string): string[] {
  return keyTakeawaysBySlug[slug] ?? [];
}
