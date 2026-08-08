import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { RichText } from "@/components/ui/rich-text";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Terms | Sefat Hossain" },
  description: "The terms for using this website.",
  alternates: { canonical: absoluteUrl("/terms") },
};

const body = `
<p>These terms govern your use of ${siteConfig.domain}. They're a starting template — review and adapt them before launch.</p>
<h2>Using this site</h2>
<p>You're welcome to read, share, and get in touch. The content here is provided for general information and doesn't constitute a guarantee of any specific security outcome for your own site.</p>
<h2>Services</h2>
<p>Any work engagement is agreed separately in writing. Nothing on this site is a binding offer on its own.</p>
<h2>Content</h2>
<p>Articles and case-study narratives are the property of ${siteConfig.name}. Case studies describe real categories of work; no client name, metric, or result is presented as fact unless explicitly confirmed.</p>
<h2>Contact</h2>
<p>Questions? Email <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>.</p>
`;

export default function TermsPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Terms" />
      <Section className="!pt-8">
        <div className="mx-auto max-w-3xl">
          <RichText html={body} />
        </div>
      </Section>
    </>
  );
}
