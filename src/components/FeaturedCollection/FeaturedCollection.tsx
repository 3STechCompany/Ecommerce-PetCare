"use client";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { formatShopifyPrice } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/data/products";

type Node = {
  id: string;
  title: string;
  handle: string;
  tags: string[];
  description: string;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
      };
    }[];
  };
};

function nodeToProduct(node: Node): Product {
  const variant = node.variants.edges[0]?.node;
  const imgs = node.images.edges.map((e) => e.node);
  const price = variant
    ? formatShopifyPrice(variant.price.amount, variant.price.currencyCode)
    : "—";
  const compareAtPrice = variant?.compareAtPrice
    ? formatShopifyPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)
    : undefined;
  const badge = node.tags.includes("new")
    ? "new"
    : compareAtPrice
    ? "sale"
    : undefined;

  return {
    id: node.id,
    title: node.title,
    href: `/products/${node.handle}`,
    price,
    compareAtPrice,
    image: imgs[0]?.url ?? "",
    hoverImage: imgs[1]?.url,
    badge,
    collection: "featured",
    available: variant?.availableForSale ?? false,
    variantId: variant?.id,
  };
}

export default function FeaturedCollection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopifyFetch<{ products: { edges: { node: Node }[] } }>({
      query: GET_PRODUCTS,
      variables: { first: 4 },
    })
      .then((data) => {
        setProducts(data.products.edges.map(({ node }) => nodeToProduct(node)));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section section--padded" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <h2
          className="heading-bold center"
          style={{ marginBottom: "3rem", fontSize: "calc(var(--font-heading-scale) * 3rem)" }}
        >
          Best Sellers
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--grid-gap-desktop)",
          }}
          className="featured-collection-grid"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-card product-card--skeleton">
                  <div className="skeleton skeleton-image" style={{ aspectRatio: "1/1", width: "100%", borderRadius: "1.2rem" }} />
                  <div style={{ padding: "1rem" }}>
                    <div className="skeleton skeleton-title" style={{ height: "1.4rem", marginBottom: "0.6rem", width: "70%" }} />
                    <div className="skeleton skeleton-price" style={{ height: "1.2rem", width: "40%" }} />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
        <style>{`
          @media screen and (max-width: 989px) {
            .featured-collection-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: var(--grid-gap-mobile) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
