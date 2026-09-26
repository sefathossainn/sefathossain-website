/**
 * Canonical list of security service pages — single source of truth for
 * internal linking (RelatedServices), the /llms.txt map, and anywhere else the
 * full set is needed. Keep in sync when adding a service page.
 */
export type ServiceNavItem = { name: string; path: string; desc: string };

export const SERVICE_PAGES: ServiceNavItem[] = [
  {
    name: "WordPress Malware Removal",
    path: "/services/wordpress-malware-removal",
    desc: "Clean an infected WordPress site — remove malicious code, backdoors and spam, then harden it.",
  },
  {
    name: "WordPress Malware Removal Cost",
    path: "/services/wordpress-malware-removal-cost",
    desc: "US pricing guide: $100–300 simple, $300–800 deeper, $800–2,500+ complex.",
  },
  {
    name: "Emergency WordPress Malware Removal",
    path: "/services/emergency-wordpress-malware-removal",
    desc: "Urgent recovery when a site is down, defaced, redirecting, or flagged by Google.",
  },
  {
    name: "Hacked WordPress Website Recovery",
    path: "/services/hacked-wordpress-recovery",
    desc: "Structured investigation, cleanup, hardening and verification for a compromised site.",
  },
  {
    name: "WordPress Redirect Virus Removal",
    path: "/services/wordpress-redirect-virus-removal",
    desc: "Find and remove malware redirecting visitors to spam/scam sites, and close the entry point.",
  },
  {
    name: "Japanese Keyword Hack Removal",
    path: "/services/japanese-keyword-hack-removal",
    desc: "Remove injected Japanese SEO-spam pages and stop them regenerating.",
  },
  {
    name: "Pharma Hack Removal",
    path: "/services/pharma-hack-removal",
    desc: "Remove cloaked pharmacy spam shown to search engines and recover listings.",
  },
  {
    name: "wp-vcd Malware Removal",
    path: "/services/wp-vcd-malware-removal",
    desc: "Remove the self-replicating wp-vcd infection (usually from nulled themes/plugins).",
  },
  {
    name: "WooCommerce Malware Removal",
    path: "/services/woocommerce-malware-removal",
    desc: "Store-aware cleanup incl. checkout/card-skimming review, without breaking sales.",
  },
  {
    name: "Website Suspended by Host — Recovery",
    path: "/services/website-suspended-by-host-recovery",
    desc: "Clean to the host's standard and get a suspended account reactivated.",
  },
  {
    name: "WordPress Security Hardening",
    path: "/services/wordpress-security-hardening",
    desc: "Close the doors before anyone finds them — access, firewall, backups, monitoring.",
  },
  {
    name: "WordPress Security Audit",
    path: "/services/wordpress-security-audit",
    desc: "A practical review of vulnerabilities, users, plugins, configuration and malware indicators.",
  },
  {
    name: "Google Blacklist Removal",
    path: "/services/google-blacklist-removal",
    desc: "Clean the site behind a Google security warning and request a review.",
  },
  {
    name: "Cloudflare Security Setup",
    path: "/services/cloudflare-security",
    desc: "DNS protection, firewall rules, bot protection and rate limiting for WordPress.",
  },
];
