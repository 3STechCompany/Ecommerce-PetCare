"use client";
import "./ScrollingText.css";

interface ScrollingTextProps {
  texts: string[];
}

export default function ScrollingText({ texts }: ScrollingTextProps) {
  const items = [...texts, ...texts, ...texts]; // Triple for seamless loop

  return (
    <section className="scrolling-text color-scheme-2">
      <div className="scrolling-text__track">
        <div className="scrolling-text__content">
          {items.map((text, i) => (
            <span key={i} className="scrolling-text__item">
              <span>{text}</span>
              <svg className="scrolling-text__diamond" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L20 12 L12 22 L4 12 Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
