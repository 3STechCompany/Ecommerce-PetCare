"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/data/products";

const featuredCollectionProducts: Product[] = [
  {
    id: "zen-dog-bed",
    title: "Zen Dog Bed",
    href: "/products/zen-dog-bed",
    price: "€99,00 EUR",
    image: "/images/products/zen-bed-a.webp",
    hoverImage: "/images/products/zen-bed-b.webp",
    collection: "featured",
  },
  {
    id: "waterproof-raincoat",
    title: "Waterproof Dog Raincoat",
    href: "/products/waterproof-dog-raincoat",
    price: "€49,00 EUR",
    image: "/images/products/raincoat-a.webp",
    hoverImage: "/images/products/raincoat-b.webp",
    collection: "featured",
  },
  {
    id: "plush-dog-bed",
    title: "Plush Dog Bed",
    href: "/products/cozy-plush-dog-bed",
    price: "€69,00 EUR",
    image: "/images/products/plush-bed-a.webp",
    hoverImage: "/images/products/plush-bed-b.webp",
    badge: "new",
    collection: "featured",
  },
  {
    id: "onefit-harness",
    title: "OneFit Dog Harness & Leash",
    href: "/products/harness-leash-set",
    price: "€59,00 EUR",
    compareAtPrice: "€69,00 EUR",
    image: "/images/products/harness-a.webp",
    hoverImage: "/images/products/harness-b.webp",
    badge: "sale",
    collection: "featured",
  },
];

export default function FeaturedCollection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

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
          {featuredCollectionProducts.map((product) => (
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
