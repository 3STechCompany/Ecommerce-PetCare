"use client";
// ============================================================
// TRANG GIỎ HÀNG - /cart
// Hiển thị toàn bộ items, cho phép sửa số lượng, xoá,
// và nút "Proceed to Checkout" redirect sang Shopify Checkout
// ============================================================

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, isLoading, cartCount, updateQuantity, removeLine, goToCheckout } =
    useCart();

  // ── Đang tải ──
  if (isLoading) {
    return (
      <div className="cart-page page-width">
        <h1 className="cart-page__title heading-bold">Your Cart</h1>
        <div className="cart-layout">
          <div className="cart-lines">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="cart-line" style={{ opacity: 0.6 }}>
                <div style={{ width: 100, height: 100, borderRadius: 8, background: "#eee" }} />
                <div>
                  <div style={{ height: 16, width: "70%", background: "#eee", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 14, width: "40%", background: "#eee", borderRadius: 4 }} />
                </div>
                <div style={{ width: 80, height: 36, background: "#eee", borderRadius: 20 }} />
                <div style={{ width: 20, height: 20, background: "#eee", borderRadius: "50%" }} />
              </div>
            ))}
          </div>
          <div className="cart-summary" style={{ opacity: 0.5 }}>
            <div style={{ height: 24, width: "60%", background: "#ddd", borderRadius: 4, marginBottom: 16 }} />
            <div style={{ height: 16, width: "100%", background: "#ddd", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 16, width: "80%", background: "#ddd", borderRadius: 4, marginBottom: 24 }} />
            <div style={{ height: 48, width: "100%", background: "#ddd", borderRadius: 40 }} />
          </div>
        </div>
        <style>{cartStyles}</style>
      </div>
    );
  }

  // ── Trạng thái giỏ trống ──
  if (!cart || cartCount === 0) {
    return (
      <div className="cart-page page-width">
        <h1 className="cart-page__title heading-bold">Your Cart</h1>
        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
          <Link href="/collections/all" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
        <style>{cartStyles}</style>
      </div>
    );
  }

  const subtotal = cart?.cost.subtotalAmount;
  const total = cart?.cost.totalAmount;

  return (
    <div className="cart-page page-width">
      <h1 className="cart-page__title heading-bold">
        Your Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
      </h1>

      <div className="cart-layout">
        {/* ── Danh sách sản phẩm ── */}
        <div className="cart-lines">
          {cart?.lines.map((line) => {
            const image = line.merchandise.product.images[0];
            const lineTotal = parseFloat(line.cost.totalAmount.amount);
            const currency = line.cost.totalAmount.currencyCode;

            return (
              <div key={line.id} className="cart-line">
                {/* Hình ảnh */}
                <div className="cart-line__image">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.altText ?? line.merchandise.product.title}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  ) : (
                    <div className="cart-line__image-placeholder" />
                  )}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="cart-line__info">
                  <Link
                    href={`/products/${line.merchandise.product.handle}`}
                    className="cart-line__product-title"
                  >
                    {line.merchandise.product.title}
                  </Link>
                  {line.merchandise.title !== "Default Title" && (
                    <p className="cart-line__variant">{line.merchandise.title}</p>
                  )}
                  <p className="cart-line__price">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency,
                    }).format(lineTotal)}
                  </p>
                </div>

                {/* Điều chỉnh số lượng */}
                <div className="cart-line__qty">
                  <button
                    className="qty-btn"
                    disabled={isLoading || line.quantity <= 1}
                    onClick={() => updateQuantity(line.id, line.quantity - 1)}
                    aria-label="Giảm số lượng"
                  >
                    −
                  </button>
                  <span className="qty-value">{line.quantity}</span>
                  <button
                    className="qty-btn"
                    disabled={isLoading}
                    onClick={() => updateQuantity(line.id, line.quantity + 1)}
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>

                {/* Nút xoá */}
                <button
                  className="cart-line__remove"
                  disabled={isLoading}
                  onClick={() => removeLine(line.id)}
                  aria-label="Xoá sản phẩm"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" width={16} height={16}>
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Tổng tiền & Checkout ── */}
        <div className="cart-summary">
          <h2 className="cart-summary__title heading-bold">Order Summary</h2>

          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>
              {subtotal
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: subtotal.currencyCode,
                  }).format(parseFloat(subtotal.amount))
                : "—"}
            </span>
          </div>

          <div className="cart-summary__row cart-summary__row--shipping">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>
              {total
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: total.currencyCode,
                  }).format(parseFloat(total.amount))
                : "—"}
            </span>
          </div>

          {/*
            ✅ NÚT CHECKOUT QUAN TRỌNG NHẤT
            Khi bấm → goToCheckout() → window.location = cart.checkoutUrl
            → Shopify Checkout page (bảo mật HTTPS, hỗ trợ Stripe/PayPal/COD)
            → Sau thanh toán thành công → Shopify webhook → CJ Dropshipping tự xử lý
          */}
          <button
            className="btn-checkout"
            disabled={isLoading || cartCount === 0}
            onClick={goToCheckout}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout →"}
          </button>

          <Link href="/" className="cart-summary__continue">
            ← Continue Shopping
          </Link>

          {/* Biểu tượng thanh toán an toàn */}
          <div className="cart-trust">
            <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14}>
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <span>Secure checkout powered by Shopify</span>
          </div>
        </div>
      </div>

      <style>{cartStyles}</style>
    </div>
  );
}

