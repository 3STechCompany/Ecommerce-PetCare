// ============================================================
// TRANG CHI TIẾT SẢN PHẨM - /products/[slug]
//
// Server Component: fetch dữ liệu từ Shopify Storefront API
// trên server → SEO tốt, tải nhanh, không lộ token
//
// Variant.id là Shopify GID → CartContext dùng trực tiếp
// khi gọi cartLinesAdd (không cần map thêm)
// ============================================================

import { fetchProductDetailByHandle, fetchProducts } from "@/lib/shopify";
import { formatShopifyPrice } from "@/lib/shopify";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ScrollingText from "@/components/ScrollingText/ScrollingText";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import RichText from "@/components/RichText/RichText";
import ProductComparisonSlider from "@/components/ProductComparisonSlider/ProductComparisonSlider";
import ProductFaqSection from "@/components/ProductFaqSection/ProductFaqSection";
import RecentlyViewedProducts from "@/components/RecentlyViewedProducts/RecentlyViewedProducts";
import QuickInfoBar from "@/components/QuickInfoBar/QuickInfoBar";
import StickyAddToCart from "@/components/StickyAddToCart/StickyAddToCart";
import { notFound } from "next/navigation";
import type { Product } from "@/data/products";

const BASE_URL = "https://petcare3s.shop";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductDetailByHandle(slug);
  if (!product) return {};

  const description = product.description.slice(0, 160);
  const image = product.images[0];
  const url = `${BASE_URL}/products/${slug}`;

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      url,
      title: product.title,
      description,
      images: image ? [{ url: image, width: 800, height: 800, alt: product.title }] : [],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: product.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, allProducts] = await Promise.all([
    fetchProductDetailByHandle(slug),
    fetchProducts(12),
  ]);

  if (!product) notFound();

  // Related & recently viewed: real API products excluding current
  const otherProducts: Product[] = allProducts
    .filter((p) => p.handle !== slug)
    .map((p) => ({
      id: p.id,
      title: p.title,
      href: `/products/${p.handle}`,
      price: p.variants[0]
        ? formatShopifyPrice(p.variants[0].price.amount, p.variants[0].price.currencyCode)
        : "—",
      image: p.images[0]?.url ?? "",
      hoverImage: p.images[1]?.url,
      collection: "related",
      available: p.variants[0]?.availableForSale ?? false,
      variantId: p.variants[0]?.id,
    }));

  const relatedProducts = otherProducts.slice(0, 4);
  const recentProducts  = otherProducts.slice(4, 8);

  // JSON-LD Product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    url: `${BASE_URL}/products/${slug}`,
    brand: { "@type": "Brand", name: "Petcare3s" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.replace(/[^0-9.]/g, ""),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Petcare3s" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}/collections/all` },
        { "@type": "ListItem", position: 3, name: product.title, item: `${BASE_URL}/products/${slug}` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductInfo product={product} />

      <div className="wave-separator">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path fill="#e3f1f8" fillOpacity="1" d="M0,100 C180,20 360,140 540,80 C720,20 900,140 1080,80 C1260,20 1440,140 1440,80 L1440,120 L0,120Z" />
        </svg>
      </div>

      <ScrollingText texts={["All your furry friend's needs — treats to toys.", "Care and joy for every paw.", "Quality essentials for happy, healthy pets."]} />

      <RelatedProducts products={relatedProducts} />
      <RichText />
      <ProductComparisonSlider />
      <ProductFaqSection />

      <ScrollingText texts={["All your furry friend's needs — treats to toys.", "Care and joy for every paw.", "Quality essentials for happy, healthy pets."]} />

      <RecentlyViewedProducts products={recentProducts} />
      <QuickInfoBar />
      <StickyAddToCart product={product} />
    </>
  );
}
