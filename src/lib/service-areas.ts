/**
 * USA service-area landing pages. Each metro gets a page targeting local
 * organic search ("wordpress malware removal in <city>") — a legitimate local
 * landing page, NOT a doorway page: every entry carries genuinely unique
 * content (intro, local business angle, a city-specific FAQ) alongside the
 * shared service explanation. Keep the list small and the content real; do not
 * mass-generate near-duplicate cities.
 */

export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  /** One-line summary — hub card + meta description seed. */
  blurb: string;
  /** Unique 2–3 sentence opening tied to the city. */
  intro: string;
  /** Unique paragraph on the local business landscape and why it matters. */
  localAngle: string;
  /** One city-specific FAQ appended to the shared set. */
  faq: { question: string; answer: string };
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "new-york",
    city: "New York",
    state: "New York",
    stateAbbr: "NY",
    blurb:
      "WordPress malware removal and security for New York agencies, e-commerce brands, and small businesses.",
    intro:
      "New York runs on its websites — from Manhattan agencies to Brooklyn e-commerce brands, a hacked site is lost revenue by the hour. I remove WordPress malware, close the entry point, and get New York businesses back online fast, working around Eastern Time so an emergency isn't left overnight.",
    localAngle:
      "The New York market is crowded and fast, which is exactly why a compromised or blacklisted site hurts so quickly here — customers have a dozen alternatives one search away. A lot of NYC sites are WooCommerce stores or agency-built WordPress installs with many plugins, which widens the attack surface. Cleaning the visible infection isn't enough; the real work is finding how they got in and closing it before it costs another sale.",
    faq: {
      question: "Do you work with New York businesses in Eastern Time?",
      answer:
        "Yes. I coordinate around US Eastern Time for New York clients, so urgent malware removal and blacklist recovery happen during your business day — not after you've already lost a night of traffic and sales.",
    },
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    state: "California",
    stateAbbr: "CA",
    blurb:
      "WordPress security and malware cleanup for Los Angeles creators, studios, and online stores.",
    intro:
      "Los Angeles is full of media, creator, and e-commerce sites where the website is the brand. When one gets hacked, redirected, or flagged by Google, the damage is immediate and public. I clean infected WordPress sites for LA businesses and lock them down so it doesn't happen again.",
    localAngle:
      "A lot of LA sites are visual, media-heavy WordPress builds — portfolios, storefronts, membership sites — running premium themes and page builders. Those are powerful but plugin-heavy, and every unmaintained plugin is a door. For creators and small studios especially, a defaced or blacklisted site is a reputation problem as much as a technical one, so getting it clean and de-listed quickly matters.",
    faq: {
      question: "My LA site got flagged by Google — can you get the warning removed?",
      answer:
        "Yes. I clean the site to the point where it's genuinely safe, then submit it for Google's review so the 'deceptive site ahead' or blacklist warning is lifted. Requesting a review before the site is clean just fails, so the cleanup comes first.",
    },
  },
  {
    slug: "chicago",
    city: "Chicago",
    state: "Illinois",
    stateAbbr: "IL",
    blurb:
      "Malware removal and WordPress hardening for Chicago small businesses and service companies.",
    intro:
      "Chicago's small and mid-sized businesses rely on their WordPress sites to bring in local customers and leads. A malware infection or a Google warning quietly cuts that off. I find the infection, remove it, and harden the site so a Chicago business isn't back in the same spot next month.",
    localAngle:
      "Many Chicago business sites are lead-generation WordPress builds — law firms, contractors, clinics, local services — where a hacked or slow site directly means fewer calls. These sites often run for years with light maintenance, which is how outdated plugins and weak logins pile up. Hardening after cleanup is what turns a one-time fix into lasting protection.",
    faq: {
      question: "I run a local service business in Chicago — is ongoing protection worth it?",
      answer:
        "For a site that generates leads or bookings, yes. Cleanup fixes today's problem; monitoring, updates, and backups stop the next one and keep your site off Google's blacklist, which is where your local customers first meet you.",
    },
  },
  {
    slug: "houston",
    city: "Houston",
    state: "Texas",
    stateAbbr: "TX",
    blurb:
      "WordPress malware removal for Houston businesses, from energy-sector sites to local shops.",
    intro:
      "Houston businesses — from B2B service companies to local retail — depend on WordPress to look credible and capture leads. When a site is compromised, that credibility takes the hit. I remove the malware, restore the site, and close the vulnerability that let it in.",
    localAngle:
      "Houston has a wide mix of business sites, and a common thread is WordPress installs that grew over time with added plugins and forgotten user accounts. Those extra accounts and abandoned plugins are frequent entry points. A proper cleanup audits users and access, not just files, because a leftover admin account is how attackers walk right back in.",
    faq: {
      question: "Can you clean my Houston site without taking it fully offline?",
      answer:
        "In most cases, yes. I take a full backup first, then clean carefully so your Houston business stays reachable. If the infection is actively harming visitors, a short maintenance window is safer — I'll tell you which applies before starting.",
    },
  },
  {
    slug: "dallas",
    city: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    blurb:
      "Hacked WordPress recovery and hardening for Dallas–Fort Worth companies.",
    intro:
      "Across Dallas–Fort Worth, WordPress powers everything from corporate sites to local storefronts. A hack or redirect virus doesn't just break the site — it breaks trust with the customers who found you. I recover hacked Dallas sites and secure them properly afterward.",
    localAngle:
      "A recurring pattern in the DFW market is the redirect hack — visitors (often only on mobile or from Google) get bounced to spam or scam pages while the owner sees nothing wrong on desktop. It's cloaked on purpose. Removing it means finding the injected code and the backdoor feeding it, then hardening so it can't regenerate.",
    faq: {
      question: "My Dallas site redirects visitors to spam — is that a hack?",
      answer:
        "Almost certainly. Unexpected redirects, especially ones that only trigger on mobile or from search, are a classic sign of injected malware. I find and remove the redirect code, close the entry point, and confirm it's gone across devices.",
    },
  },
  {
    slug: "miami",
    city: "Miami",
    state: "Florida",
    stateAbbr: "FL",
    blurb:
      "WordPress malware removal for Miami e-commerce, hospitality, and bilingual business sites.",
    intro:
      "Miami's e-commerce, hospitality, and service businesses live on their websites — often bilingual, often selling directly online. A malware infection or card-skimming script is a direct threat to sales and customer trust. I clean infected Miami WordPress and WooCommerce sites and secure the checkout.",
    localAngle:
      "Miami has a heavy concentration of online stores and booking sites, and WooCommerce sites are a specific target: attackers inject skimmers to steal card details at checkout. That's a quieter, more dangerous kind of hack than a defacement. Cleaning a store means reviewing the checkout flow and payment path, not just scanning files — without breaking the sales you depend on.",
    faq: {
      question: "I run a Miami online store — how do I know my checkout is safe?",
      answer:
        "A store cleanup includes checking for card-skimming code in the checkout and payment path, not just a general file scan. I remove any injected skimmer, close the entry point, and verify the checkout works and is clean before handing it back.",
    },
  },
  {
    slug: "atlanta",
    city: "Atlanta",
    state: "Georgia",
    stateAbbr: "GA",
    blurb:
      "Malware cleanup and security for Atlanta startups, agencies, and growing businesses.",
    intro:
      "Atlanta's growing base of startups, agencies, and small businesses runs largely on WordPress. When one of those sites is hacked or blacklisted, growth stalls while the problem festers. I remove the malware, get the site clean and de-listed, and harden it so it holds up as you scale.",
    localAngle:
      "In a growth market like Atlanta, sites change hands and developers often — which leaves stale plugins, old admin accounts, and undocumented configurations behind. Those handoff gaps are where compromises hide. Part of a good cleanup is documenting what was found and fixed, so the next person maintaining the site isn't starting blind.",
    faq: {
      question: "We inherited a hacked WordPress site in Atlanta — can you sort it out?",
      answer:
        "Yes, this is common with sites that changed developers. I audit the whole install — files, database, users, plugins — remove the infection, close the entry point, and document what I found so your team understands the site going forward.",
    },
  },
  {
    slug: "austin",
    city: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    blurb:
      "WordPress security for Austin tech, SaaS-adjacent, and creator businesses.",
    intro:
      "Austin's tech-leaning businesses and creators expect their sites to just work. A WordPress compromise — a backdoor, an SEO-spam injection, a reinfection loop — undercuts that. I clean Austin sites thoroughly and harden them so the fix actually sticks.",
    localAngle:
      "Austin owners are often technical enough to spot that something is wrong but not to safely dig out a rooted infection — the kind that keeps coming back because a hidden backdoor survives each cleanup. Breaking that loop means mapping every piece of malicious code and every re-entry point in one pass, then closing them together. Half a cleanup is why malware 'keeps coming back.'",
    faq: {
      question: "My Austin site keeps getting reinfected after I clean it — why?",
      answer:
        "Because the cleanup removed the symptom but left a backdoor or an unpatched vulnerability behind. I map the full infection and every re-entry point, remove them together, and harden the site so the reinfection loop actually stops.",
    },
  },
  {
    slug: "seattle",
    city: "Seattle",
    state: "Washington",
    stateAbbr: "WA",
    blurb:
      "Hacked WordPress recovery and hardening for Seattle businesses and professionals.",
    intro:
      "Seattle businesses and professionals rely on clean, credible WordPress sites to win trust online. A malware warning or defacement erodes that in an instant. I recover hacked Seattle sites, remove the infection at the source, and lock the site down against the next attempt.",
    localAngle:
      "A lot of Seattle sites are professional and content-driven — consultancies, practices, portfolios — where a Google security warning is disproportionately damaging because trust is the whole pitch. Getting the warning lifted quickly, and keeping it from returning, is as important as the technical cleanup. That means hardening and monitoring, not just a one-time scrub.",
    faq: {
      question: "How fast can you recover a hacked Seattle site?",
      answer:
        "Most straightforward cleanups are done within a day, coordinated around Pacific Time. Complex or repeated infections take longer to do properly, but I'll give you a realistic timeline up front after a quick look at what's going on.",
    },
  },
  {
    slug: "denver",
    city: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    blurb:
      "WordPress malware removal and hardening for Denver small businesses and outdoor-industry brands.",
    intro:
      "Denver's small businesses and lifestyle brands use WordPress to reach local and national customers alike. A hacked or slow site cuts into both. I remove the malware, fix what it broke, and harden the site so a Denver business can get back to running it, not rescuing it.",
    localAngle:
      "Many Denver sites are lean WordPress builds run by owners directly, without a dedicated developer — which means updates and backups often slip. That's not negligence, it's bandwidth. The fix is setting up the safety net (automatic backups, monitoring, sensible updates) so security doesn't depend on someone remembering to do it every week.",
    faq: {
      question: "I don't have a developer for my Denver site — can you set up ongoing protection?",
      answer:
        "Yes. That's exactly who monitoring and care plans are for. I set up backups, updates, and malware monitoring so your Denver site stays protected without you having to manage it — and if anything happens, recovery is quick.",
    },
  },
  {
    slug: "boston",
    city: "Boston",
    state: "Massachusetts",
    stateAbbr: "MA",
    blurb:
      "Security and malware cleanup for Boston professional, education, and healthcare-adjacent sites.",
    intro:
      "Boston's professional, education, and healthcare-adjacent businesses hold their websites to a high bar for trust. A malware infection or blacklist warning is a serious liability in those fields. I clean hacked Boston WordPress sites and harden them to the standard those audiences expect.",
    localAngle:
      "Sites in the Boston market often handle sensitive contact or intake data, so a compromise isn't just an SEO problem — it's a trust and, potentially, a compliance concern. That raises the bar on a cleanup: it's not enough for the site to look fine again, it has to be verifiably clean, with access tightened and monitoring in place to catch anything early.",
    faq: {
      question: "My Boston site collects client information — how do you make sure it's really clean?",
      answer:
        "I scan at the server level (not just remotely), remove the infection, check for unknown admin users and hidden backdoors, tighten access, and set up monitoring. The goal is a site that's verifiably clean and watched, which matters most when it handles client data.",
    },
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    state: "California",
    stateAbbr: "CA",
    blurb:
      "WordPress malware removal and security for San Francisco Bay Area startups and businesses.",
    intro:
      "In the San Francisco Bay Area, a website is often the first proof that a business is real and credible. A hack, redirect, or Google warning undermines that at the worst possible moment. I clean infected Bay Area WordPress sites and secure them to a standard that holds up to scrutiny.",
    localAngle:
      "Bay Area sites are frequently built fast and iterated on by multiple hands, which leaves plugin sprawl and loose access behind — fertile ground for compromise. Owners here also tend to care about doing it right, not just fast. A cleanup that closes the entry point, tightens access, and leaves the site documented and monitored fits that expectation better than a quick scrub.",
    faq: {
      question: "Do you work remotely with San Francisco Bay Area clients?",
      answer:
        "Yes — all of this work is done remotely, coordinated around Pacific Time. Distance doesn't change the cleanup; what matters is server access and a methodical process, both of which work the same whether you're in SF or anywhere else.",
    },
  },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}
