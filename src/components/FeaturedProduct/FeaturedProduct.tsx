"use client";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { featuredProduct } from "@/data/products";
import "./FeaturedProduct.css";

export default function FeaturedProduct() {
  const [activeImage, setActiveImage] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="featured-product section" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="featured-product__grid">
          <div className="featured-product__gallery">
            <div className="featured-product__main-image">
              <img
                src={featuredProduct.images[activeImage]}
                alt={featuredProduct.title}
                width={940}
                height={940}
              />
            </div>
            <div className="featured-product__thumbs">
              {featuredProduct.images.map((img, i) => (
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
          </div>

          <div className="featured-product__info">
            <span className="featured-product__subtitle">Featured Product</span>
            <h2 className="featured-product__title heading-bold">
              {featuredProduct.title}
            </h2>
            <div className="featured-product__price">{featuredProduct.price}</div>
            <p className="featured-product__description">
              {featuredProduct.description}
            </p>

            <div className="featured-product__features">
              {featuredProduct.features.map((feature) => (
                <div key={feature} className="featured-product__feature">
                  <span className="featured-product__feature-icon">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            <button className="button button--primary featured-product__button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
