"use client";
import { useState, useEffect, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./SlickSlider.css";

const slides = [
  {
    image: "/images/categories/dog-accessorize.jpg",
    heading: "Cozy Nest",
    link: "/collections/dog-accessorize",
    linkText: "Shop Beds",
    caption: "Give your pet the ultimate relaxation experience with our soft, durable beds designed for comfort and style.",
  },
  {
    image: "/images/categories/cat-toys.jpg",
    heading: "Fun Toys",
    link: "/collections/cats-toys",
    linkText: "Discover Toys",
    caption: "Keep your pets entertained for hours with our wide range of safe and engaging toys made for all ages and sizes.",
  },
  {
    image: "/images/categories/cat-accessorize.jpg",
    heading: "Chic Gear",
    link: "/collections/cats-accessorize",
    linkText: "Explore Accessories",
    caption: "Find the perfect accessories that blend functionality with design to keep your pet looking and feeling great every day.",
  },
];

export default function SlickSlider() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.15);

  const goNext = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const goPrev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="slick-slider-section" ref={ref}>
      <div className={`slick-slider page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="slick-slider__viewport">
          {slides.map((slide, i) => (
            <div key={i} className={`slick-slide ${i === current ? "active" : ""}`}>
              <div className="slick-slide__image">
                <img src={slide.image} alt={slide.heading} loading="lazy" />
              </div>
              <div className="slick-slide__content">
                <h2 className="slick-slide__heading heading-bold">{slide.heading}</h2>
                <a href={slide.link} className="slick-slide__link">{slide.linkText}</a>
                <p className="slick-slide__caption">{slide.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="slick-slider__nav">
          <button onClick={goPrev} aria-label="Previous slide" className="slick-nav-btn">
            <svg viewBox="0 0 24 24"><polyline points="15.4 17.83 10 12.43 15.4 7.03" style={{ strokeLinecap: "round", strokeWidth: 2, fill: "none", stroke: "currentColor" }} /></svg>
          </button>
          <div className="slick-counter">
            <span>{current + 1}</span>
            <span>{slides.length}</span>
          </div>
          <button onClick={goNext} aria-label="Next slide" className="slick-nav-btn">
            <svg viewBox="0 0 24 24"><polyline points="10 17.83 15.4 12.43 10 7.03" style={{ strokeLinecap: "round", strokeWidth: 2, fill: "none", stroke: "currentColor" }} /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
