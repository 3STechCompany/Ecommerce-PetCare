"use client";
import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify/queries";
import { formatShopifyPrice } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/data/products";
import "./CollectionTabs.css";

const TABS = [
  { label: "Cat Accessories", handle: "cat-accessories" },
  { label: "Dog Toys",        handle: "dog-toys"        },
  { label: "Cat Food",        handle: "cat-food"        },
];

type ShopifyCollectionResult = {
  collection: {
    products: {
      edges: {
        node: {
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
      }[];
    };
  } | null;
};

function shopifyToProduct(node: ShopifyCollectionResult["collection"]["products"]["edges"][number]["node"], handle: string): Product {
  const variant = node.variants.edges[0]?.node;
  const imgs = node.images.edges.map((e) => e.node);
  const price = variant
    ? formatShopifyPrice(variant.price.amount, variant.price.currencyCode)
    : "—";
  const compareAtPrice =
    variant?.compareAtPrice
      ? formatShopifyPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)
      : undefined;

  return {
    id: node.id,
    title: node.title,
    href: `/products/${node.handle}`,
    price,
    compareAtPrice,
    image: imgs[0]?.url ?? "",
    hoverImage: imgs[1]?.url,
    collection: handle,
    available: variant?.availableForSale ?? false,
  };
}

export default function CollectionTabs() {
  const [activeTab, setActiveTab]               = useState(0);
  const [tabProducts, setTabProducts]           = useState<Record<string, Product[]>>({});
  const [tabCounts, setTabCounts]               = useState<Record<string, number>>({});
  const [loading, setLoading]                   = useState<Record<string, boolean>>({});
  const { ref, isVisible }                      = useScrollAnimation(0.1);
  const tabRefs                                 = useRef<(HTMLButtonElement | null)[]>([]);
  const [gliderStyle, setGliderStyle]           = useState({ left: 0, width: 0 });

  // Move glider when tab changes
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setGliderStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  // Fetch all 3 collections on mount (4 products each)
  useEffect(() => {
    TABS.forEach(({ handle }) => {
      setLoading((prev) => ({ ...prev, [handle]: true }));
      shopifyFetch<ShopifyCollectionResult>({
        query: GET_COLLECTION_BY_HANDLE,
        variables: { handle, first: 4 },
      })
        .then((data) => {
          const edges = data.collection?.products?.edges ?? [];
          setTabProducts((prev) => ({
            ...prev,
            [handle]: edges.map(({ node }) => shopifyToProduct(node, handle)),
          }));
          setTabCounts((prev) => ({ ...prev, [handle]: edges.length }));
        })
        .catch(() => {
          setTabProducts((prev) => ({ ...prev, [handle]: [] }));
          setTabCounts((prev) => ({ ...prev, [handle]: 0 }));
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, [handle]: false }));
        });
    });
  }, []);

  const currentHandle   = TABS[activeTab].handle;
  const currentProducts = tabProducts[currentHandle] ?? [];
  const isLoading       = loading[currentHandle];

  return (
    <section className="collection-tabs color-scheme-2" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="collection-tabs__title">
          <h2 className="heading-bold">Essentials for Happy Paws</h2>
        </div>

        <div className="collection-tabs__nav">
          {TABS.map((tab, i) => (
            <button
              key={tab.handle}
              ref={(el) => { tabRefs.current[i] = el; }}
              className={`collection-tabs__tab ${i === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
              <span className="tab-count">
                {tabCounts[tab.handle] ?? "…"}
              </span>
            </button>
          ))}
          <div
            className="collection-tabs__glider"
            style={{ left: `${gliderStyle.left}px`, width: `${gliderStyle.width}px` }}
          />
        </div>

        <div className="collection-tabs__grid">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="product-card product-card--skeleton">
                  <div className="skeleton skeleton-image" style={{ aspectRatio: "1/1", width: "100%", borderRadius: "1.2rem" }} />
                  <div style={{ padding: "1rem" }}>
                    <div className="skeleton skeleton-title" style={{ height: "1.4rem", marginBottom: "0.6rem", width: "70%" }} />
                    <div className="skeleton skeleton-price" style={{ height: "1.2rem", width: "40%" }} />
                  </div>
                </div>
              ))
            : currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
          {!isLoading && currentProducts.length === 0 && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 0", color: "rgba(var(--color-foreground), 0.5)" }}>
              No products found in this collection.
            </p>
          )}
        </div>

        <div className="collection-tabs__dots">
          {TABS.map((_, i) => (
            <button
              key={i}
              className={`collection-tabs__dot ${i === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
              aria-label={`Tab ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
