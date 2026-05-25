"use client";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./InfoCards.css";

const cards = [
  {
    id: 1,
    title: "Functional Design",
    image: "/images/info/functional-design.jpg",
    text: "Our products are thoughtfully engineered with both you and your furry friends in mind. Every feature serves a practical purpose, from easy-to-clean surfaces to durable materials that withstand playful antics.",
  },
  {
    id: 2,
    title: "Stylish Seating",
    image: "/images/info/stylish-seating.jpg",
    text: "Give your beloved companion the gift of a luxurious resting place that doesn't just provide comfort but also elevates your home's aesthetic. Our seating combines plush fabrics with modern designs.",
  },
  {
    id: 3,
    title: "Cozy Outfit",
    image: "/images/info/cozy-outfit.jpg",
    text: "Comfort meets functionality in our carefully curated collection of pet apparel designed to keep your furry friends warm, safe, and looking their best with soft, breathable fabrics.",
  },
  {
    id: 4,
    title: "Adorable & Comfortable",
    image: "/images/info/adorable-comfortable.jpg",
    text: "Why choose between style and comfort when you can have both? Our adorable collection provides maximum coziness while keeping your pet looking irresistibly cute.",
  },
];

export default function InfoCards() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="section" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="info-cards">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`info-card ${expandedId === card.id ? "expanded" : ""}`}
              onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === card.id}
            >
              <div className="info-card__content">
                {expandedId === card.id && (
                  <button
                    className="info-card__close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(null);
                    }}
                    aria-label="Close"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </button>
                )}
                <div className="info-card__header">
                  <div className="info-card__image">
                    <img src={card.image} alt={card.title} loading="lazy" width={900} height={675} />
                  </div>
                  <h3 className="info-card__title">{card.title}</h3>
                </div>
                <div className="info-card__body">
                  <p>{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
