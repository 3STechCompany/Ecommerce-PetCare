"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./RecentlyViewedProducts.css";

interface RecentlyViewedProductsProps {
  products: Product[];
  title?: string;
  eyebrow?: string;
}

export default function RecentlyViewedProducts({
  products,
  title = "Recently Viewed",
  eyebrow = "Pick up where you left off",
}: RecentlyViewedProductsProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  if (products.length === 0) return null;

  return (
    <section className="recently-viewed section section--padded" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="recently-viewed__heading">
          <p>{eyebrow}</p>
          <h2 className="heading-bold">{title}</h2>
        </div>
        <div className="recently-viewed__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
