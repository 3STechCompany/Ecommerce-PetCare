"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS_BY_TAG } from "@/lib/shopify/queries";
import { formatShopifyPrice } from "@/lib/shopify";
import "./CartDrawer.css";

const FREE_SHIPPING_THRESHOLD = 100; // EUR

// ── Cross-sell: fetch 4 sản phẩm bất kỳ để gợi ý ──
type CrossSellProduct = {
  id: string;
  title: string;
  handle: string;
  image: string | null;
  price: string;
  variantId: string | null;
};

function useCrossSell() {
  const [products, setProducts] = useState<CrossSellProduct[]>([]);

  useEffect(() => {
    shopifyFetch<{
      products: {
        edges: {
          node: {
            id: string;
            title: string;
            handle: string;
            images: { edges: { node: { url: string } }[] };
            variants: { edges: { node: { id: string; price: { amount: string; currencyCode: string } } }[] };
          };
        }[];
      };
    }>({
      query: GET_PRODUCTS_BY_TAG,
      variables: { query: "available_for_sale:true", first: 4 },
    })
      .then((data) => {
        setProducts(
          data.products.edges.map(({ node }) => ({
            id: node.id,
            title: node.title,
            handle: node.handle,
            image: node.images.edges[0]?.node.url ?? null,
            price: formatShopifyPrice(
              node.variants.edges[0]?.node.price.amount ?? "0",
              node.variants.edges[0]?.node.price.currencyCode ?? "USD"
            ),
            variantId: node.variants.edges[0]?.node.id ?? null,
          }))
        );
      })
      .catch(() => {});
  }, []);

  return products;
}

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeLine, goToCheckout, isLoading, addToCart } = useCart();
  const crossSell = useCrossSell();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [crossSlide, setCrossSlide] = useState(0);
  const [note, setNote] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  // Focus trap
  useEffect(() => {
    if (isCartOpen) drawerRef.current?.focus();
  }, [isCartOpen]);

  const lines = cart?.lines ?? [];
  const subtotalAmount = parseFloat(cart?.cost?.subtotalAmount?.amount ?? "0");
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAmount);
  const progress = Math.min(100, (subtotalAmount / FREE_SHIPPING_THRESHOLD) * 100);
  const currency = cart?.cost?.subtotalAmount?.currencyCode ?? "EUR";
  const subtotalFormatted = formatShopifyPrice(
    cart?.cost?.subtotalAmount?.amount ?? "0",
    currency
  );

  const crossMax = Math.max(0, crossSell.length - 2);
  const prevSlide = useCallback(() => setCrossSlide((s) => Math.max(0, s - 1)), []);
  const nextSlide = useCallback(() => setCrossSlide((s) => Math.min(crossMax, s + 1)), [crossMax]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? "active" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`cart-drawer ${isCartOpen ? "active" : ""}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        tabIndex={-1}
      >
        {/* ── Promo Banner ── */}
        <div className="cart-drawer__promo">
          <p>Save 15% on your first purchase with code <strong>WELCOME</strong></p>
        </div>

        {/* ── Header ── */}
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">Cart</span>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="16" height="16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* ── Free Shipping Bar ── */}
        <div className="cart-drawer__shipping-bar">
          {remaining > 0 ? (
            <p>
              Spend <strong>{formatShopifyPrice(remaining.toFixed(2), currency)}</strong> more for <strong>FREE SHIPPING</strong>
            </p>
          ) : (
            <p className="cart-drawer__shipping-bar--success">You qualify for <strong>FREE shipping</strong> 🎉</p>
          )}
          <div className="cart-drawer__progress-track">
            <div className="cart-drawer__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="cart-drawer__body">

          {/* Empty state */}
          {lines.length === 0 && (
            <div className="cart-drawer__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="64" height="64">
                <path d="M3.41,7.23H20.59V19.64a2.86,2.86,0,0,1-2.86,2.86H6.27a2.86,2.86,0,0,1-2.86-2.86Z" />
                <path d="M7.23,10.09V6.27A4.77,4.77,0,0,1,12,1.5h0a4.77,4.77,0,0,1,4.77,4.77v3.82" />
              </svg>
              <p>Your cart is empty</p>
              <button className="button button--primary" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          )}

          {/* Cart items table */}
          {lines.length > 0 && (
            <table className="cart-drawer__table">
              <tbody>
                {lines.map((line) => {
                  const img = line.merchandise.product.images[0];
                  const lineTotal = formatShopifyPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode);
                  const unitPrice = formatShopifyPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode);

                  return (
                    <tr key={line.id} className="cart-drawer__item">
                      {/* Image */}
                      <td className="cart-drawer__item-media">
                        <Link href={`/products/${line.merchandise.product.handle}`} onClick={closeCart} tabIndex={-1}>
                          {img && (
                            <img
                              src={img.url}
                              alt={img.altText ?? line.merchandise.product.title}
                              width={100}
                              height={100}
                              loading="lazy"
                            />
                          )}
                        </Link>
                      </td>

                      {/* Details */}
                      <td className="cart-drawer__item-details">
                        <Link href={`/products/${line.merchandise.product.handle}`} onClick={closeCart} className="cart-drawer__item-name">
                          {line.merchandise.product.title}
                        </Link>
                        {line.merchandise.title !== "Default Title" && (
                          <div className="cart-drawer__item-variant">{line.merchandise.title}</div>
                        )}
                        <div className="cart-drawer__item-unit-price">{unitPrice}</div>
                      </td>

                      {/* Total */}
                      <td className="cart-drawer__item-total">
                        {isLoading ? (
                          <svg className="cart-spinner" viewBox="0 0 66 66">
                            <circle className="cart-spinner__path" fill="none" strokeWidth="6" cx="33" cy="33" r="30" />
                          </svg>
                        ) : (
                          <span>{lineTotal}</span>
                        )}
                      </td>

                      {/* Quantity + Remove */}
                      <td className="cart-drawer__item-qty">
                        <div className="cart-drawer__qty-wrapper">
                          <div className="cart-drawer__qty">
                            <button
                              className="cart-drawer__qty-btn"
                              disabled={isLoading || line.quantity <= 1}
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              aria-label={`Decrease quantity for ${line.merchandise.product.title}`}
                            >
                              <svg viewBox="0 0 10 2" fill="none" width="10" height="2">
                                <path fillRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              className="cart-drawer__qty-input"
                              value={line.quantity}
                              min={1}
                              readOnly
                              aria-label={`Quantity for ${line.merchandise.product.title}`}
                            />
                            <button
                              className="cart-drawer__qty-btn"
                              disabled={isLoading}
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              aria-label={`Increase quantity for ${line.merchandise.product.title}`}
                            >
                              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16">
                                <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                              </svg>
                            </button>
                          </div>

                          <button
                            className="cart-drawer__remove"
                            onClick={() => removeLine(line.id)}
                            disabled={isLoading}
                            aria-label={`Remove ${line.merchandise.product.title}`}
                          >
                            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" fill="currentColor" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* ── Cross-Sell ── */}
          {crossSell.length > 0 && (
            <div className="cart-drawer__cross-sell">
              <div className="cart-drawer__cross-sell-header">
                <span className="cart-drawer__cross-sell-title">You may also like</span>
                <div className="cart-drawer__cross-sell-nav">
                  <button onClick={prevSlide} disabled={crossSlide === 0} aria-label="Previous">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <polyline points="15 18 9 12 15 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button onClick={nextSlide} disabled={crossSlide >= crossMax} aria-label="Next">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <polyline points="9 18 15 12 9 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cart-drawer__cross-sell-track-wrapper">
                <ul
                  className="cart-drawer__cross-sell-track"
                  style={{ transform: `translateX(calc(-${crossSlide} * (50% + 0.6rem)))` }}
                >
                  {crossSell.map((p) => (
                    <li key={p.id} className="cart-drawer__cross-sell-item">
                      {p.image && (
                        <Link href={`/products/${p.handle}`} onClick={closeCart} className="cart-drawer__cs-image">
                          <img src={p.image} alt={p.title} loading="lazy" />
                        </Link>
                      )}
                      <div className="cart-drawer__cs-info">
                        <Link href={`/products/${p.handle}`} onClick={closeCart} className="cart-drawer__cs-name">
                          {p.title}
                        </Link>
                        <span className="cart-drawer__cs-price">{p.price}</span>
                      </div>
                      {p.variantId && (
                        <button
                          className="cart-drawer__cs-add"
                          onClick={() => p.variantId && addToCart(p.variantId, 1)}
                          disabled={isLoading}
                          aria-label={`Add ${p.title} to cart`}
                        >
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16">
                            <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                          </svg>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── Cart Note ── */}
          <div className="cart-drawer__accordion">
            <button
              className={`cart-drawer__accordion-btn ${noteOpen ? "open" : ""}`}
              onClick={() => setNoteOpen((o) => !o)}
            >
              <span>Cart note</span>
              <svg viewBox="0 0 10 6" fill="currentColor" width="10" height="6">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" />
              </svg>
            </button>
            {noteOpen && (
              <div className="cart-drawer__accordion-body">
                <textarea
                  className="cart-drawer__note-textarea"
                  placeholder="Add a note for your order…"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* ── Discount Code ── */}
          <div className="cart-drawer__accordion">
            <button
              className={`cart-drawer__accordion-btn ${discountOpen ? "open" : ""}`}
              onClick={() => setDiscountOpen((o) => !o)}
            >
              <span>Have a discount code?</span>
              <svg viewBox="0 0 10 6" fill="currentColor" width="10" height="6">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" />
              </svg>
            </button>
            {discountOpen && (
              <div className="cart-drawer__accordion-body">
                <div className="cart-drawer__discount-row">
                  <input
                    type="text"
                    className="cart-drawer__discount-input"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    autoComplete="off"
                  />
                  <button className="button button--secondary cart-drawer__discount-apply">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        {lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal-row">
              <span>Subtotal</span>
              <span className="cart-drawer__subtotal-amount">{subtotalFormatted}</span>
            </div>
            <p className="cart-drawer__tax-note">Taxes and shipping calculated at checkout</p>
            <button
              className="button button--primary cart-drawer__checkout-btn"
              onClick={goToCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Loading…" : "Proceed to Checkout →"}
            </button>
            <Link href="/cart" className="cart-drawer__view-cart" onClick={closeCart}>
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
