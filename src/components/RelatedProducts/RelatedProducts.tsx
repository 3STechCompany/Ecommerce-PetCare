"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product } from "@/data/products";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./RelatedProducts.css";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="related-products section section--padded color-scheme-2" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="related-products__heading">
          <p>You may also like</p>
          <h2 className="heading-bold">Related Products</h2>
        </div>
        <div className="related-products__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
