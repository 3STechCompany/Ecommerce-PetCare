"use client";
import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard/ProductCard";
import "./CollectionTabs.css";

const tabs = [
  { label: "Cat Accessories", collection: "cat-accessories" },
  { label: "Dog Toys", collection: "dog-toys" },
  { label: "Cat Food", collection: "cat-food" },
];

export default function CollectionTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [gliderStyle, setGliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const parent = el.parentElement;
      if (parent) {
        setGliderStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      }
    }
  }, [activeTab]);

  const filteredProducts = products.filter(
    (p) => p.collection === tabs[activeTab].collection
  );

  return (
    <section className="collection-tabs color-scheme-2" ref={ref}>
      <div className={`page-width animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="collection-tabs__title">
          <h2 className="heading-bold">Essentials for Happy Paws</h2>
        </div>

        <div className="collection-tabs__nav">
          {tabs.map((tab, i) => (
            <button
              key={tab.collection}
              ref={(el) => { tabRefs.current[i] = el; }}
              className={`collection-tabs__tab ${i === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
              <span className="tab-count">
                {products.filter((p) => p.collection === tab.collection).length}
              </span>
            </button>
          ))}
          <div
            className="collection-tabs__glider"
            style={{
              left: `${gliderStyle.left}px`,
              width: `${gliderStyle.width}px`,
            }}
          />
        </div>

        <div className="collection-tabs__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="collection-tabs__dots">
          {tabs.map((_, i) => (
            <button
              key={i}
              className={`collection-tabs__dot ${i === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
              aria-label={`Tab ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
