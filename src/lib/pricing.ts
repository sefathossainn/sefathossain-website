/**
 * WordPress malware-removal price tiers (USD). Single source for the cost
 * guide and the city pages, so a price change lands everywhere at once.
 */
export type Tier = {
  name: string;
  price: string;
  low: number;
  high: number | null;
  summary: string;
  fits: string[];
};


export const MALWARE_PRICE_TIERS: Tier[] = [
  {
    name: "Basic cleanup",
    price: "$100–300",
    low: 100,
    high: 300,
    summary:
      "A single WordPress site with a straightforward, recent infection — one entry point, limited spread, and a clean backup available.",
    fits: [
      "One website, one clear infection",
      "Malicious files or injected code in a few known places",
      "No Google blacklist or the warning is minor",
      "Site is still functional and mostly intact",
    ],
  },
  {
    name: "Standard recovery",
    price: "$300–800",
    low: 300,
    high: 800,
    summary:
      "A deeper compromise — multiple infected files, hidden backdoors, spam injection, or a Google security warning that needs a review request.",
    fits: [
      "Multiple backdoors or reinfection attempts",
      "SEO spam, pharma hacks, or malicious redirects",
      "Google blacklist / “deceptive site” warning removal",
      "Database cleanup and post-cleanup hardening",
    ],
  },
  {
    name: "Complex / emergency",
    price: "$800–2,500+",
    low: 800,
    high: null,
    summary:
      "Severe or business-critical cases — e-commerce stores, multiple sites, deep or repeated compromises, and situations where downtime is costing money right now.",
    fits: [
      "WooCommerce / e-commerce or membership sites",
      "Multisite networks or several sites at once",
      "Repeated reinfection or no clean backup",
      "Urgent recovery with hardening and monitoring",
    ],
  },
];
