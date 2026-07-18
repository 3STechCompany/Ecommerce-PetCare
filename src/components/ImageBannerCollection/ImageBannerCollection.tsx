"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify/queries";
import { formatShopifyPrice, getValidCompareAtPrice } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/data/products";
import "./ImageBannerCollection.css";

type Node = {
  id: string;
  title: string;
  handle: string;
  tags: string[];
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

type CollectionResult = {
  collection: {
    products: { edges: { node: Node }[] };
  } | null;
};

function nodeToProduct(node: Node): Product {
  const variant = node.variants.edges[0]?.node;
  const imgs = node.images.edges.map((e) => e.node);
  const price = variant
    ? formatShopifyPrice(variant.price.amount, variant.price.currencyCode)
    : "—";
  const compareAtPrice = variant
    ? getValidCompareAtPrice(
        variant.price.amount,
        variant.compareAtPrice?.amount,
        variant.compareAtPrice?.currencyCode ?? variant.price.currencyCode
      )
    : undefined;
  const badge = node.tags.includes("new") ? "new" : compareAtPrice ? "sale" : undefined;

  return {
    id: node.id,
    title: node.title,
    href: `/products/${node.handle}`,
    price,
    compareAtPrice,
    image: imgs[0]?.url ?? "",
    hoverImage: imgs[1]?.url,
    badge,
    collection: "cat-accessories",
    available: variant?.availableForSale ?? false,
    variantId: variant?.id,
  };
}

export default function ImageBannerCollection() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopifyFetch<CollectionResult>({
      query: GET_COLLECTION_BY_HANDLE,
      variables: { handle: "cat-accessories", first: 4 },
    })
      .then((data) => {
        const edges = data.collection?.products?.edges ?? [];
        setProducts(edges.map(({ node }) => nodeToProduct(node)));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="image-banner-collection" ref={ref}>
      <div className="image-banner-collection__banner">
        <div className="image-banner-collection__media image-banner-collection__media--desktop">
          <img
            src="/images/hero/hero-cats-desktop.jpg"
            alt="Kitty Comforts"
            width={2600}
            height={1200}
            loading="lazy"
          />
        </div>
        <div className="image-banner-collection__media image-banner-collection__media--mobile">
          <img
            src="/images/hero/hero-cats-mobile.jpg"
            alt="Kitty Comforts"
            width={990}
            height={600}
            loading="lazy"
          />
        </div>

        <div className="image-banner-collection__content page-width">
          <div className={`image-banner-collection__text animate-fade-up ${isVisible ? "is-visible" : ""}`}>
            <h2 className="heading-bold" style={{ fontSize: "calc(var(--font-heading-scale) * 5rem)", marginBottom: "1.5rem" }}>
              Kitty{" "}
              <em style={{ fontStyle: "italic", position: "relative", display: "inline-block" }}>
                Comforts
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%) scaleX(-1)",
                    bottom: "-10px",
                    width: "100%",
                    height: "0.6em",
                    background:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='167' height='10' viewBox='0 0 167 10'%3E%3Cpath d='M5 8C40 4 130 -1 162 6' stroke='%23c8273d' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E\") no-repeat center",
                    backgroundSize: "contain",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.5s ease 0.6s",
                    zIndex: -1,
                    display: "block",
                  }}
                />
              </em>
            </h2>
            <p style={{ maxWidth: "50rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Discover a curated collection of grooming tools, cozy donut beds,
              and travel-ready carriers designed to keep your feline friend
              happy and comfortable — everything your cat needs to thrive.
            </p>
            <Link href="/collections/cat-accessories" className="button button--primary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="image-banner-collection__products page-width">
        <div className="image-banner-collection__grid">
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
      </div>
    </section>
  );
}
