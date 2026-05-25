"use client";
import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackRef = useCallback((node: HTMLDivElement | null) => {
    if (ref.current) {
      // cleanup
    }
    ref.current = node;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref: callbackRef, isVisible };
}
