"use client";
import "./ImageGalleryScroll.css";

const galleryImages = [
  { src: "/images/products/derma-care-c.webp", alt: "Derma Care" },
  { src: "/images/products/calm-sleep-b.webp", alt: "Calm & Sleep" },
  { src: "/images/products/joint-support-b.webp", alt: "Joint Support" },
  { src: "/images/products/plush-bed-b.webp", alt: "Plush Dog Bed" },
  { src: "/images/products/harness-b.webp", alt: "Harness & Leash" },
];

export default function ImageGalleryScroll() {
  const items = [...galleryImages, ...galleryImages];

  return (
    <section className="image-gallery-scroll">
      <div className="image-gallery-scroll__track">
        <div className="image-gallery-scroll__content">
          {items.map((img, i) => (
            <div key={i} className="image-gallery-scroll__item">
              <img src={img.src} alt={img.alt} loading="lazy" width={750} height={365} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
