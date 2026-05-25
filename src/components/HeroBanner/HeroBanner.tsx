"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./HeroBanner.css";

export default function HeroBanner() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="hero-banner" ref={ref}>
      {/* Desktop Image */}
      <div className="hero-banner__media hero-banner__media--desktop">
        <img
          src="/images/hero/hero-desktop.jpg"
          alt="Happy pets"
          width={2600}
          height={1200}
        />
      </div>

      {/* Mobile Image */}
      <div className="hero-banner__media hero-banner__media--mobile">
        <img
          src="/images/hero/hero-mobile.jpg"
          alt="Happy pets"
          width={990}
          height={600}
        />
      </div>

      <div className="page-width" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div
          className={`hero-banner__content animate-fade-up ${isVisible ? "is-visible" : ""}`}
        >
          <h2 className="hero-banner__heading heading-bold">
            Made for<em> Pets </em>
          </h2>
          <p className="hero-banner__text">
            Discover a curated selection of high-quality food, accessories, and
            toys designed to keep your furry friends happy and healthy. Every
            product is crafted with love and care for your pet&apos;s well-being.
          </p>
          <a href="/collections" className="button button--primary hero-banner__button">
            Explore the Collections
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
