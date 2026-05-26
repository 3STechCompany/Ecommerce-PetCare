// ============================================================
// SHOPIFY STOREFRONT API - Cart Mutations
// Quản lý toàn bộ vòng đời giỏ hàng:
//   cartCreate → cartLinesAdd → cartLinesUpdate → cartLinesRemove → checkout
// ============================================================

// Fragment dùng chung cho cart response (tái sử dụng trong mọi mutation)
const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            product {
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
  }
`;

/**
 * Tạo giỏ hàng mới và thêm item đầu tiên.
 * Gọi khi người dùng bấm "Add to Cart" lần đầu (chưa có cartId).
 */
export const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Thêm item vào giỏ hàng đã có.
 * Gọi khi đã có cartId trong localStorage.
 */
export const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Cập nhật số lượng của một line item trong giỏ.
 * Dùng khi khách tăng/giảm số lượng trên trang giỏ hàng.
 */
export const CART_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Xoá một hoặc nhiều item khỏi giỏ hàng.
 * Dùng khi khách bấm nút xoá sản phẩm.
 */
export const CART_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Lấy thông tin giỏ hàng hiện tại từ cartId.
 * Dùng khi user reload trang (rehydrate từ localStorage).
 */
export const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FRAGMENT}
    }
  }
`;
