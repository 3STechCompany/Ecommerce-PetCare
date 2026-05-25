"use client";
import { useState } from "react";
import "./ProductGallery.css";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    setActiveIndex(index);
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <div className="product-gallery__viewport">
          {images.map((img, i) => (
            <div
              key={i}
              className={`product-gallery__slide ${i === activeIndex ? "active" : ""}`}
            >
              <img src={img} alt={`${title} - Image ${i + 1}`} width={1946} height={1946} />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="product-gallery__arrow product-gallery__arrow--prev"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24"><polyline points="15.4 17.83 10 12.43 15.4 7.03" style={{ strokeLinecap: "round", strokeWidth: 2, fill: "none", stroke: "currentColor" }} /></svg>
            </button>
            <button
              className="product-gallery__arrow product-gallery__arrow--next"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24"><polyline points="10 17.83 15.4 12.43 10 7.03" style={{ strokeLinecap: "round", strokeWidth: 2, fill: "none", stroke: "currentColor" }} /></svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="product-gallery__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`product-gallery__dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
