"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./BrandsMarquee.css";

const brandLogos = [
  "/images/brands/brand-1.jpg",
  "/images/brands/brand-2.jpg",
  "/images/brands/brand-3.jpg",
  "/images/brands/brand-4.jpg",
  "/images/brands/brand-5.jpg",
  "/images/brands/brand-6.jpg",
];

export default function BrandsMarquee() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const logos = [...brandLogos, ...brandLogos];

  return (
    <section className="brands-section" ref={ref}>
      {/* Rich Text 3 - "Our Top Brands" */}
      <div className={`page-width brands-text animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <h2 className="brands-heading heading-bold">
          Our Top <em>Brands</em>
        </h2>
        <p className="brands-description">
          Explore a curated selection of trusted brands dedicated to quality, safety, and thoughtful design. Each product is crafted to bring comfort and joy to your furry friends while respecting the environment.
        </p>
      </div>

      {/* Brands Logo Marquee */}
      <div className="brands-marquee">
        <div className="brands-marquee__track">
          <div className="brands-marquee__content">
            {logos.map((logo, i) => (
              <div key={i} className="brands-marquee__item">
                <img src={logo} alt={`Brand ${(i % brandLogos.length) + 1}`} loading="lazy" height={85} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
