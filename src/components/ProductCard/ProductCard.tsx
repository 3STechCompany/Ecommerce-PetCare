"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.variantId) {
      router.push(product.href);
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.variantId, 1);
    } finally {
      setAdding(false);
    }
  }

  function handleViewDetail(e: React.MouseEvent) {
    e.preventDefault();
    router.push(product.href);
  }

  return (
    <div className="product-card">
      <div className="product-card__media">
        {product.badge && (
          <span className={`product-card__badge product-card__badge--${product.badge}`}>
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.title}
          className="product-card__image product-card__image--primary"
          loading="lazy"
          width={533}
          height={533}
        />

        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={product.title}
            className="product-card__image product-card__image--hover"
            loading="lazy"
            width={533}
            height={533}
          />
        )}

        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            aria-label="View product detail"
            onClick={handleViewDetail}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round">
              <path d="M2,10 Q6,5 10,5 Q14,5 18,10 Q14,15 10,15 Q6,15 2,10" />
              <path d="M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61931 12.5 7.50002 11.3807 7.50002 10C7.50002 8.6193 8.61931 7.50001 10 7.50001C11.3807 7.50001 12.5 8.6193 12.5 10Z" />
            </svg>
          </button>
          <button
            className="product-card__action-btn"
            aria-label="Add to cart"
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" style={{ animation: "spin 0.6s linear infinite" }}>
                <path d="M10 3a7 7 0 1 1-7 7" strokeWidth="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round">
                <path d="M10 4v12M4 10h12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">
          <a href={product.href}>{product.title}</a>
        </h3>
        <div className="product-card__price">
          {product.compareAtPrice && (
            <s className="product-card__price--compare">{product.compareAtPrice}</s>
          )}
          <span className="product-card__price--sale">{product.price}</span>
        </div>
      </div>
    </div>
  );
}
