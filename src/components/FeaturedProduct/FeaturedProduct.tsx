"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { formatShopifyPrice } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import "./FeaturedProduct.css";

type FeaturedProductData = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: string[];
  price: string;
  compareAtPrice?: string;
  variantId?: string;
};

type Node = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { edges: { node: { url: string } }[] };
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

export default function FeaturedProduct() {
  const [activeImage, setActiveImage] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [product, setProduct] = useState<FeaturedProductData | null>(null);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    shopifyFetch<{ products: { edges: { node: Node }[] } }>({
      query: GET_PRODUCTS,
      variables: { first: 1 },
    })
      .then((data) => {
        const node = data.products.edges[0]?.node;
        if (!node) return;
        const variant = node.variants.edges[0]?.node;
        const imgs = node.images.edges.map((e) => e.node.url);
        setProduct({
          id: node.id,
          title: node.title,
          handle: node.handle,
          description: node.description || "A premium product designed for your beloved pet.",
          images: imgs.length ? imgs : ["/images/products/oasis-haven-large-a.webp"],
          price: variant ? formatShopifyPrice(variant.price.amount, variant.price.currencyCode) : "—",
          compareAtPrice: variant?.compareAtPrice
            ? formatShopifyPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)
            : undefined,
          variantId: variant?.id,
        });
      })
      .catch(() => {});
  }, []);

  async function handleAddToCart() {
    if (!product?.variantId) {
      router.push(`/products/${product?.handle}`);
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.variantId, 1);
    } finally {
      setAdding(false);
    }
  }

  if (!product) {
    return (
      <section className="featured-product section" ref={ref}>
        <div className="page-width">
          <div className="featured-product__grid" style={{ minHeight: "40rem" }}>
            <div className="skeleton" style={{ width: "100%", height: "40rem", borderRadius: "1.2rem" }} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-product section" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="featured-product__grid">
          <div className="featured-product__gallery">
            <div className="featured-product__main-image">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                width={940}
                height={940}
              />
            </div>
            {product.images.length > 1 && (
              <div className="featured-product__thumbs">
                {product.images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    className={`featured-product__thumb ${i === activeImage ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" width={70} height={70} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="featured-product__info">
            <span className="featured-product__subtitle">Featured Product</span>
            <h2 className="featured-product__title heading-bold">{product.title}</h2>
            <div className="featured-product__price">
              {product.compareAtPrice && (
                <s style={{ opacity: 0.5, marginRight: "0.8rem" }}>{product.compareAtPrice}</s>
              )}
              {product.price}
            </div>
            <p className="featured-product__description">{product.description}</p>

            <button
              className="button button--primary featured-product__button"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
