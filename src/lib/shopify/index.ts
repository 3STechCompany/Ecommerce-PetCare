// ============================================================
// SHOPIFY STOREFRONT API - Public API Functions
// Import file này để dùng trong Server Components (page.tsx)
// ============================================================

import { shopifyFetch } from "./client";
import {
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCTS,
  GET_COLLECTION_BY_HANDLE,
} from "./queries";
import type {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyImage,
} from "./types";
import type { ProductDetail, ProductVariant } from "@/data/productDetails";

// ============================================================
// HELPER: Format giá tiền từ Shopify
// ============================================================

export function formatShopifyPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${currencyCode} ${num.toFixed(2)}`;
  }
}

// Nhiều sản phẩm trong catalog có compareAtPrice == price (không phải giảm giá thật).
// Chỉ trả về compareAtPrice đã format nếu nó thực sự LỚN HƠN giá bán.
export function getValidCompareAtPrice(
  amount: string,
  compareAmount: string | null | undefined,
  currencyCode: string
): string | undefined {
  if (!compareAmount) return undefined;
  if (parseFloat(compareAmount) <= parseFloat(amount)) return undefined;
  return formatShopifyPrice(compareAmount, currencyCode);
}

// ============================================================
// HELPER: Chuẩn hoá connection edge → array
// ============================================================

function edgesToNodes<T>(edges: { node: T }[]): T[] {
  return edges.map((e) => e.node);
}

// ============================================================
// HELPER: Chuyển đổi dữ liệu Shopify → ProductDetail
// Để tương thích với các component hiện có (ProductInfo, StickyAddToCart…)
// ============================================================

export function transformShopifyProduct(raw: RawShopifyProduct): ProductDetail {
  const images: ShopifyImage[] = edgesToNodes(raw.images.edges);
  const variants: ShopifyProductVariant[] = edgesToNodes(raw.variants.edges);
  const firstVariant = variants[0];

  const mappedVariants: ProductVariant[] = variants.map((v) => ({
    // ⚠️ id ở đây là Shopify GID ("gid://shopify/ProductVariant/...")
    // CartContext sẽ dùng id này trực tiếp làm merchandiseId trong cartLinesAdd
    id: v.id,
    label: v.selectedOptions.map((o) => o.value).join(" / ") || v.title,
    price: formatShopifyPrice(v.price.amount, v.price.currencyCode),
    compareAtPrice: getValidCompareAtPrice(
      v.price.amount,
      v.compareAtPrice?.amount,
      v.compareAtPrice?.currencyCode ?? v.price.currencyCode
    ),
    image: v.image?.url ?? images[0]?.url ?? "",
    available: v.availableForSale,
  }));

  const firstCompareAtPrice = firstVariant
    ? getValidCompareAtPrice(
        firstVariant.price.amount,
        firstVariant.compareAtPrice?.amount,
        firstVariant.compareAtPrice?.currencyCode ?? firstVariant.price.currencyCode
      )
    : undefined;
  const hasDiscount = !!firstCompareAtPrice;

  return {
    slug: raw.handle,
    title: raw.title,
    vendor: "Flux-Paws",
    description: raw.description,
    tags: raw.tags,
    images: images.map((img) => img.url),
    price: firstVariant
      ? formatShopifyPrice(firstVariant.price.amount, firstVariant.price.currencyCode)
      : "",
    compareAtPrice: firstCompareAtPrice,
    badge: hasDiscount ? "Sale" : undefined,
    taxNote: "Tax included.",
    // Storefront API không trả về inventory count → hiển thị 0 (component sẽ dùng availableForSale)
    inventory: firstVariant?.availableForSale ? 99 : 0,
    variants: mappedVariants,
    nutritionalInfo: [],
    accordionTabs: [
      {
        id: "shipping",
        title: "Shipping & Returns",
        icon: "truck",
        content:
          "Free returns within <strong>30 days</strong> of purchase. Refund to original payment method.",
      },
      {
        id: "support",
        title: "24/7 Support",
        icon: "headset",
        content:
          "Contact us through our support channels. We respond within 24 hours.",
      },
    ],
    complementaryProducts: [],
    deliveryDays: { earliest: 3, latest: 7 },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: raw.title, href: `/products/${raw.handle}` },
    ],
  };
}

// ============================================================
// KIỂU DỮ LIỆU RAW TỪ SHOPIFY (connection pattern)
// ============================================================

interface RawShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
}

// ============================================================
// API: Lấy một sản phẩm theo handle (dùng trong /products/[slug])
// ============================================================

export async function fetchProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: RawShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    cache: "no-store",
  });

  const raw = data.product;
  if (!raw) return null;

  return {
    id: raw.id,
    title: raw.title,
    handle: raw.handle,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    tags: raw.tags,
    images: edgesToNodes(raw.images.edges),
    variants: edgesToNodes(raw.variants.edges),
    priceRange: raw.priceRange,
  };
}

/**
 * Fetch product VÀ trả về dạng ProductDetail (sẵn sàng truyền vào component).
 * Đây là hàm chính dùng trong page.tsx của product detail.
 */
export async function fetchProductDetailByHandle(
  handle: string
): Promise<ProductDetail | null> {
  const data = await shopifyFetch<{ product: RawShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    cache: "no-store",
  });

  const raw = data.product;
  if (!raw) return null;

  return transformShopifyProduct(raw);
}

// ============================================================
// API: Lấy danh sách sản phẩm (dùng cho trang listing, homepage)
// ============================================================

export async function fetchProducts(
  first = 12,
  query?: string
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: RawShopifyProduct }[] };
  }>({
    query: GET_PRODUCTS,
    variables: { first, query },
    cache: "no-store",
  });

  return data.products.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    handle: e.node.handle,
    description: e.node.description,
    descriptionHtml: e.node.descriptionHtml ?? "",
    tags: e.node.tags,
    images: edgesToNodes(e.node.images.edges),
    variants: edgesToNodes(e.node.variants.edges),
    priceRange: e.node.priceRange,
  }));
}

// ============================================================
// API: Lấy collection theo handle (dùng cho /collections/[slug])
// ============================================================

export async function fetchCollectionByHandle(handle: string, first = 24) {
  const data = await shopifyFetch<{
    collection: {
      id: string;
      title: string;
      handle: string;
      description: string;
      image: ShopifyImage | null;
      products: { edges: { node: RawShopifyProduct }[] };
    } | null;
  }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first },
    cache: "no-store",
  });

  const col = data.collection;
  if (!col) return null;

  return {
    id: col.id,
    title: col.title,
    handle: col.handle,
    description: col.description,
    image: col.image,
    products: col.products.edges.map((e) => ({
      id: e.node.id,
      title: e.node.title,
      handle: e.node.handle,
      description: e.node.description,
      tags: e.node.tags,
      images: edgesToNodes(e.node.images.edges),
      variants: edgesToNodes(e.node.variants.edges),
      priceRange: e.node.priceRange,
    })),
  };
}
