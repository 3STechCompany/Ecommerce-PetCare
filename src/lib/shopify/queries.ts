// ============================================================
// SHOPIFY STOREFRONT API - GraphQL Queries
// ============================================================

// Fragment tái sử dụng cho thông tin sản phẩm đầy đủ
const PRODUCT_FRAGMENT = `
  id
  title
  handle
  description
  descriptionHtml
  tags
  images(first: 10) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
        }
      }
    }
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
`;

// Fragment gọn hơn cho danh sách sản phẩm (product listing)
const PRODUCT_CARD_FRAGMENT = `
  id
  title
  handle
  description
  tags
  images(first: 3) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 5) {
    edges {
      node {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
`;

/**
 * Lấy thông tin đầy đủ một sản phẩm theo handle (slug URL).
 * Dùng cho trang chi tiết sản phẩm /products/[slug].
 */
export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FRAGMENT}
    }
  }
`;

/**
 * Lấy danh sách sản phẩm, hỗ trợ phân trang và lọc.
 * Dùng cho trang homepage featured products, search, v.v.
 */
export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ${PRODUCT_CARD_FRAGMENT}
        }
      }
    }
  }
`;

/**
 * Lấy toàn bộ sản phẩm trong một Collection theo handle.
 * Dùng cho trang /collections/[slug].
 */
export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ${PRODUCT_CARD_FRAGMENT}
          }
        }
      }
    }
  }
`;

/**
 * Lấy sản phẩm theo tag (dùng khi collection chưa được tạo trên Shopify).
 * Ví dụ: query = "tag:cat" hoặc "tag:dog"
 */
export const GET_PRODUCTS_BY_TAG = `
  query GetProductsByTag($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          ${PRODUCT_CARD_FRAGMENT}
        }
      }
    }
  }
`;

/**
 * Lấy nhiều sản phẩm theo danh sách ID (dùng cho related products).
 */
export const GET_PRODUCTS_BY_IDS = `
  query GetProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        ${PRODUCT_CARD_FRAGMENT}
      }
    }
  }
`;
