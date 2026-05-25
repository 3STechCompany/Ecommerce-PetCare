"use client";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/data/products";
import "./ImageBannerCollection.css";

const kittyProducts: Product[] = [
  {
    id: "oasis-tunnel-banner",
    title: "Oasis Tunnel",
    href: "/products/oasis-tunnel",
    price: "€59,00 EUR",
    image: "/images/products/oasis-tunnel-a.webp",
    badge: "new",
    collection: "cat-accessories",
  },
  {
    id: "perfect-pair-banner",
    title: "Perfect Pair",
    href: "/products/perfect-pair",
    price: "€25,00 EUR",
    image: "/images/products/perfect-pair-a.webp",
    collection: "cat-accessories",
  },
  {
    id: "optimal-comfort-banner",
    title: "Optimal Comfort",
    href: "/products/optimal-comfort",
    price: "€79,00 EUR",
    image: "/images/products/optimal-comfort-a.webp",
    collection: "cat-accessories",
  },
  {
    id: "oasis-haven-banner",
    title: "Oasis Haven",
    href: "/products/oasis-haven",
    price: "€89,00 EUR",
    image: "/images/products/oasis-haven-a.webp",
    badge: "sale",
    collection: "cat-accessories",
  },
];

export default function ImageBannerCollection() {
  const { ref, isVisible } = useScrollAnimation(0.05);

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
              Discover a curated collection of stylish and functional accessories
              designed to keep your feline friend happy and comfortable. From
              playful tunnels to elegant feeding sets, find everything your cat
              needs to thrive.
            </p>
            <Link href="/collections/cats-accessorize" className="button button--primary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="image-banner-collection__products page-width">
        <div className="image-banner-collection__grid">
          {kittyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
