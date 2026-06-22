"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHidden(false);
    const timer = setTimeout(() => setHidden(true), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`page-loader ${hidden ? "hidden" : ""}`}>
      <div className="page-loader__bar" />
      <div className="page-loader__text">Paws...</div>
    </div>
  );
}
