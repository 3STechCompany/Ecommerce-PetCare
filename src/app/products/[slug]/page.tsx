"use client";
import { productDetails } from "@/data/productDetails";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ScrollingText from "@/components/ScrollingText/ScrollingText";
import { notFound } from "next/navigation";
import { use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = productDetails[slug];

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductInfo product={product} />

      {/* Wave Separator */}
      <div className="wave-separator">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path fill="#e3f1f8" fillOpacity="1" d="M0,100 C180,20 360,140 540,80 C720,20 900,140 1080,80 C1260,20 1440,140 1440,80 L1440,120 L0,120Z" />
        </svg>
      </div>

      {/* Scrolling Text Marquee */}
      <ScrollingText
        texts={[
          "All your furry friend's needs — treats to toys.",
          "Care and joy for every paw.",
          "Quality essentials for happy, healthy pets.",
        ]}
      />
    </>
  );
}
