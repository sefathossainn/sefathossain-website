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
 * Real, verbatim 5-star Upwork client reviews. Presented exactly as written by
 * the clients (Upwork shows them without full names, so the author is the
 * platform-verified label). Editable/extendable in /admin → Testimonials.
 */
export const seedTestimonials: Testimonial[] = [
  {
    quote:
      "Working with Sefat was awesome. He was so helpful, kind, and attentive to our matter. We had a major security breach at our WordPress site and Sefat cleared it up so quickly. Would definitely work with Sefat again!",
    author: "Verified Upwork Client",
    role: "Business owner",
    company: "WordPress Security Expert Needed",
    rating: 5,
    source: "upwork",
    featured: true,
    sort_order: 1,
    status: "published",
  },
  {
    quote:
      "Hostgator took all my sites down and I needed someone right away to clean the malware and get back to business. Sefat was very responsive and got the job done right the first time…and fast! Highly recommend!",
    author: "Verified Upwork Client",
    role: "Business owner",
    company: "Site Malware Cleanup Specialist Needed",
    rating: 5,
    source: "upwork",
    featured: true,
    sort_order: 2,
    status: "published",
  },
  {
    quote:
      "Sefat went above and beyond to help me out on my malware issue. I will definitely use him again, for the next issue.",
    author: "Verified Upwork Client",
    role: "Business owner",
    company: "Remove malware",
    rating: 5,
    source: "upwork",
    featured: true,
    sort_order: 3,
    status: "published",
  },
  {
    quote:
      "Sefat was awesome and quick to resolve our WordPress problem. Will hire again in the future!",
    author: "Verified Upwork Client",
    role: "Business owner",
    company: "Emergency WordPress Remediation",
    rating: 5,
    source: "upwork",
    featured: true,
    sort_order: 4,
    status: "published",
  },
];
