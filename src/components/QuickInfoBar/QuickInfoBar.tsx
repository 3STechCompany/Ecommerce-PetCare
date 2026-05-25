"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./QuickInfoBar.css";

const infoItems = [
  {
    icon: "/images/icons/icon-truck.webp",
    title: "Free Shipping",
    caption: "For orders over $110",
  },
  {
    icon: "/images/icons/icon-money.webp",
    title: "Money Guarantee",
    caption: "Within 30 days for an exchange.",
  },
  {
    icon: "/images/icons/icon-support.webp",
    title: "Online Support",
    caption: "24 hours a day, 7 days a week",
  },
  {
    icon: "/images/icons/icon-card.webp",
    title: "Flexible Payment",
    caption: "Pay with Multiple Credit Cards",
  },
];

export default function QuickInfoBar() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="quick-info-bar" ref={ref}>
      <div className={`page-width quick-info-bar__grid animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        {infoItems.map((item) => (
          <div key={item.title} className="quick-info-card color-scheme-2">
            <div className="quick-info-card__icon">
              <img src={item.icon} alt={item.title} width={100} height={100} loading="lazy" />
            </div>
            <div className="quick-info-card__text">
              <h3 className="quick-info-card__title heading-bold">{item.title}</h3>
              <p className="quick-info-card__caption">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
