// ============================================================
// TRANG CHI TIẾT SẢN PHẨM - /products/[slug]
//
// Server Component: fetch dữ liệu từ Shopify Storefront API
// trên server → SEO tốt, tải nhanh, không lộ token
//
// Variant.id là Shopify GID → CartContext dùng trực tiếp
// khi gọi cartLinesAdd (không cần map thêm)
// ============================================================

import { fetchProductDetailByHandle } from "@/lib/shopify";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ScrollingText from "@/components/ScrollingText/ScrollingText";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import RichText from "@/components/RichText/RichText";
import ProductComparisonSlider from "@/components/ProductComparisonSlider/ProductComparisonSlider";
import ProductFaqSection from "@/components/ProductFaqSection/ProductFaqSection";
import RecentlyViewedProducts from "@/components/RecentlyViewedProducts/RecentlyViewedProducts";
import QuickInfoBar from "@/components/QuickInfoBar/QuickInfoBar";
import StickyAddToCart from "@/components/StickyAddToCart/StickyAddToCart";
import { dogCollection } from "@/data/dogCollection";
import { notFound } from "next/navigation";

// Metadata động theo từng sản phẩm (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductDetailByHandle(slug);
  if (!product) return {};
  return {
    title: `${product.title} | Paws Demo`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch từ Shopify Storefront API (server-side)
  const product = await fetchProductDetailByHandle(slug);

  // Không tìm thấy sản phẩm → trang 404
  if (!product) {
    notFound();
  }

  return (
    <>
      {/* ProductInfo nhận dữ liệu đã được transform, variants.id là Shopify GID */}
      <ProductInfo product={product} />

      {/* Wave Separator */}
      <div className="wave-separator">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            fill="#e3f1f8"
            fillOpacity="1"
            d="M0,100 C180,20 360,140 540,80 C720,20 900,140 1080,80 C1260,20 1440,140 1440,80 L1440,120 L0,120Z"
          />
        </svg>
      </div>

      <ScrollingText
        texts={[
          "All your furry friend's needs — treats to toys.",
          "Care and joy for every paw.",
          "Quality essentials for happy, healthy pets.",
        ]}
      />

      <RelatedProducts products={dogCollection.products.slice(0, 4)} />
      <RichText />
      <ProductComparisonSlider />
      <ProductFaqSection />

      <ScrollingText
        texts={[
          "All your furry friend's needs — treats to toys.",
          "Care and joy for every paw.",
          "Quality essentials for happy, healthy pets.",
        ]}
      />

      <RecentlyViewedProducts products={dogCollection.products.slice(4, 8)} />
      <QuickInfoBar />

      {/* StickyAddToCart cũng dùng variant.id (Shopify GID) để addToCart */}
      <StickyAddToCart product={product} />
    </>
  );
}
