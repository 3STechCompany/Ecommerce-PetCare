"use client";
import { useState } from "react";
import type { NutritionalRow } from "@/data/productDetails";
import "./ProductAccordion.css";

interface Tab {
  id: string;
  title: string;
  icon?: string;
  content: string;
}

interface ProductAccordionProps {
  tabs: Tab[];
  nutritionalInfo?: NutritionalRow[];
}

const ICONS: Record<string, React.ReactNode> = {
  truck: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="currentColor" /></svg>
  ),
  headset: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" fill="currentColor" /></svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" fill="currentColor" /></svg>
  ),
};

export default function ProductAccordion({ tabs, nutritionalInfo }: ProductAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="product-accordion">
      {tabs.map((tab) => (
        <div key={tab.id} className={`accordion-item ${openId === tab.id ? "open" : ""}`}>
          <button
            className={`accordion-item__trigger ${tab.id === "nutritional" ? "color-scheme-2" : ""}`}
            onClick={() => toggle(tab.id)}
            aria-expanded={openId === tab.id}
          >
            <div className="accordion-item__title-wrap">
              {tab.icon && ICONS[tab.icon] && (
                <span className="accordion-item__icon">{ICONS[tab.icon]}</span>
              )}
              <h4 className="accordion-item__title">{tab.title}</h4>
            </div>
            <svg className="accordion-item__caret" viewBox="0 0 10 6" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" />
            </svg>
          </button>
          <div className="accordion-item__content">
            <div className="accordion-item__inner">
              {tab.id === "nutritional" && nutritionalInfo ? (
                <div className="nutritional-table">
                  <div className="nutritional-table__header">
                    <span>Typical values</span>
                    <span>Per 100g</span>
                  </div>
                  {nutritionalInfo.map((row, i) => (
                    <div key={i} className={`nutritional-table__row ${row.indented ? "indented" : ""}`}>
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: tab.content }} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
