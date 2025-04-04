import type { NextConfig } from "next";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig: NextConfig = {
  // Performance optimizations
  poweredByHeader: false,

  // Compression and caching
  compress: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Webpack configuration
  webpack: (config: any, { isServer }: WebpackConfigContext) => {
    // Optimize bundle
    config.optimization.minimize = true;

    // Performance hints
    config.performance = {
      hints: "warning",
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    return config;
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/preview",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/process",
        destination: "/services",
        permanent: true,
      },
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["@/components", "@/utils"],
    serverComponentsExternalPackages: ["sharp", "canvas"],
    nextScriptWorkers: true,
  },
};

export default nextConfig;
