"use client";
import { useEffect, useState } from "react";
import type { ProductDetail } from "@/data/productDetails";
import { useCart } from "@/context/CartContext";
import "./StickyAddToCart.css";

interface StickyAddToCartProps {
  product: ProductDetail;
}

export default function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const { addToCart, isLoading } = useCart();

  const selectedVariant =
    product.variants.find((variant) => variant.id === variantId) ??
    product.variants[0];

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-add-to-cart ${visible ? "visible" : ""}`}>
      <div className="page-width sticky-add-to-cart__inner">
        <div className="sticky-add-to-cart__product">
          <img
            src={selectedVariant.image}
            alt={product.title}
            width={72}
            height={72}
          />
          <div>
            <h3 className="heading-bold">{product.title}</h3>
            <p>{selectedVariant.price}</p>
          </div>
        </div>
        <div className="sticky-add-to-cart__controls">
          <select
            value={variantId}
            aria-label="Select size"
            onChange={(event) => setVariantId(event.target.value)}
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.label}
              </option>
            ))}
          </select>
          {/*
            variantId ở đây là Shopify GID → CartContext gửi thẳng vào mutation
          */}
          <button
            type="button"
            disabled={isLoading || !selectedVariant.available}
            onClick={() => addToCart(variantId, 1)}
          >
            {isLoading
              ? "Adding..."
              : selectedVariant.available
              ? "Add to cart"
              : "Sold out"}
          </button>
        </div>
      </div>
    </div>
  );
}
