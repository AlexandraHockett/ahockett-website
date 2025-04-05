import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Performance optimizations
  poweredByHeader: false,

  // Image optimization (must be unoptimized for static export)
  images: {
    unoptimized: true, // Required for static export
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Remove headers() and redirects() as they don't work with static export
  // External packages
  serverExternalPackages: ["sharp", "canvas"],
};

export default nextConfig;
