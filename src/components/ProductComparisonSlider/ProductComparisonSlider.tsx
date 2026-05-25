"use client";
import { useState } from "react";
import type { CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./ProductComparisonSlider.css";

export default function ProductComparisonSlider() {
  const [position, setPosition] = useState(52);
  const { ref, isVisible } = useScrollAnimation(0.12);

  return (
    <section className="product-comparison section section--padded" ref={ref}>
      <div className={`page-width product-comparison__inner animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="product-comparison__copy">
          <p className="product-comparison__eyebrow">Natural energy support</p>
          <h2 className="heading-bold">Balanced treats for active days</h2>
          <p>
            Energy Boost pairs crunchy texture with gentle, wholesome ingredients.
            Use the slider to compare the clean pack presentation with the treat
            texture inside.
          </p>
        </div>

        <div className="product-comparison__frame" style={{ "--compare-position": `${position}%` } as CSSProperties}>
          <img src="/images/products/energy-boost-a.webp" alt="Energy Boost package" className="product-comparison__image" />
          <div className="product-comparison__after">
            <img src="/images/products/energy-boost-b.webp" alt="Energy Boost treats detail" className="product-comparison__image" />
          </div>
          <div className="product-comparison__labels" aria-hidden="true">
            <span>Pack</span>
            <span>Texture</span>
          </div>
          <div className="product-comparison__handle" aria-hidden="true" />
          <input
            className="product-comparison__range"
            type="range"
            min="18"
            max="82"
            value={position}
            aria-label="Compare package and texture images"
            onChange={(event) => setPosition(Number(event.target.value))}
          />
        </div>
      </div>
    </section>
  );
}
