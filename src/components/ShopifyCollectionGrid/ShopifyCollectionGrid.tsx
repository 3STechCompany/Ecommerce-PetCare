"use client";
// ============================================================
// SHOPIFY COLLECTION GRID
//
// Component tự-fetch dữ liệu sản phẩm từ Shopify Storefront API
// theo collectionHandle, render grid đẹp với:
//   • Skeleton loading (12 placeholder cards trong lúc đợi)
//   • Hover image swap (ảnh thứ 2 hiện khi hover)
//   • Quick Add to Cart (thêm variant đầu tiên vào giỏ ngay trên listing)
//   • Toast notification sau khi add thành công
//   • Client-side sort (giá, tên)
//   • Sale badge tự tính %
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTION_BY_HANDLE, GET_PRODUCTS_BY_TAG } from "@/lib/shopify/queries";
import { useCart } from "@/context/CartContext";
import { formatShopifyPrice } from "@/lib/shopify";
import "@/components/CollectionProductGrid/CollectionProductGrid.css";
import "./ShopifyCollectionGrid.css";

// ── Kiểu dữ liệu nội bộ sau khi chuẩn hoá từ GraphQL response ──
interface CollectionProduct {
  id: string;
  title: string;
  handle: string;
  primaryImage: { url: string; altText: string | null } | null;
  hoverImage:   { url: string; altText: string | null } | null;
  // variant đầu tiên – dùng để Quick Add to Cart
  firstVariantId: string | null;
  availableForSale: boolean;
  price: string;           // Đã format: "$9.99"
  compareAtPrice: string | null; // null nếu không có discount
  salePercent: string | null;    // "-25%" hoặc null
  tags: string[];
}

// ── Sort options ──
const SORT_OPTIONS = [
  { label: "Featured",       value: "featured"   },
  { label: "Price: Low–High", value: "price-asc"  },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Name: A–Z",      value: "title-asc"  },
  { label: "Name: Z–A",      value: "title-desc" },
] as const;

type SortValue = typeof SORT_OPTIONS[number]["value"];

// ── Props ──
interface Props {
  collectionHandle: string;
  limit?: number;            // số sản phẩm tối đa lấy từ Shopify (mặc định 24)
  skeletonCount?: number;    // số skeleton cards khi loading (mặc định 12)
  fallbackTag?: string;      // tag Shopify dùng khi collection chưa được tạo, vd: "cat"
}

// ── Helper: tính % giảm giá ──
function calcSalePercent(price: string, compareAt: string): string | null {
  const a = parseFloat(price);
  const b = parseFloat(compareAt);
  if (b > a && b > 0) {
    return `-${Math.round(((b - a) / b) * 100)}%`;
  }
  return null;
}

// ── Helper: sort products ──
function sortProducts(products: CollectionProduct[], sort: SortValue): CollectionProduct[] {
  const arr = [...products];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, "")));
    case "price-desc":
      return arr.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, "")));
    case "title-asc":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return arr.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return arr; // "featured" → giữ thứ tự Shopify trả về
  }
}

// ── Skeleton card ──
function SkeletonCard() {
  return (
    <li className="product-grid__item">
      <div className="skeleton-card">
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-price" />
      </div>
    </li>
  );
}

