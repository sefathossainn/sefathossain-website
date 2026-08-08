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
        {children}
      </body>
    </html>
  );
}
