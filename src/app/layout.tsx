import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/cms/queries";
import { buildThemeCss } from "@/lib/theme";
import {
  GOOGLE_SITE_VERIFICATION,
  BING_SITE_VERIFICATION,
} from "@/lib/env";
import { Analytics } from "@/components/seo/analytics";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

/** Hosts next.config `images.remotePatterns` allows the optimizer to fetch. */
const OPTIMIZABLE = [
  "https://dtbifbjsstuxudhoxrej.supabase.co/storage/v1/object/public/",
  "https://d8j0ntlcm91z4.cloudfront.net/",
];

/** Icon-sized URL via /_next/image; leaves unknown hosts and local files as-is. */
function optimizedIcon(src: string, width: 96 | 256) {
  if (!OPTIMIZABLE.some((p) => src.startsWith(p))) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  // Favicon = the dedicated favicon from /admin → Site Settings, else the
  // bundled square fallback in public/. The profile photo is deliberately NOT
  // in this chain any more: it's a portrait crop, so swapping it used to change
  // (and break) the browser-tab / Google-results icon as a side effect.
  //
  // A CMS favicon is usually a full-size upload (the current one is a 343 KB
  // 512px PNG) and browsers fetch it at high priority on every page, competing
  // with the page itself on mobile. Route it through the image optimizer at
  // icon size: browsers get AVIF/WebP (~1 KB), crawlers sending */* get PNG.
  const cms = settings.favicon_url;
  const favicon = cms ? optimizedIcon(cms, 96) : "/icon-192.png";
  const appleIcon = cms ? optimizedIcon(cms, 256) : "/apple-touch-icon.png";
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default:
        "Sefat Hossain — Secure, High-Performance Websites | WordPress Security & Development",
      template: "%s | Sefat Hossain",
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: appleIcon,
    },
    alternates: {
      canonical: "/",
      types: { "application/rss+xml": "/rss.xml" },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: "Sefat Hossain — Secure, High-Performance Websites",
      description: siteConfig.description,
    },
    twitter: {
      card: "summary_large_image",
      title: "Sefat Hossain — Secure, High-Performance Websites",
      description: siteConfig.description,
    },
    robots: { index: true, follow: true },
    verification: {
      ...(GOOGLE_SITE_VERIFICATION
        ? { google: GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(BING_SITE_VERIFICATION
        ? { other: { "msvalidate.01": BING_SITE_VERIFICATION } }
        : {}),
    },
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://sefathossain.com/#person",
  name: "Sefat Hossain",
  jobTitle: "WordPress Security Expert & Malware Removal Specialist",
  description:
    "WordPress Security Expert specializing in WordPress malware investigation, hacked website recovery, database cleanup, and server security hardening.",
  url: "https://sefathossain.com",
  image: "https://avatars.githubusercontent.com/u/241861940?v=4",
  email: "admin@sefathossain.com",
  areaServed: { "@type": "Country", name: "United States" },
  sameAs: [
    "https://www.wikidata.org/wiki/Q141262999",
    "https://www.linkedin.com/in/sefathossainn/",
    "https://github.com/sefathossainn",
    "https://medium.com/@sefathossainn",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Global theme overrides (colors + type scale) from /admin → Appearance,
  // injected as sanitized CSS that wins over the Tailwind defaults.
  const settings = await getSiteSettings();
  const themeCss = buildThemeCss(settings.theme);

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-obsidian text-mist">
        {themeCss && (
          <style id="cms-theme" dangerouslySetInnerHTML={{ __html: themeCss }} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
