import type { Faq } from "@/lib/cms/types";

/**
 * FAQs — written in Sefat's voice (calm, honest, no hype). No client claims,
 * so nothing to fabricate. Fully editable in /admin.
 */
export const defaultFaqs: Faq[] = [
  {
    question: "My site's been hacked — can you help right now?",
    answer:
      "Yes. Malware removal and hacked-site recovery is core to what I do. I isolate the site, find how the attacker got in, remove everything they left behind, and get you delisted from any Google warning — then harden it so it doesn't happen again. Reach out through the contact form or book a call and tell me what you're seeing.",
    sort_order: 1,
  },
  {
    question: "What platforms do you work with?",
    answer:
      "WordPress and Elementor for business sites, and Shopify for stores. Whatever the platform, the approach is the same: build it properly, secure it from the start, and keep it fast.",
    sort_order: 2,
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes — the care plan is the part most freelancers skip and the part that matters most. Regular updates, security monitoring, scheduled backups, and priority support, so problems get caught before they become emergencies.",
    sort_order: 3,
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on the work — a one-off malware cleanup is different from a full build or a monthly care plan. I'd rather scope it to what your site actually needs than quote a number blind. Start with a free audit or a quick call.",
    sort_order: 4,
  },
  {
    question: "What exactly is the free security audit?",
    answer:
      "A no-obligation review of your WordPress site for the common weaknesses attackers look for. You get a plain-language report on what's exposed and what to fix — whether you handle it yourself or have me do it.",
    sort_order: 5,
  },
  {
    question: "Will I be able to manage the site myself?",
    answer:
      "That's the goal. I build and hand over so you own your site — with a walkthrough — instead of needing a developer for every small change.",
    sort_order: 6,
  },
];