// ── Inline styles gọn nhẹ cho trang cart ──
const cartStyles = `
  .cart-page {
    padding: 4rem 2rem;
    min-height: 60vh;
  }
  .cart-page__title {
    font-size: 2.4rem;
    margin-bottom: 3rem;
  }
  .cart-empty {
    text-align: center;
    padding: 6rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .cart-empty p { font-size: 1.6rem; color: #666; }
  .btn-primary {
    padding: 1.2rem 3rem;
    background: rgb(var(--color-button));
    color: rgb(var(--color-button-text));
    border-radius: 4rem;
    font-size: 1.4rem;
    font-weight: 600;
    text-decoration: none;
  }
  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 4rem;
    align-items: start;
  }
  @media (max-width: 900px) {
    .cart-layout { grid-template-columns: 1fr; }
  }
  .cart-lines {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .cart-line {
    display: grid;
    grid-template-columns: 100px 1fr auto auto;
    gap: 1.6rem;
    align-items: center;
    padding: 2rem;
    background: #fafafa;
    border-radius: 1.2rem;
    border: 1px solid #eee;
  }
  @media (max-width: 600px) {
    .cart-line { grid-template-columns: 80px 1fr; }
  }
  .cart-line__image { border-radius: 8px; overflow: hidden; }
  .cart-line__image-placeholder {
    width: 100px; height: 100px;
    background: #eee; border-radius: 8px;
  }
  .cart-line__product-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(var(--color-foreground));
    text-decoration: none;
  }
  .cart-line__product-title:hover { text-decoration: underline; }
  .cart-line__variant { font-size: 1.3rem; color: #888; margin-top: 0.3rem; }
  .cart-line__price { font-size: 1.5rem; font-weight: 700; margin-top: 0.6rem; }
  .cart-line__qty {
    display: flex; align-items: center; gap: 0.8rem;
  }
  .qty-btn {
    width: 3.2rem; height: 3.2rem;
    border: 1px solid #ddd;
    border-radius: 50%;
    background: white;
    font-size: 1.8rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }
  .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .qty-value { font-size: 1.5rem; font-weight: 600; min-width: 2rem; text-align: center; }
  .cart-line__remove {
    background: none; border: none; cursor: pointer;
    color: #999; padding: 0.5rem;
    transition: color 0.2s;
  }
  .cart-line__remove:hover { color: #e00; }
  .cart-summary {
    position: sticky;
    top: 12rem;
    background: #f5f5f5;
    border-radius: 1.6rem;
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .cart-summary__title { font-size: 1.8rem; margin-bottom: 0.8rem; }
  .cart-summary__row {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .cart-summary__row--shipping { color: #888; font-style: italic; }
  .cart-summary__row--total {
    font-size: 1.7rem;
    font-weight: 700;
    border-bottom: none;
    margin-top: 0.4rem;
  }
  .btn-checkout {
    margin-top: 1rem;
    padding: 1.4rem 2rem;
    background: rgb(var(--color-button, 18 18 18));
    color: rgb(var(--color-button-text, 255 255 255));
    border: none;
    border-radius: 4rem;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.2s;
  }
  .btn-checkout:hover { opacity: 0.85; }
  .btn-checkout:disabled { opacity: 0.5; cursor: not-allowed; }
  .cart-summary__continue {
    text-align: center;
    font-size: 1.3rem;
    color: #666;
    text-decoration: none;
  }
  .cart-summary__continue:hover { text-decoration: underline; }
  .cart-trust {
    display: flex; align-items: center; gap: 0.6rem;
    justify-content: center;
    color: #888; font-size: 1.2rem; margin-top: 0.4rem;
  }
`;
