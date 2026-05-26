// ============================================================
// SHOPIFY STOREFRONT API - TypeScript Types
// ============================================================

// --- Kiểu dữ liệu cơ bản ---

export interface ShopifyMoneyV2 {
  amount: string;       // Chuỗi số, ví dụ: "9.99"
  currencyCode: string; // Ví dụ: "USD", "EUR"
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

// --- Biến thể sản phẩm (Variant) ---

export interface ShopifyProductVariant {
  id: string;              // GID: "gid://shopify/ProductVariant/12345"
  title: string;           // Ví dụ: "100g / Blue"
  availableForSale: boolean;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

// --- Sản phẩm ---

export interface ShopifyProduct {
  id: string;           // GID: "gid://shopify/Product/12345"
  title: string;
  handle: string;       // Slug URL, ví dụ: "energy-boost"
  description: string;  // Plain text
  descriptionHtml: string; // HTML description
  tags: string[];
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
}

// --- Cart (Giỏ hàng) ---

export interface ShopifyCartLine {
  id: string;           // GID: "gid://shopify/CartLine/..."
  quantity: number;
  cost: {
    totalAmount: ShopifyMoneyV2;
  };
  merchandise: {
    // ProductVariant được trả về qua inline fragment
    id: string;
    title: string;
    price: ShopifyMoneyV2;
    product: {
      title: string;
      handle: string;
      images: ShopifyImage[];
    };
  };
}

export interface ShopifyCart {
  id: string;           // GID: "gid://shopify/Cart/..."
  checkoutUrl: string;  // URL redirect tới trang thanh toán Shopify
  totalQuantity: number;
  lines: ShopifyCartLine[];
  cost: {
    totalAmount: ShopifyMoneyV2;
    subtotalAmount: ShopifyMoneyV2;
  };
}

export interface CartUserError {
  field: string[];
  message: string;
}

// --- Response types từ GraphQL mutations ---

export interface CartCreateResponse {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: CartUserError[];
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: CartUserError[];
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: CartUserError[];
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: CartUserError[];
  };
}

export interface GetCartResponse {
  cart: ShopifyCart | null;
}