// ============================================================
// COMPONENT CHÍNH
// ============================================================
export default function ShopifyCollectionGrid({
  collectionHandle,
  limit = 24,
  skeletonCount = 12,
  fallbackTag,
}: Props) {
  const [products, setProducts]     = useState<CollectionProduct[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [sort, setSort]             = useState<SortValue>("featured");

  // Quản lý trạng thái "đang thêm" cho từng sản phẩm
  const [addingId, setAddingId]     = useState<string | null>(null);
  const [addedId, setAddedId]       = useState<string | null>(null);

  // Toast notification
  const [toast, setToast]           = useState<string | null>(null);
  const toastTimer                  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { addToCart } = useCart();

  // ── Fetch dữ liệu từ Shopify khi collectionHandle thay đổi ──
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    type ProductNode = {
      id: string;
      title: string;
      handle: string;
      tags: string[];
      images: { edges: { node: { url: string; altText: string | null } }[] };
      variants: {
        edges: {
          node: {
            id: string;
            availableForSale: boolean;
            price: { amount: string; currencyCode: string };
            compareAtPrice: { amount: string; currencyCode: string } | null;
          };
        }[];
      };
    };

    function normalizeEdges(edges: { node: ProductNode }[]): CollectionProduct[] {
      return edges.map(({ node }) => {
        const imgs    = node.images.edges.map((e) => e.node);
        const variant = node.variants.edges[0]?.node ?? null;

        const priceAmount   = variant?.price.amount              ?? "0";
        const compareAmount = variant?.compareAtPrice?.amount    ?? null;
        const currencyCode  = variant?.price.currencyCode        ?? "USD";

        return {
          id:               node.id,
          title:            node.title,
          handle:           node.handle,
          primaryImage:     imgs[0] ?? null,
          hoverImage:       imgs[1] ?? null,
          firstVariantId:   variant?.id ?? null,
          availableForSale: variant?.availableForSale ?? false,
          price:            formatShopifyPrice(priceAmount, currencyCode),
          compareAtPrice:   compareAmount ? formatShopifyPrice(compareAmount, currencyCode) : null,
          salePercent:      compareAmount ? calcSalePercent(priceAmount, compareAmount) : null,
          tags:             node.tags,
        };
      });
    }

    // Thử fetch collection trước
    shopifyFetch<{ collection: { products: { edges: { node: ProductNode }[] } } | null }>({
      query: GET_COLLECTION_BY_HANDLE,
      variables: { handle: collectionHandle, first: limit },
    })
      .then(async (data) => {
        if (cancelled) return;

        // Collection tồn tại → dùng ngay
        if (data.collection) {
          setProducts(normalizeEdges(data.collection.products.edges));
          return;
        }

        // Collection null → fallback sang tag query nếu có
        if (fallbackTag) {
          const tagData = await shopifyFetch<{ products: { edges: { node: ProductNode }[] } }>({
            query: GET_PRODUCTS_BY_TAG,
            variables: { query: `tag:${fallbackTag}`, first: limit },
          });
          if (!cancelled) setProducts(normalizeEdges(tagData.products.edges));
          return;
        }

        // Không có fallback → báo lỗi
        setError(
          `Collection "${collectionHandle}" chưa được tạo trên Shopify Admin.\n` +
          `Vào Shopify Admin → Collections → tạo collection có handle "${collectionHandle}".`
        );
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(`Lỗi Shopify API: ${msg}`);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [collectionHandle, fallbackTag, limit]);

  // ── Toast helper ──
  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  // ── Quick Add to Cart ──
  // Thêm variant đầu tiên (availableForSale) vào giỏ hàng Shopify
  // variantId là Shopify GID → CartContext.addToCart gửi thẳng vào cartLinesAdd mutation
  const handleQuickAdd = useCallback(
    async (product: CollectionProduct) => {
      if (!product.firstVariantId || !product.availableForSale) return;

      setAddingId(product.id);
      try {
        await addToCart(product.firstVariantId, 1);
        setAddedId(product.id);
        showToast(`"${product.title}" added to cart ✓`);
        setTimeout(() => setAddedId(null), 1600);
      } catch {
        showToast("Failed to add to cart. Please try again.");
      } finally {
        setAddingId(null);
      }
    },
    [addToCart, showToast]
  );

  // ── Sorted products ──
  const displayProducts = sortProducts(products, sort);

  // ============================
  // RENDER: Loading skeleton
  // ============================
  if (isLoading) {
    return (
      <section className="shopify-cg">
        <div className="page-width">
          {/* Toolbar skeleton */}
          <div className="shopify-cg__toolbar">
            <div className="skeleton" style={{ width: "12rem", height: "1.4rem" }} />
            <div className="skeleton" style={{ width: "16rem", height: "3.2rem", borderRadius: "3rem" }} />
          </div>
          {/* Card skeletons */}
          <ul className="product-grid">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  // ============================
  // RENDER: Error
  // ============================
  if (error) {
    return (
      <section className="shopify-cg">
        <div className="page-width">
          <pre className="shopify-cg__error" style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
            {error}
          </pre>
          <a
            href={`/api/shopify-debug?handle=${collectionHandle}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block", marginTop: "1rem", color: "var(--color-accent, #c8273d)", textDecoration: "underline" }}
          >
            Open Shopify Debug →
          </a>
        </div>
      </section>
    );
  }

  // ============================
  // RENDER: Empty collection
  // ============================
  if (displayProducts.length === 0) {
    return (
      <section className="shopify-cg">
        <div className="page-width">
          <p className="shopify-cg__empty">
            Collection <strong>{collectionHandle}</strong> không có sản phẩm nào.
            <br />
            <small>
              Kiểm tra Shopify Admin → Collections → chọn collection → thêm sản phẩm + publish to Storefront channel.
              {" "}
              <a
                href={`/api/shopify-debug?handle=${collectionHandle}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--color-accent, #c8273d)" }}
              >
                Debug API →
              </a>
            </small>
          </p>
        </div>
      </section>
    );
  }

  // ============================
  // RENDER: Product grid
  // ============================
  return (
    <section className="shopify-cg">
      <div className="page-width">

        {/* ── Toolbar: count + sort ── */}
        <div className="shopify-cg__toolbar">
          <p className="shopify-cg__count">
            {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""}
          </p>

          <div className="shopify-cg__sort">
            <label htmlFor="cg-sort">Sort by</label>
            <select
              id="cg-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Product grid ── */}
        <ul className="product-grid animate-fade-up is-visible">
          {displayProducts.map((product, index) => {
            const isAdding  = addingId === product.id;
            const isAdded   = addedId  === product.id;

            return (
              <li
                key={product.id}
                className="product-grid__item"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="product-card-v2">

                  {/* ── Media ── */}
                  <div className="product-card-v2__media">
                    {/* Ảnh chính */}
                    {product.primaryImage && (
                      <Image
                        src={product.primaryImage.url}
                        alt={product.primaryImage.altText ?? product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="product-card-v2__img product-card-v2__img--primary"
                        loading="lazy"
                      />
                    )}

                    {/* Ảnh hover (ảnh thứ 2 từ Shopify) */}
                    {product.hoverImage && (
                      <Image
                        src={product.hoverImage.url}
                        alt={product.hoverImage.altText ?? product.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="product-card-v2__img product-card-v2__img--hover"
                        loading="lazy"
                      />
                    )}

                    {/* ── Badges ── */}
                    <div className="product-card-v2__badges">
                      {product.salePercent && (
                        <span className="product-badge product-badge--sale">
                          {product.salePercent}
                        </span>
                      )}
                      {!product.availableForSale && (
                        <span className="product-badge" style={{ left:"1rem", background:"#eee", color:"#666" }}>
                          Sold out
                        </span>
                      )}
                    </div>

                    {/* Sold-out overlay */}
                    {!product.availableForSale && (
                      <div className="product-card-v2__sold-out">
                        <span>Sold out</span>
                      </div>
                    )}

                    {/* ── Quick Actions ── */}
                    <div className="product-card-v2__actions">
                      {/* View product */}
                      <Link
                        href={`/products/${product.handle}`}
                        className="product-action-btn product-action-btn--view"
                        aria-label="View product"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width={18} height={18}>
                          <path strokeLinecap="round" d="M2,10 Q6,5 10,5 Q14,5 18,10 Q14,15 10,15 Q6,15 2,10" />
                          <circle cx="10" cy="10" r="2.5" />
                        </svg>
                      </Link>

                      {/*
                        ✅ QUICK ADD TO CART
                        Gọi CartContext.addToCart(firstVariantId, 1)
                        → shopifyFetch(CART_CREATE / CART_LINES_ADD)
                        → Shopify cập nhật cart, trả về checkoutUrl mới
                      */}
                      <button
                        className={[
                          "product-action-btn",
                          "product-action-btn--add",
                          isAdding ? "is-loading" : "",
                          isAdded  ? "is-added"   : "",
                        ].join(" ")}
                        disabled={isAdding || !product.availableForSale}
                        onClick={() => handleQuickAdd(product)}
                        aria-label={
                          isAdding ? "Adding to cart…" :
                          isAdded  ? "Added!" :
                          "Add to cart"
                        }
                      >
                        {isAdding ? (
                          /* Loading spinner */
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width={16} height={16}>
                            <path strokeLinecap="round" d="M10 3 A7 7 0 0 1 17 10" />
                          </svg>
                        ) : isAdded ? (
                          /* Check mark */
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width={16} height={16}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                          </svg>
                        ) : (
                          /* Plus icon */
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width={16} height={16}>
                            <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ── Product Info ── */}
                  <div className="product-card-v2__info">
                    <Link href={`/products/${product.handle}`} className="product-card-link">
                      <h3 className="product-card-v2__title heading-bold">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="product-card-v2__price-row">
                      <span className={`product-card-v2__price ${product.compareAtPrice ? "on-sale" : ""}`}>
                        {product.price}
                      </span>
                      {product.compareAtPrice && (
                        <s className="product-card-v2__compare-price">
                          {product.compareAtPrice}
                        </s>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Toast Notification ── */}
      <div
        className={`shopify-cg__toast ${toast ? "visible" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>
    </section>
  );
}
