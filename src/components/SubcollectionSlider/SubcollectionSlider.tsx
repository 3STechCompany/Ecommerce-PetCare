"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./SubcollectionSlider.css";

interface Subcollection {
  id: string;
  title: string;
  href: string;
  image: string;
}

interface SubcollectionSliderProps {
  subcollections: Subcollection[];
}

export default function SubcollectionSlider({ subcollections }: SubcollectionSliderProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="subcollection-slider" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="subcollection-slider__grid">
          {subcollections.map((sub) => (
            <a key={sub.id} href={sub.href} className="subcollection-card">
              <div className="subcollection-card__media">
                <img src={sub.image} alt={sub.title} width={750} height={750} loading="lazy" />
              </div>
              <div className="subcollection-card__info color-scheme-2">
                <h3 className="subcollection-card__title heading-bold">{sub.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
