"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Emma Anderson",
    text: "The Oasis Tunnel is the best investment I made for my cat. She spends hours playing and napping inside it. The quality is amazing, and it looks so stylish in our apartment!",
    rating: 5,
    avatar: "/images/team/team-1.jpg",
    productImage: "/images/products/testimonial-oasis-tunnel.webp",
    productTitle: "Oasis Tunnel",
    productLink: "/products/oasis-tunnel",
  },
  {
    id: 2,
    name: "Oliver Thompson",
    text: "The Natural Dental Sticks have transformed my dog's dental hygiene. They love the taste, and I can already see improvements in their breath and gum health!",
    rating: 5,
    avatar: "/images/team/team-3.jpg",
    productImage: "/images/products/testimonial-mellow-dream.webp",
    productTitle: "Mellow Dream",
    productLink: "/products/mellow-dream",
  },
  {
    id: 3,
    name: "Sophia Johnson",
    text: "Since switching to Mellow Dream, my cat's calmness has noticeably improved. She's more relaxed and sleeps better through the night. The natural ingredients really make a difference—highly recommend!",
    rating: 5,
    avatar: "/images/team/team-2.jpg",
    productImage: "/images/products/testimonial-mellow-dream-2.webp",
    productTitle: "Mellow Dream",
    productLink: "/products/mellow-dream",
  },
  {
    id: 4,
    name: "Liam Wilson",
    text: "The waterproof raincoat keeps my dog dry and comfortable during rainy walks. It fits perfectly and doesn't restrict movement. Plus, it's easy to put on and take off — highly recommend!",
    rating: 5,
    avatar: "/images/team/team-6.jpg",
    productImage: "/images/products/testimonial-raincoat.webp",
    productTitle: "Waterproof Dog Raincoat",
    productLink: "/products/waterproof-dog-raincoat",
  },
];

function StarRating() {
  return (
    <div className="testimonial-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="star-icon">
          <path d="M10 1l2.39 4.84L17.3 6.9l-3.5 3.41.83 4.82L10 12.9l-4.63 2.23.83-4.82-3.5-3.41 4.91-1.06L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="testimonials-section color-scheme-2" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <h2 className="heading-bold center testimonials-heading">
          What Pet Parents Say
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testimonial-card animate-fade-up delay-${(i + 1) * 100} ${isVisible ? "is-visible" : ""}`}
            >
              <div className="testimonial-card__inner">
                <div className="testimonial-card__left">
                  <div className="testimonial-product">
                    <a href={t.productLink} className="testimonial-product__image">
                      <img src={t.productImage} alt={t.productTitle} width={80} height={80} loading="lazy" />
                    </a>
                    <h4 className="testimonial-product__title">
                      <a href={t.productLink}>{t.productTitle}</a>
                    </h4>
                  </div>
                  <StarRating />
                  <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                  <h3 className="testimonial-name heading-bold">{t.name}</h3>
                </div>
                <div className="testimonial-card__right">
                  <div className="testimonial-avatar">
                    <img src={t.avatar} alt={t.name} width={200} height={200} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
