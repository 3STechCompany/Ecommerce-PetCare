"use client";
import "../ScrollingText/ScrollingText.css";

interface ScrollingTextHomeProps {
  texts: string[];
  separator?: "hexagon" | "diamond";
}

export default function ScrollingTextHome({ texts, separator = "hexagon" }: ScrollingTextHomeProps) {
  const items = [...texts, ...texts, ...texts];

  return (
    <section className="scrolling-text color-scheme-2">
      <div className="scrolling-text__track">
        <div className="scrolling-text__content">
          {items.map((text, i) => (
            <span key={i} className="scrolling-text__item">
              <span>{text}</span>
              {separator === "hexagon" ? (
                <svg className="scrolling-text__diamond" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 19,7 19,17 12,22 5,17 5,7" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg className="scrolling-text__diamond" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2 L20 12 L12 22 L4 12 Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
