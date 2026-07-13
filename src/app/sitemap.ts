import type { MetadataRoute } from "next";
import { shopifyFetch } from "@/lib/shopify/client";

const BASE_URL = "https://petcare3s.shop";

type ProductEdge = { node: { handle: string; updatedAt?: string } };
type CollectionEdge = { node: { handle: string } };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/collections/all`,           changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/collections/cat-accessories`,changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/collections/cat-toys`,       changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/collections/dog-accessories`,changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/collections/dog-toys`,       changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/pages/about-us`,             changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/pages/contact`,              changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/pages/faq`,                  changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const data = await shopifyFetch<{
      products: { edges: ProductEdge[] };
    }>({
      query: `{ products(first: 250) { edges { node { handle } } } }`,
    });

    const productRoutes: MetadataRoute.Sitemap = data.products.edges.map(({ node }) => ({
      url: `${BASE_URL}/products/${node.handle}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
