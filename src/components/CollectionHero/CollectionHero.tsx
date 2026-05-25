"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./CollectionHero.css";

interface CollectionHeroProps {
  title: string;
  heroImage: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function CollectionHero({ title, heroImage, breadcrumbs }: CollectionHeroProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="collection-hero" ref={ref}>
      <div className="collection-hero__media">
        <img src={heroImage} alt={title} width={2600} height={1200} />
      </div>

      <div className="collection-hero__content page-width">
        <div className={`collection-hero__inner animate-fade-up ${isVisible ? "is-visible" : ""}`}>
          <nav className="collection-hero__breadcrumbs" aria-label="Breadcrumbs">
            <ol>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href}>
                  {i < breadcrumbs.length - 1 ? (
                    <a href={crumb.href}>{crumb.label}</a>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="collection-hero__title heading-bold">{title}</h1>
        </div>
      </div>
    </section>
  );
}
