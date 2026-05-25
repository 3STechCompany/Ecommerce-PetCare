"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-loader ${hidden ? "hidden" : ""}`}>
      <div className="page-loader__bar" />
      <div className="page-loader__text">Paws...</div>
    </div>
  );
}
