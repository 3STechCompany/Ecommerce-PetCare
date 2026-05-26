// ============================================================
// SHOPIFY STOREFRONT API - GraphQL Client
// Hoạt động cả phía Server (Next.js Server Components)
// lẫn phía Client (React Client Components qua CartContext)
// ============================================================

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2024-01";

// Endpoint của Shopify Storefront API
const SHOPIFY_ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

/**
 * Hàm gửi GraphQL request tới Shopify Storefront API.
 *
 * @param query   - Chuỗi GraphQL query hoặc mutation
 * @param variables - Biến truyền vào query
 * @param cache   - Chiến lược cache của fetch (mặc định: no-store = luôn fresh)
 * @returns       - Dữ liệu `data` từ Shopify
 * @throws        - Lỗi nếu HTTP thất bại hoặc GraphQL trả về errors
 */
export async function shopifyFetch<TData>({
  query,
  variables,
  cache = "no-store",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<TData> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Token Storefront API (public) - KHÔNG phải Admin API token
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!response.ok) {
    throw new Error(
      `Shopify API lỗi ${response.status}: ${response.statusText}`
    );
  }

  const json = await response.json() as { data: TData; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new Error(`GraphQL Error: ${json.errors[0].message}`);
  }

  return json.data;
}
