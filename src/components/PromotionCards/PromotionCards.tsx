"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./PromotionCards.css";

const promoCards = [
  {
    image: "/images/categories/dog-accessorize.jpg",
    title: "Dog Accessories",
    sale: "30% sale",
    href: "/collections/dog-accessories",
  },
  {
    image: "/images/categories/cat-accessorize.jpg",
    title: "Cat Accessories",
    sale: "25% sale",
    href: "/collections/cat-accessories",
  },
  {
    image: "/images/categories/dog-toys.jpg",
    title: "Dog Toys",
    sale: "15% Sale",
    href: "/collections/dog-toys",
  },
];

export default function PromotionCards() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="promotion-cards-section" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <h2 className="promotion-cards__title heading-bold">Top Offers of the Week</h2>
        <div className="promotion-cards__grid">
          {promoCards.map((card) => (
            <a key={card.title} href={card.href} className="promo-card">
              <div className="promo-card__media">
                <img src={card.image} alt={card.title} width={1420} height={1065} loading="lazy" />
              </div>
              <div className="promo-card__text">
                <span className="promo-card__sale">{card.sale}</span>
                <h3 className="promo-card__name heading-bold">{card.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
