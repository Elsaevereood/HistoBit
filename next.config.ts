import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 301s from the three thin 2026 news posts consolidated into one deep piece.
  // Preserves any inbound links and passes ranking signals to the canonical URL.
  async redirects() {
    return [
      {
        source: "/blog/iran-attacks-us-destroyers-2026",
        destination: "/blog/patriot-missile-shortage-2026",
        permanent: true,
      },
      {
        source: "/blog/iran-war-drains-ukraine-patriot-defense",
        destination: "/blog/patriot-missile-shortage-2026",
        permanent: true,
      },
      {
        source: "/blog/ukraine-patriot-missiles-russia-strike-2026",
        destination: "/blog/patriot-missile-shortage-2026",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
