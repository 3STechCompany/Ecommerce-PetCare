import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/account", "/checkout", "/api/"],
      },
    ],
    sitemap: "https://petcare3s.shop/sitemap.xml",
  };
}
