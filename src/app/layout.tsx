import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/cms/queries";
import { buildThemeCss } from "@/lib/theme";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  // Favicon = a dedicated favicon if set, else the profile photo, else the
  // bundled .ico — all CMS-swappable from /admin → Site Settings.
  const favicon = settings.favicon_url || settings.profile_photo || "/favicon.ico";
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
      apple: favicon,
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
  sameAs: [
    "https://www.wikidata.org/wiki/Q141262999",
    "https://www.linkedin.com/in/sefathossainn/",
    "https://github.com/sefathossainn",
    "https://medium.com/@sefathossainn",
