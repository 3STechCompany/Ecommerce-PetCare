import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Domain Shopify store thực tế
      {
        protocol: "https",
        hostname: "enymrh-qy.myshopify.com",
        pathname: "/cdn/**",
      },
      // CDN chính của Shopify cho images sản phẩm
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
