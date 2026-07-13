import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enymrh-qy.myshopify.com",
        pathname: "/cdn/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "3stech-2.myshopify.com",
        pathname: "/cdn/**",
      },
      {
        protocol: "https",
        hostname: "flux-paws.myshopify.com",
        pathname: "/cdn/**",
      },
    ],
  },
};

export default nextConfig;
