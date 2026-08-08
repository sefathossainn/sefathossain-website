import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in $HOME otherwise confuses
  // Next's root inference (affects output tracing + env resolution).
  turbopack: { root: path.resolve() },
  images: {
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
