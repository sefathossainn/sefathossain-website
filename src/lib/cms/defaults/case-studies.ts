import type { CaseStudy } from "@/lib/cms/types";
import { seedAssets } from "@/lib/cms/defaults/media";

/**
 * Case studies — the showpiece. Narratives are in Sefat's voice from the Case
 * Studies doc (v1). The bracketed, unconfirmed specifics (exact symptoms,
 * client names, live URLs, before/after numbers) are OMITTED, not invented.
 * `metrics: []` everywhere until real figures are confirmed — the page renders
 * the qualitative outcome instead of a fabricated number (Brief §8).
 */
export const defaultCaseStudies: CaseStudy[] = [
  {
    slug: "malware-recovery",
    title: "Bringing a hacked business website back from the brink",
    tagline: "Complete WordPress malware removal & website recovery",
    category: "security",
    featured: true,
    sort_order: 1,
    status: "published",
    hero_image: seedAssets.caseMalware,
    metrics: [],
    situation:
      "<p>A business owner reached out in the worst possible state: their WordPress website — the front door to their business — had been compromised. Customers couldn't trust what they were seeing, and every hour the site stayed compromised was doing quiet damage to a reputation that took years to build.</p><p>By the time most owners find me, they've already tried the obvious things and made it worse. They're not looking for someone to panic with them. They're looking for someone calm who has seen this before.</p>",
    approach:
      "<p>Recovering a hacked site is methodical work, not guesswork. Rushing it is how you miss the backdoor that lets the attacker walk straight back in a week later. My process:</p><ul><li>Isolated the site and took a full forensic snapshot before touching anything, so nothing was lost and the damage could be understood.</li><li>Ran a complete malware scan across core files, themes, plugins, and the database to map every piece of malicious code — not just the obvious symptom.</li><li>Identified the entry point — the outdated plugin, weak credential, or vulnerability the attacker actually used — because cleaning without finding the door is temporary.</li><li>Removed all malware, injected code, and hidden backdoors, then replaced compromised core files with clean versions.</li><li>Submitted the site for review to lift any Google blacklist or “deceptive site” warning and restore its standing in search.</li><li>Hardened the essentials before handing it back, so recovery didn't just return the site to the same vulnerable state it started in.</li></ul>",
    outcome:
      "<p>The site was returned clean, delisted, and back online — but more importantly, the owner got their peace of mind back. That's the part that matters. A website isn't just files; for the person who owns it, it's their livelihood.</p>",
  },
  {
    slug: "security-hardening",
    title: "Turning an exposed business site into a locked front door",
    tagline: "WordPress security hardening for business websites",
    category: "security",
    featured: true,
    sort_order: 2,
    status: "published",
    hero_image: seedAssets.caseHardening,
    metrics: [],
    situation:
      "<p>A business came to me with a site that looked fine — it loaded, it worked, it made sales. What they didn't see was how exposed it was underneath. Nothing had gone wrong yet. That's exactly the moment most people ignore security — and exactly the moment it's cheapest to fix.</p><p>My belief drives this kind of work: launching a website is the beginning, not the finish line. A site that isn't protected isn't finished — it's just waiting.</p>",
    approach:
      "<p>I don't bolt on a security plugin and call it done. Hardening is a layered process, each layer closing a door an attacker would otherwise use:</p><ul><li>Audited the full attack surface — logins, user roles, plugins, themes, file permissions, and server configuration — to find what was actually exploitable.</li><li>Locked down access with strong authentication, brute-force protection, and limited login attempts, since credentials are the most common way in.</li><li>Installed and configured a proper firewall / web application firewall to filter malicious traffic before it reaches the site.</li><li>Brought the whole stack current — core, themes, and plugins — and removed the unused, abandoned ones that quietly become vulnerabilities.</li><li>Set up automated backups and scheduled malware scanning, so if anything ever does happen, recovery is a button, not a crisis.</li><li>Documented what was done in plain language, so the owner understands their own site instead of depending on blind trust.</li></ul>",
    outcome:
      "<p>The site went from silently exposed to actively protected and monitored — firewalled, backed up, updated, and watched. The owner stopped worrying about the thing they didn't previously know to worry about.</p><p>This is the work that never makes the news, because when it's done right, nothing happens. That's the whole point.</p>",
  },
  {
    slug: "elementor-business-website",
    title: "A premium business website that earns its first impression",
    tagline: "Premium Elementor business website development",
    category: "build",
    featured: true,
    sort_order: 3,
    status: "published",
    hero_image: null,
    metrics: [],
    situation:
      "<p>A business needed a website that matched the quality of what they actually offer. What they had — or what they'd been quoted elsewhere — was the usual: a generic template that looks like a thousand others and quietly tells visitors “this is a small operation.” For a business trying to win serious clients, that first impression is a cost.</p>",
    approach:
      "<ul><li>Started with the business goal, not the design — who the site needs to convince, and what action it needs to drive.</li><li>Designed and built in Elementor for a clean, premium, fully custom look — no cookie-cutter template, structured so the client can actually update it themselves later.</li><li>Built performance in from the start: optimized assets, clean structure, and fast load times, rather than treating speed as an afterthought.</li><li>Made it genuinely responsive across phone, tablet, and desktop — designed mobile-first, since that's where most visitors actually arrive.</li><li>Laid an SEO-ready foundation — proper structure, headings, and metadata — so the site could be found, not just admired.</li><li>Handed over with a walkthrough, so the client owns their site instead of being locked into needing a developer for every small change.</li></ul>",
    outcome:
      "<p>The result was a website the business could stand behind — premium, fast, easy to manage, and built to grow with them.</p>",
  },
  {
    slug: "shopify-store",
    title: "A Shopify store built to sell, not just to exist",
    tagline: "Shopify store design & customization",
    category: "build",
    featured: false,
    sort_order: 4,
    status: "published",
    hero_image: null,
    metrics: [],
    situation:
      "<p>An online store owner needed more than a default Shopify theme switched on. They needed a store that reflected their brand, made products easy to find, and gave shoppers a clear, trustworthy path to checkout — the difference between a store that gets visitors and one that gets orders.</p>",
    approach:
      "<ul><li>Set up and customized the Shopify theme to match the brand, rather than leaving it looking like every other store on the same template.</li><li>Structured products, collections, and navigation so customers find what they want in as few steps as possible.</li><li>Designed the storefront and product pages around conversion — clear imagery, obvious calls to action, and a checkout flow with no friction.</li><li>Configured the essentials properly: payments, shipping rules, and the right apps for the store's actual needs, without bloating it with plugins it doesn't use.</li><li>Optimized for speed and mobile, because a slow store on a phone is a lost sale.</li><li>Handed over a store the owner can run day to day — adding products and managing orders without needing a developer on call.</li></ul>",
    outcome:
      "<p>The owner launched with a store that looked professional, worked smoothly, and was theirs to manage.</p>",
  },
  {
    slug: "performance-optimization",
    title: "Making a slow website fast enough to keep its visitors",
    tagline: "Website performance optimization",
    category: "performance",
    featured: true,
    sort_order: 5,
    status: "published",
    hero_image: null,
    metrics: [],
    situation:
      "<p>A website was quietly losing people before they ever saw it. Speed isn't a vanity metric. A slow site frustrates visitors, gets ranked lower by Google, and turns paid traffic into wasted spend. The owner could feel the problem even before they could measure it.</p>",
    approach:
      "<ul><li>Ran a full performance audit against Core Web Vitals to find what was actually slowing things down, instead of guessing.</li><li>Compressed and correctly sized images — usually the single biggest cause of a heavy page — and enabled modern formats and lazy loading.</li><li>Set up proper caching and minified the CSS and JavaScript, so browsers do less work on every visit.</li><li>Cleaned up the database and removed the plugin bloat that accumulates on most sites over time.</li><li>Added a CDN where it made sense, so the site loads quickly regardless of where the visitor is.</li><li>Re-tested and tuned until the numbers held up on both desktop and mobile — not just on the developer's fast connection.</li></ul>",
    outcome:
      "<p>The site went from sluggish to genuinely fast — better for visitors, better for search ranking, and better for every marketing dollar pointed at it.</p>",
  },
];
