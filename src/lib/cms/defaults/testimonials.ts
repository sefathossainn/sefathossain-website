import type { Testimonial } from "@/lib/cms/types";

/**
 * Sefat's own signature statement (Brand Guide §05 "one line to remember").
 * Shown as a branded pull-quote when no real client testimonials are published
 * yet — honest, because it's his own words, not an invented client.
 */
export const signatureQuote = {
  quote:
    "I don't just build websites — I build secure digital experiences that businesses can trust and grow with.",
  author: "Sefat Hossain",
  role: "WordPress Security Expert",
};

/**
 * Demo testimonials for the CMS to show editing UX. Seeded as DRAFT so they
 * never render publicly — real Upwork/Fiverr/client quotes replace them in
 * /admin, then get published. Nothing here is presented as fact.
 */
export const seedTestimonials: Testimonial[] = [
  {
    quote:
      "Sample review — replace with a real client quote in the CMS. Kept calm through a stressful hack and explained every step in plain language.",
    author: "Demo Client",
    role: "Business owner",
    source: "direct",
    featured: true,
    sort_order: 1,
    status: "draft",
  },
  {
    quote:
      "Sample review — replace with a real Upwork/Fiverr review in the CMS. Fast, thorough, and still there months later when we needed a change.",
    author: "Demo Client",
    role: "Store owner",
    source: "upwork",
    featured: true,
    sort_order: 2,
    status: "draft",
  },
];
