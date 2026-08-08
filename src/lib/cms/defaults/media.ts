/**
 * Seed assets (Brief §12) — Higgsfield-generated, deep-green, on-brand.
 * Imported into Supabase Storage `media` on first setup and mapped to slots.
 * Real screenshots of the Elementor/Shopify builds are NEVER AI-generated —
 * those drop in via the CMS when supplied.
 */
const CF = "https://d8j0ntlcm91z4.cloudfront.net/user_39WoMcQixYuzQZyAraKMSE5arKg";

export const seedAssets = {
  heroPoster: `${CF}/hf_20260708_162954_f38d770d-4f2b-4b4f-a62e-fbed2a2cc2e0.png`,
  bsgBackground: `${CF}/hf_20260708_163001_5b86dc92-2a16-4afd-a81a-45d7c69ee55a.png`,
  caseMalware: `${CF}/hf_20260708_163020_1737c12c-156f-45ff-bbb2-98bdd9dad2c5.png`,
  caseHardening: `${CF}/hf_20260708_163028_10f89cbf-51e2-486d-a860-f9b1033f66d5.png`,
  blogDefault: `${CF}/hf_20260708_163033_f60ed521-8569-4e73-8c04-db6a37fa1cf5.png`,
  // OG default: Higgsfield job 1bc8288d-… pending — falls back to the hero poster.
  ogDefault: `${CF}/hf_20260708_162954_f38d770d-4f2b-4b4f-a62e-fbed2a2cc2e0.png`,
} as const;

/** Rows to insert into the `media` library on seed. */
export const seedMediaRows = [
  { url: seedAssets.heroPoster, alt: "Secure lattice — hero poster", type: "image/png" },
  { url: seedAssets.bsgBackground, alt: "Build · Secure · Grow background", type: "image/png" },
  { url: seedAssets.caseMalware, alt: "Malware recovery — abstract", type: "image/png" },
  { url: seedAssets.caseHardening, alt: "Security hardening — abstract", type: "image/png" },
  { url: seedAssets.blogDefault, alt: "Blog featured-image template", type: "image/png" },
];
