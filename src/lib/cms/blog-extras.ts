import { SERVICE_PAGES, type ServiceNavItem } from "@/lib/services-nav";

/**
 * Per-post "key takeaways" keyed by slug. Rendered as a checklist box near the
 * top of each article (skimmable + strong for AI answer engines). Kept in code,
 * keyed by slug, so it renders regardless of where the post body comes from.
 * Add an entry when you publish a new post (or leave it out — the box only shows
 * when takeaways exist).
 */
export const keyTakeawaysBySlug: Record<string, string[]> = {
  "wordpress-site-hacked": [
    "First 15 minutes: back up the hacked site as-is, then put it in maintenance mode if it is harming visitors.",
    "Change every password (WordPress admins, hosting, database, FTP/SFTP) and regenerate the security keys in wp-config.php.",
    "Cleaning a hacked WordPress site means files AND database: injected code, rogue admin users and backdoors.",
    "Find and close the entry point (usually an outdated plugin or a stolen password), or the hack comes back.",
    "After cleanup, request a review in Google Search Console to remove any security warning.",
  ],
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

export type BlogFaq = { question: string; answer: string };

/**
 * Per-post "People also ask" follow-up questions, keyed by slug. Rendered as an
 * accordion at the foot of the article and emitted as FAQPage JSON-LD, so the
 * post is eligible for FAQ rich results and gets cited by AI answer engines.
 * Kept in code as a fallback; a post's own `faqs` field (from /admin) overrides
 * this when set.
 */
export const faqsBySlug: Record<string, BlogFaq[]> = {
  // Questions mirror the real Search Console queries this post ranks for
  // ("my wordpress has been hacked", "hacked wordpress site", …).
  "wordpress-site-hacked": [
    {
      question: "My WordPress site has been hacked. What is the very first thing to do?",
      answer:
        "Take a full backup of the site exactly as it is (files and database), so nothing is lost and the evidence is preserved. Then change your WordPress, hosting and database passwords. Don't start deleting files at random — that is how backdoors get missed.",
    },
    {
      question: "How do I clean a hacked WordPress site?",
      answer:
        "Scan files and the database, replace WordPress core with fresh copies, remove injected code and unknown admin users, reinstall plugins and themes from official sources, and regenerate the security keys. Then find how the attacker got in and close it. The step-by-step checklist above covers each stage.",
    },
    {
      question: "Why does my WordPress site keep getting hacked again?",
      answer:
        "Almost always because a backdoor was left behind or the original entry point was never closed — an outdated or nulled plugin, a reused password, or a vulnerable theme. Cleaning only the visible symptoms lets the attacker walk straight back in.",
    },
    {
      question: "How much does it cost to fix a hacked WordPress site?",
      answer:
        "In the US, simple cleanups typically cost about $100–300, deeper infections $300–800, and severe or repeated compromises $800–2,500+. See the WordPress malware removal cost guide for what drives the price.",
    },
    {
      question: "Will my hosting company fix a hacked WordPress site?",
      answer:
        "Most hosts will detect malware and may suspend the account, but few do a full cleanup and root-cause fix. They usually ask you to clean the site yourself or hire someone, then confirm it is clean before reactivating it.",
    },
  ],
  "what-to-do-when-your-wordpress-site-is-hacked": [
    {
      question: "Should I delete my WordPress files if my site is hacked?",
      answer:
        "No — not at random. Deleting files blindly destroys the evidence you need to find how the attacker got in, and you can easily break the site or lose data. Back up the hacked site first, then clean methodically once you've found the entry point.",
    },
    {
      question: "Can I remove the hack myself, or do I need a professional?",
      answer:
        "A simple, freshly-caught infection can sometimes be cleaned with a reputable scanner and manual review. But if there are multiple sites, hidden backdoors, or the hack keeps returning, a professional cleanup is worth it — the cost of a reinfection is almost always higher.",
    },
    {
      question: "How long does it take to clean a hacked WordPress site?",
      answer:
        "Most straightforward cleanups take a few hours to a day. Complex infections across many files or several sites can take longer. Emergency turnaround is usually possible when the site is actively harming visitors or blacklisted.",
    },
    {
      question: "Will Google remove its warning after I clean the site?",
      answer:
        "Yes, once the site is genuinely clean you request a review in Google Search Console. If the malware is fully removed, the warning typically clears within a day or two — but requesting a review before the site is clean just fails and wastes time.",
    },
  ],
  "5-signs-your-website-has-malware": [
    {
      question: "Why does malware only show on mobile or from Google?",
      answer:
        "Attackers cloak their code so it only triggers for specific visitors — often mobile users or people arriving from search — to stay hidden from the site owner, who usually visits directly on desktop. That's why a redirect you can't reproduce is still very real.",
    },
    {
      question: "Can malware exist even if my site looks completely normal?",
      answer:
        "Yes. Backdoors, spam pages, and SEO injections are designed to stay invisible to you while abusing your site in the background. A clean-looking homepage is not proof of a clean site — a proper scan is.",
    },
    {
      question: "Is a free online scanner enough to confirm malware?",
      answer:
        "Free remote scanners only see what's publicly visible, so they miss server-side backdoors and hidden files. They're a useful first check, but a clean result doesn't guarantee the site is safe — a server-level scan is more reliable.",
    },
    {
      question: "What should I do the moment I spot a sign of malware?",
      answer:
        "Take a full backup first, don't start deleting things at random, change your passwords, and run a thorough scan. If two or more warning signs appear together, treat it as a confirmed compromise and get it cleaned properly.",
    },
  ],
  "why-your-website-is-slow-and-how-to-fix-it": [
    {
      question: "What's the single biggest cause of a slow WordPress site?",
      answer:
        "Oversized, uncompressed images are almost always the biggest culprit. Serving a 3MB photo where a 150KB one would do slows every page load — resizing and compressing images is usually the fastest win.",
    },
    {
      question: "Does adding more plugins slow down my site?",
      answer:
        "It can. It's less about the number and more about what each plugin loads on every page. A few heavy or poorly-built plugins can add far more weight than a dozen lightweight ones — audit what actually runs on the front end.",
    },
    {
      question: "Will a caching plugin fix my speed problems?",
      answer:
        "Caching helps a lot because the server stops rebuilding each page from scratch, but it's not a cure-all. If your images are huge or your hosting is weak, caching only masks the problem — fix the root causes too.",
    },
    {
      question: "How do I know if my hosting is the bottleneck?",
      answer:
        "If your server response time (TTFB) is high even on a cached, lightweight page, the hosting is likely the limit. Cheap shared hosting often can't keep up — moving to better hosting can transform performance.",
    },
  ],
  "how-much-does-it-cost-to-remove-malware-from-a-wordpress-site": [
    {
      question: "Why do malware removal prices vary so much?",
      answer:
        "Price tracks scope: how many sites are infected, how deep the infection goes, how urgent it is, and whether hardening and blacklist removal are included. A quick single-site cleanup is far cheaper than untangling a multi-site reinfection.",
    },
    {
      question: "Is the cheapest malware removal service a good idea?",
      answer:
        "Usually not. A bargain cleanup that removes the visible symptoms but skips the entry point tends to reinfect, so you pay twice. Look for a fixed quote that includes finding the root cause and hardening the site afterward.",
    },
    {
      question: "Are cleanups charged as a fixed price or hourly?",
      answer:
        "Most reputable providers quote a fixed price once they understand the scope, so you're not exposed to an open-ended hourly bill. The scope is confirmed up front from a quick assessment of the site.",
    },
    {
      question: "Does the price include stopping it from happening again?",
      answer:
        "It should. A complete job includes hardening — updates, strong logins, a firewall, and removing whatever let the attacker in — so the fix holds. Cleanup without hardening is only half the work.",
    },
  ],
  "how-to-remove-deceptive-site-ahead-warning-wordpress": [
    {
      question: "Why is Google showing 'Deceptive site ahead' on my site?",
      answer:
        "Google Safe Browsing has flagged your site for something malicious it detected — usually injected malware, phishing content, or harmful redirects. The warning is a symptom; the real problem is on your site and has to be removed first.",
    },
    {
      question: "Can I just request a review to make the warning disappear?",
      answer:
        "No — if you request a review before the site is actually clean, Google re-scans, finds the problem still there, and the warning stays. You have to fully remove the malicious content first, then request the review.",
    },
    {
      question: "How long until the warning is removed after cleanup?",
      answer:
        "Once the site is genuinely clean and you submit a review request in Search Console, it typically clears within a day or two. If it doesn't, there's usually still malicious content hiding somewhere.",
    },
    {
      question: "How do I stop the warning from coming back?",
      answer:
        "Harden the site after cleanup: update everything, use strong logins, remove the backdoor that let them in, and add monitoring. The flag comes back when the underlying vulnerability is left open.",
    },
  ],
  "is-my-wordpress-site-hacked-how-to-check": [
    {
      question: "How can I check for a hack without any tools?",
      answer:
        "Open your site in an incognito window and on mobile data and watch for redirects, search your brand on Google for a 'this site may be hacked' label, review your WordPress admin users for accounts you don't recognize, and look for recently modified files. Two or more red flags means treat it as compromised.",
    },
    {
      question: "Does a Google Search Console alert mean I'm definitely hacked?",
      answer:
        "A security issue flagged in Search Console is a strong signal that Google detected something malicious. It's worth taking seriously and investigating immediately, even if the site looks fine to you.",
    },
    {
      question: "What if the scanner says my site is clean but I still see problems?",
      answer:
        "Remote scanners miss server-side backdoors and cloaked code, so a clean result isn't a guarantee. If you're still seeing redirects, spam, or warnings, a deeper server-level inspection is needed.",
    },
    {
      question: "What's the first thing to do if I confirm a hack?",
      answer:
        "Back up the site as-is, resist deleting files at random, change every password, and start a thorough cleanup that finds the entry point — not just the visible symptoms.",
    },
  ],
  "wordpress-security-checklist": [
    {
      question: "Why does malware keep coming back after I remove it?",
      answer:
        "Because removing what you can see doesn't close the door it came through. A hidden backdoor or an unpatched vulnerability will let an attacker back in even after the obvious infection is gone.",
    },
    {
      question: "Is a security plugin enough on its own?",
      answer:
        "A security plugin helps, but it's one layer, not the whole defense. Real protection combines updates, strong unique logins with two-factor, good hosting, off-site backups, and a firewall — a plugin alone can't compensate for weak passwords or outdated software.",
    },
    {
      question: "How often should WordPress actually be updated?",
      answer:
        "Apply security updates as soon as they're available — outdated core, themes, and plugins are the single most common way sites get hacked. Enable automatic updates for trusted components and check the rest at least weekly.",
    },
    {
      question: "Can I stop WordPress hacks without paying for ongoing monitoring?",
      answer:
        "You can dramatically reduce your risk with good hygiene — updates, strong logins, backups, and a firewall. Monitoring adds early warning so problems are caught fast, but the fundamentals do most of the work.",
    },
    {
      question: "What's the real difference between hardening and just installing a security plugin?",
      answer:
        "A plugin adds features on top of WordPress; hardening changes the underlying configuration — file permissions, login protection, disabled editors, blocked entry points — so there's less to attack in the first place. Together they're far stronger than either alone.",
    },
    {
      question: "How do I know a hack has actually been fully removed, not just hidden?",
      answer:
        "A proper cleanup verifies the entry point is closed, scans at the server level (not just remotely), checks for unknown admin users and backdoor files, and confirms the site is off any blacklists. If the reinfection stops and monitoring stays quiet, the removal held.",
    },
  ],
  "why-nulled-themes-and-plugins-get-you-hacked": [
    {
      question: "What exactly is a nulled theme or plugin?",
      answer:
        "It's a pirated copy of a premium theme or plugin, distributed for free with the license check stripped out. The problem is that the people cracking it very often inject malware into the files at the same time.",
    },
    {
      question: "Can't I just scan a nulled plugin before installing it?",
      answer:
        "Scanning helps but isn't reliable — the malicious code is often obfuscated and hidden in files you'd never inspect, and it can re-download itself later. The only safe assumption is that a nulled plugin is compromised.",
    },
    {
      question: "Why is not getting updates such a big deal?",
      answer:
        "Without a valid license you get no security patches, so you're frozen on a version with known vulnerabilities that attackers actively scan for. Even a 'clean' nulled plugin becomes a liability over time.",
    },
    {
      question: "Is buying the real license really cheaper in the end?",
      answer:
        "Almost always. A single cleanup, blacklist removal, or lost customer trust costs far more than the license you skipped — plus you get updates and support that keep the site safe going forward.",
    },
  ],
};

export function getBlogFaqs(slug: string): BlogFaq[] {
  return faqsBySlug[slug] ?? [];
}

/**
 * Most-relevant service page for each post (internal linking — the "Take it
 * further" card). Falls back to the flagship malware-removal service.
 */
export const relatedServiceBySlug: Record<string, string> = {
  "what-to-do-when-your-wordpress-site-is-hacked":
    "/services/hacked-wordpress-recovery",
  "5-signs-your-website-has-malware": "/services/wordpress-malware-removal",
  "why-your-website-is-slow-and-how-to-fix-it":
    "/services/website-speed-optimization",
  "how-much-does-it-cost-to-remove-malware-from-a-wordpress-site":
    "/services/wordpress-malware-removal-cost",
  "how-to-remove-deceptive-site-ahead-warning-wordpress":
    "/services/google-blacklist-removal",
  "is-my-wordpress-site-hacked-how-to-check":
    "/services/wordpress-security-audit",
  "wordpress-security-checklist": "/services/wordpress-security-hardening",
  "why-nulled-themes-and-plugins-get-you-hacked":
    "/services/wp-vcd-malware-removal",

  // Evergreen guides (Sep 2026)
  "wordpress-site-hacked": "/services/hacked-wordpress-recovery",
  "recover-hacked-wordpress-website": "/services/hacked-wordpress-recovery",
  "wordpress-malware-removal": "/services/wordpress-malware-removal",
  "check-wordpress-for-malware": "/services/wordpress-security-audit",
  "wordpress-backdoor-malware": "/services/wordpress-malware-removal",
  "wordpress-redirect-malware": "/services/wordpress-redirect-virus-removal",
  "remove-seo-spam-wordpress": "/services/japanese-keyword-hack-removal",
  "remove-google-security-warning-wordpress":
    "/services/google-blacklist-removal",
  "secure-wordpress-after-malware-removal":
    "/services/wordpress-security-hardening",
  "wordpress-security-hardening-checklist":
    "/services/wordpress-security-hardening",

  // USA batch (daily drip, Oct 2026)
  "how-to-remove-malware-from-wordpress": "/services/wordpress-malware-removal",
  "how-to-find-and-remove-a-wordpress-backdoor":
    "/services/wordpress-malware-removal",
  "how-to-remove-the-japanese-keyword-hack":
    "/services/japanese-keyword-hack-removal",
  "how-to-remove-the-pharma-hack": "/services/pharma-hack-removal",
  "how-to-fix-a-wordpress-redirect-hack":
    "/services/wordpress-redirect-virus-removal",
  "how-to-remove-wp-vcd-malware": "/services/wp-vcd-malware-removal",
  "how-to-clean-a-hacked-wordpress-database":
    "/services/hacked-wordpress-recovery",
  "how-to-remove-hacked-spam-pages-from-google":
    "/services/japanese-keyword-hack-removal",
  "how-to-request-a-google-security-review":
    "/services/google-blacklist-removal",
  "website-suspended-by-host-how-to-recover":
    "/services/website-suspended-by-host-recovery",
  "how-to-scan-wordpress-for-malware": "/services/wordpress-security-audit",
  "how-to-secure-your-wordpress-login": "/services/wordpress-security-hardening",
  "how-to-set-up-two-factor-authentication-wordpress":
    "/services/wordpress-security-hardening",
  "how-to-stop-brute-force-attacks-wordpress": "/services/cloudflare-security",
  "best-wordpress-security-plugins": "/services/wordpress-security-hardening",
  "do-you-need-a-web-application-firewall": "/services/cloudflare-security",
  "how-to-set-up-cloudflare-for-wordpress": "/services/cloudflare-security",
  "how-to-back-up-a-wordpress-site": "/services/wordpress-maintenance",
  "how-to-update-wordpress-without-breaking-your-site":
    "/services/wordpress-maintenance",
  "how-to-tell-if-a-wordpress-plugin-is-safe":
    "/services/wordpress-security-audit",
  "how-to-secure-a-woocommerce-store": "/services/woocommerce-malware-removal",
  "how-to-remove-a-credit-card-skimmer-woocommerce":
    "/services/woocommerce-malware-removal",
  "wordpress-security-for-small-business":
    "/services/wordpress-security-hardening",
  "how-much-does-wordpress-maintenance-cost":
    "/services/wordpress-maintenance",
  "how-to-recover-seo-rankings-after-a-hack":
    "/services/google-blacklist-removal",
  "what-to-do-after-cleaning-a-hacked-wordpress-site":
    "/services/wordpress-security-hardening",
  "how-to-fix-mixed-content-warnings-wordpress":
    "/services/wordpress-security-audit",
  "how-to-choose-secure-wordpress-hosting":
    "/services/website-suspended-by-host-recovery",
  "why-wordpress-sites-get-hacked": "/services/hacked-wordpress-recovery",
  // Cost & how-to batch (twice weekly, 9 Nov – 3 Dec 2026)
  "how-much-does-it-cost-to-fix-a-hacked-website":
    "/services/wordpress-malware-removal-cost",
  "how-much-does-a-website-redesign-cost": "/services/website-redesign",
  "shopify-store-setup-cost": "/services/shopify-store-development",
  "how-much-does-a-shopify-developer-cost":
    "/services/shopify-store-development",
  "error-establishing-a-database-connection-wordpress":
    "/services/wordpress-maintenance",
  "hacked-website-rebuild-or-clean": "/services/hacked-wordpress-recovery",
  "migrate-wix-squarespace-to-wordpress-without-losing-seo":
    "/services/wordpress-website-development",
  "what-is-included-in-a-wordpress-security-audit":
    "/services/wordpress-security-audit",
  // Web-development cluster (drip from 31 Oct 2026)
  "wordpress-vs-shopify-for-small-business":
    "/services/wordpress-website-development",
  "how-to-choose-a-wordpress-developer":
    "/services/wordpress-website-development",
  "nextjs-vs-wordpress": "/services/custom-web-development",
  "website-redesign-checklist-seo": "/services/website-redesign",
  "woocommerce-vs-shopify": "/services/woocommerce-development",
  "is-elementor-good-for-seo-and-speed": "/services/elementor-website-design",
  "do-i-need-ongoing-wordpress-security-monitoring":
    "/services/wordpress-maintenance",
};

/** The related ServiceNavItem for a post (defaults to malware removal). */
export function getRelatedService(slug: string): ServiceNavItem {
  const path =
    relatedServiceBySlug[slug] ?? "/services/wordpress-malware-removal";
  return (
    SERVICE_PAGES.find((s) => s.path === path) ??
    SERVICE_PAGES.find((s) => s.path === "/services/wordpress-malware-removal") ??
    SERVICE_PAGES[0]
  );
}

/**
 * Pick the most relevant published case study for a post: match the post's
 * topic to a case-study category (performance vs. security), preferring a
 * featured one, then fall back to any published case study.
 */
export function pickRelatedCaseStudy<
  T extends {
    category?: string;
    featured?: boolean;
    status?: string | null;
  },
>(caseStudies: T[], slug: string): T | null {
  const published = caseStudies.filter(
    (c) => (c.status ?? "published") === "published",
  );
  if (!published.length) return null;

  const wantsPerformance = /slow|fast|speed|performance/.test(slug);
  const targetCategory = wantsPerformance ? "performance" : "security";

  const inCategory = published.filter((c) => c.category === targetCategory);
  const pool = inCategory.length ? inCategory : published;

  return pool.find((c) => c.featured) ?? pool[0];
}
