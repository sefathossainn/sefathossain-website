import { absoluteUrl } from "@/lib/utils";
import { siteConfig, socialLinks } from "@/lib/site-config";

/** Person schema — home + about. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "WordPress Security Expert",
    description: siteConfig.description,
    sameAs: socialLinks.map((s) => s.href),
  };
}

/** ProfessionalService schema — home. */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "WordPress security",
      "Malware removal",
      "Website development",
      "Shopify store development",
      "Performance optimization",
    ],
    provider: { "@type": "Person", name: siteConfig.name },
  };
}

/**
 * Service schema for an individual service page. `areaServed` targets the
 * United States for US-focused search/GEO; pass an `offers` object for pages
 * that publish pricing.
 */
export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  offers?: object;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    ...(serviceType ? { serviceType } : {}),
    areaServed: { "@type": "Country", name: "United States" },
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(offers ? { offers } : {}),
  };
}

/**
 * HowTo schema from a page's process steps — makes the "how it works" section
 * eligible for rich results and easy for AI engines to extract as a procedure.
 */
export function howToSchema({
  name,
  description,
  steps,
  path,
}: {
  name: string;
  description: string;
  steps: { title: string; body: string }[];
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(path ? { url: absoluteUrl(path) } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title.replace(/^\d+\.\s*/, ""),
      text: s.body,
    })),
  };
}

/** FAQPage schema built from a page's question/answer pairs. */
export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
