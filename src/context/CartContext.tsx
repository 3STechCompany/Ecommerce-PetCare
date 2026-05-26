"use client";
// ============================================================
// CART CONTEXT - Quản lý trạng thái giỏ hàng toàn cục
//
// Luồng hoạt động:
//   1. addToCart(variantId, qty)
//      → Nếu chưa có cart: gọi cartCreate → lưu cartId vào localStorage
//      → Nếu đã có cart:   gọi cartLinesAdd với cartId đã lưu
//   2. updateQuantity(lineId, qty) → cartLinesUpdate
//   3. removeLine(lineId)          → cartLinesRemove
//   4. goToCheckout()              → window.location = cart.checkoutUrl
//      (Shopify xử lý thanh toán, sau đó webhook thông báo cho CJ Dropshipping)
// ============================================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
  GET_CART,
} from "@/lib/shopify/mutations";
import type {
  ShopifyCart,
  CartCreateResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse,
  GetCartResponse,
} from "@/lib/shopify/types";

// Key lưu cartId trong localStorage (persist qua F5)
const CART_ID_KEY = "shopify_cart_id";

// ============================================================
// Context type
// ============================================================

interface CartContextValue {
  cart: ShopifyCart | null;
  isLoading: boolean;
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (merchandiseId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  goToCheckout: () => void;
}

// ============================================================
// Helper: chuẩn hoá cart response từ edges → flat array
// ============================================================

function normalizeCart(raw: RawCart): ShopifyCart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    lines: raw.lines.edges.map((e) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      cost: e.node.cost,
      merchandise: {
        id: e.node.merchandise.id,
        title: e.node.merchandise.title,
        price: e.node.merchandise.price,
        product: {
          title: e.node.merchandise.product.title,
          handle: e.node.merchandise.product.handle,
          images: e.node.merchandise.product.images.edges.map((ie) => ie.node),
        },
      },
    })),
  };
}

// Raw shape trả từ GraphQL (edges pattern)
interface RawCartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      title: string;
      handle: string;
      images: { edges: { node: { url: string; altText: string | null } }[] };
    };
  };
}

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: { node: RawCartLine }[] };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
}

// ============================================================
// Context + Provider
// ============================================================

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart  = useCallback(() => setIsCartOpen(true),  []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Tính tổng số lượng sản phẩm trong giỏ
  const cartCount = cart?.lines.reduce((sum, line) => sum + line.quantity, 0) ?? 0;

  // Rehydrate cart từ localStorage khi trang load lần đầu
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;

    setIsLoading(true);
    shopifyFetch<GetCartResponse>({
      query: GET_CART,
      variables: { cartId: savedCartId },
    })
      .then((data) => {
        if (data.cart) {
          setCart(normalizeCart(data.cart as unknown as RawCart));
        } else {
          // Cart đã hết hạn hoặc không còn tồn tại trên Shopify
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => localStorage.removeItem(CART_ID_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  // ----------------------------------------------------------
  // addToCart: Thêm sản phẩm vào giỏ
  // ----------------------------------------------------------
  const addToCart = useCallback(
    async (merchandiseId: string, quantity: number) => {
      setIsLoading(true);
      try {
        const existingCartId = localStorage.getItem(CART_ID_KEY);

        if (existingCartId) {
          // ── Giỏ hàng đã tồn tại → thêm dòng mới
          const data = await shopifyFetch<CartLinesAddResponse>({
            query: CART_LINES_ADD,
            variables: {
              cartId: existingCartId,
              lines: [{ merchandiseId, quantity }],
            },
          });

          const updatedCart = data.cartLinesAdd.cart;
          if (updatedCart) {
            setCart(normalizeCart(updatedCart as unknown as RawCart));
            setIsCartOpen(true);
          }
        } else {
          // ── Chưa có giỏ hàng → tạo mới
          const data = await shopifyFetch<CartCreateResponse>({
            query: CART_CREATE,
            variables: {
              input: {
                lines: [{ merchandiseId, quantity }],
              },
            },
          });

          const newCart = data.cartCreate.cart;
          if (newCart) {
            localStorage.setItem(CART_ID_KEY, newCart.id);
            setCart(normalizeCart(newCart as unknown as RawCart));
            setIsCartOpen(true);
          }
        }
      } catch (error) {
        console.error("[CartContext] addToCart thất bại:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ----------------------------------------------------------
  // updateQuantity: Cập nhật số lượng item
  // ----------------------------------------------------------
  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      const cartId = cart?.id ?? localStorage.getItem(CART_ID_KEY);
      if (!cartId) return;

      setIsLoading(true);
      try {
        const data = await shopifyFetch<CartLinesUpdateResponse>({
          query: CART_LINES_UPDATE,
          variables: {
            cartId,
            lines: [{ id: lineId, quantity }],
          },
        });

        const updatedCart = data.cartLinesUpdate.cart;
        if (updatedCart) {
          setCart(normalizeCart(updatedCart as unknown as RawCart));
        }
      } catch (error) {
        console.error("[CartContext] updateQuantity thất bại:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  // ----------------------------------------------------------
  // removeLine: Xoá một dòng khỏi giỏ hàng
  // ----------------------------------------------------------
  const removeLine = useCallback(
    async (lineId: string) => {
      const cartId = cart?.id ?? localStorage.getItem(CART_ID_KEY);
      if (!cartId) return;

      setIsLoading(true);
      try {
        const data = await shopifyFetch<CartLinesRemoveResponse>({
          query: CART_LINES_REMOVE,
          variables: { cartId, lineIds: [lineId] },
        });

        const updatedCart = data.cartLinesRemove.cart;
        if (updatedCart) {
          setCart(normalizeCart(updatedCart as unknown as RawCart));
        }
      } catch (error) {
        console.error("[CartContext] removeLine thất bại:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart?.id]
  );

  // ----------------------------------------------------------
  // goToCheckout: Redirect sang trang Checkout bảo mật của Shopify
  // Sau khi khách thanh toán → Shopify webhook → CJ Dropshipping
  // ----------------------------------------------------------
  const goToCheckout = useCallback(() => {
    if (!cart?.checkoutUrl) {
      alert("Giỏ hàng trống hoặc chưa được tạo. Vui lòng thêm sản phẩm trước.");
      return;
    }
    // Redirect sang trang Shopify Checkout (HTTPS, bảo mật, hỗ trợ Stripe/PayPal)
    window.location.href = cart.checkoutUrl;
  }, [cart?.checkoutUrl]);

  return (
    <CartContext value={{ cart, isLoading, cartCount, isCartOpen, openCart, closeCart, addToCart, updateQuantity, removeLine, goToCheckout }}>
      {children}
    </CartContext>
  );
}

// ============================================================
// Hook tiện lợi để dùng trong components
// ============================================================

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart phải được dùng bên trong <CartProvider>");
  }
  return ctx;
}
