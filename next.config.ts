import type { NextConfig } from "next";
import path from "node:path";

const SUPABASE = "https://dtbifbjsstuxudhoxrej.supabase.co";

/**
 * Content-Security-Policy. Scripts keep 'unsafe-inline' because Next.js
 * hydration data, the JSON-LD blocks and the GA4 init snippet are inline
 * (a nonce-based policy would force every page dynamic). Everything else is
 * locked down: no plugins, no framing, no foreign <base> or form targets, and
 * network access only to this origin, Supabase and Google Analytics.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${SUPABASE} wss://dtbifbjsstuxudhoxrej.supabase.co https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`,
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Vercel already sends max-age=63072000; add subdomains. (No `preload`:
  // that is a one-way commitment to submit the domain to browser lists.)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Security headers on every response — this is a WordPress-security
  // consultant's site, so its own securityheaders.com grade is part of the pitch.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Old post URL Google still reports as 404 in Search Console; send it to
      // the live post on the same topic so any links/equity carry over.
      {
        source: "/blog/fix-google-security-warning-wordpress",
        destination: "/blog/remove-google-security-warning-wordpress",
        permanent: true,
      },
      // Former demo/seed pages that stayed live (and got indexed) after the
      // real content replaced them in the CMS. Point each at its live
      // equivalent so the duplicate stops competing with it.
      {
        source: "/blog/what-to-do-when-your-wordpress-site-is-hacked",
        destination: "/blog/wordpress-site-hacked",
        permanent: true,
      },
      {
        source: "/work/malware-recovery",
        destination: "/work/wordpress-malware-removal",
        permanent: true,
      },
      {
        source: "/work/security-hardening",
        destination: "/services/wordpress-security-hardening",
        permanent: true,
      },
    ];
  },
  // Pin the workspace root — a stray lockfile in $HOME otherwise confuses
  // Next's root inference (affects output tracing + env resolution).
  turbopack: { root: path.resolve() },
  // OG cards read vendored fonts with fs at request time (blog /og route);
  // make sure the files ship with every function.
  outputFileTracingIncludes: {
    "/**": ["./src/assets/og-fonts/*.woff"],
  },
  images: {
    // Serve AVIF (then WebP) where the browser supports it — smaller hero and
    // content images, so LCP improves with no visual change.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Seed assets (Section 12) served from CloudFront
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      // Supabase Storage public bucket
      {
        protocol: "https",
        hostname: "dtbifbjsstuxudhoxrej.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
