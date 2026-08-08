import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { RichText } from "@/components/ui/rich-text";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Sefat Hossain" },
  description:
    "How Sefat Hossain collects, uses, and protects the information you share through this site.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

const body = `
<p>This site is run by ${siteConfig.name}. This policy explains, in plain language, what information is collected and how it is used. It's a starting template — review and adapt it to your jurisdiction before launch.</p>
<h2>What I collect</h2>
<p>Only what you choose to send me. When you submit the contact or security-audit form, that means your name, email address, website URL (for audits), and any message you write. The site does not sell data or run invasive tracking.</p>
<h2>How I use it</h2>
<ul>
<li>To reply to your enquiry and, for audit requests, to run your audit and send your report.</li>
<li>Nothing else. Your details aren't sold, rented, or shared for marketing.</li>
</ul>
<h2>Where it's stored</h2>
<p>Submissions are stored securely in a private database (Supabase) that is not publicly readable. Access is limited to the site owner.</p>
<h2>Your choices</h2>
<p>You can ask me to access, correct, or delete the information you've sent at any time — just get in touch.</p>
<h2>Contact</h2>
<p>Questions about privacy? Email <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>.</p>
`;

export default function PrivacyPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Privacy Policy" />
      <Section className="!pt-8">
        <div className="mx-auto max-w-3xl">
          <RichText html={body} />
        </div>
      </Section>
    </>
  );
}
