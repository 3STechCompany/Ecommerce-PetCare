"use client";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { categoryCollections } from "@/data/collections";
import "./CategorySlider.css";

export default function CategorySlider() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.offsetWidth * 0.45;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="category-slider" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="category-slider__wrapper">
          <div className="category-slider__grid" ref={sliderRef}>
            {categoryCollections.map((col, i) => (
              <a
                key={col.id}
                href={col.href}
                className="category-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="category-card__image"
                  loading="lazy"
                  width={750}
                  height={750}
                />
                <div className="category-card__overlay">
                  <h3 className="category-card__title">{col.title}</h3>
                </div>
              </a>
            ))}
          </div>

          <div className="category-slider__nav">
            <button
              className="category-slider__btn category-slider__btn--prev"
              onClick={() => scroll("left")}
              aria-label="Slide left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="10 17.83 15.4 12.43 10 7.03" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="category-slider__btn"
              onClick={() => scroll("right")}
              aria-label="Slide right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="10 17.83 15.4 12.43 10 7.03" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
