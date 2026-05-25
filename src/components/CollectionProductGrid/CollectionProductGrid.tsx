"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./CollectionProductGrid.css";

interface Product {
  id: string;
  title: string;
  href: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  hoverImage?: string;
  badge?: string;
}

interface CollectionProductGridProps {
  products: Product[];
}

function parseSalePercentage(price: string, compareAt: string): string {
  const parse = (p: string) => parseFloat(p.replace(/[^0-9.,]/g, "").replace(",", "."));
  const current = parse(price);
  const original = parse(compareAt);
  if (original > current) {
    return `-${Math.round(((original - current) / original) * 100)}%`;
  }
  return "";
}

export default function CollectionProductGrid({ products }: CollectionProductGridProps) {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section className="collection-product-grid" ref={ref}>
      <div className="page-width">
        <ul className={`product-grid animate-fade-up ${isVisible ? "is-visible" : ""}`}>
          {products.map((product, index) => (
            <li
              key={product.id}
              className="product-grid__item"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <a href={product.href} className="product-card-link">
                <div className="product-card-v2">
                  {/* Media */}
                  <div className="product-card-v2__media">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-card-v2__img product-card-v2__img--primary"
                      width={533}
                      height={533}
                      loading="lazy"
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt={product.title}
                        className="product-card-v2__img product-card-v2__img--hover"
                        width={533}
                        height={533}
                        loading="lazy"
                      />
                    )}

                    {/* Badges */}
                    <div className="product-card-v2__badges">
                      {product.compareAtPrice && (
                        <span className="product-badge product-badge--sale">
                          {parseSalePercentage(product.price, product.compareAtPrice)}
                        </span>
                      )}
                      {product.badge === "new" && (
                        <span className="product-badge product-badge--new">new</span>
                      )}
                      {product.badge === "sale" && !product.compareAtPrice && (
                        <span className="product-badge product-badge--sale">sale</span>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="product-card-v2__actions">
                      <button className="product-action-btn product-action-btn--view" aria-label="Quick view">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" d="M2,10 Q6,5 10,5 Q14,5 18,10 Q14,15 10,15 Q6,15 2,10" />
                          <path strokeLinecap="round" d="M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61931 12.5 7.50002 11.3807 7.50002 10C7.50002 8.6193 8.61931 7.50001 10 7.50001C11.3807 7.50001 12.5 8.6193 12.5 10Z" />
                        </svg>
                      </button>
                      <button className="product-action-btn product-action-btn--add" aria-label="Add to cart">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="product-card-v2__info">
                    <h3 className="product-card-v2__title heading-bold">{product.title}</h3>
                    <div className="product-card-v2__price-row">
                      <span className={`product-card-v2__price ${product.compareAtPrice ? "on-sale" : ""}`}>
                        {product.price}
                      </span>
                      {product.compareAtPrice && (
                        <s className="product-card-v2__compare-price">{product.compareAtPrice}</s>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
