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
    areaServed: "Worldwide",
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
