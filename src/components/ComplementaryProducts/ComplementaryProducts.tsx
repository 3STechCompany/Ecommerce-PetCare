"use client";
import { useRef } from "react";
import type { ComplementaryProduct } from "@/data/productDetails";
import "./ComplementaryProducts.css";

interface ComplementaryProductsProps {
  products: ComplementaryProduct[];
}

export default function ComplementaryProducts({ products }: ComplementaryProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild?.clientWidth ?? 300;
    sliderRef.current.scrollBy({ left: dir === "next" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="complementary-products">
      <div className="complementary-products__header">
        <h2 className="complementary-products__title heading-bold">Goes well with</h2>
        <div className="complementary-products__nav">
          <button onClick={() => scroll("prev")} aria-label="Previous"><svg viewBox="0 0 24 24"><polyline points="15.4 17.83 10 12.43 15.4 7.03" style={{ strokeLinecap: "round", strokeWidth: 2, fill: "none", stroke: "currentColor" }} /></svg></button>
          <button onClick={() => scroll("next")} aria-label="Next"><svg viewBox="0 0 24 24"><polyline points="10 17.83 15.4 12.43 10 7.03" style={{ strokeLinecap: "round", strokeWidth: 2, fill: "none", stroke: "currentColor" }} /></svg></button>
        </div>
      </div>
      <div className="complementary-products__slider" ref={sliderRef}>
        {products.map((p) => (
          <a key={p.id} href={p.href} className="complementary-card color-scheme-2">
            <div className="complementary-card__media">
              <img src={p.image} alt={p.title} width={533} height={533} loading="lazy" />
            </div>
            <div className="complementary-card__info">
              <h3 className="complementary-card__title heading-bold">{p.title}</h3>
              <div className="complementary-card__price">
                <span className={p.compareAtPrice ? "on-sale" : ""}>{p.price}</span>
                {p.compareAtPrice && <s>{p.compareAtPrice}</s>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
