// ============================================================
// META (FACEBOOK) PIXEL — helper để bắn custom events
// Pixel ID: 1916025166045273
// Base code (init + PageView) nằm ở components/FacebookPixel/FacebookPixel.tsx
// ============================================================

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface CheckoutEventParams {
  value: number;
  currency: string;
  numItems: number;
  contentIds?: string[];
}

// Bắn sự kiện chuẩn "InitiateCheckout" khi khách bấm nút Checkout
export function trackInitiateCheckout({ value, currency, numItems, contentIds }: CheckoutEventParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", "InitiateCheckout", {
    value,
    currency,
    num_items: numItems,
    content_ids: contentIds,
    content_type: "product",
  });
}
