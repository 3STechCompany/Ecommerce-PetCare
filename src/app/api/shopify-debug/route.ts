// DEBUG ROUTE — xóa file này trước khi deploy production
// Truy cập: GET /api/shopify-debug?handle=cat-accessories
import { NextRequest, NextResponse } from "next/server";

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2024-01";
const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function gql(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const text = await res.text();
  let json: unknown;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, ok: res.ok, json };
}

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle") ?? "cat-accessories";

  // 1. Check env vars
  const envCheck = {
    STORE_DOMAIN,
    STOREFRONT_TOKEN: STOREFRONT_TOKEN ? `${STOREFRONT_TOKEN.slice(0, 6)}…` : "MISSING",
    API_VERSION,
    ENDPOINT,
  };

  // 2. Test basic connectivity + shop name
  const shopTest = await gql(`{ shop { name primaryDomain { url } } }`);

  // 3. Test collection fetch for the given handle
  const collectionTest = await gql(
    `query($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id title handle
        products(first: $first) {
          edges { node { id title handle availableForSale } }
        }
      }
    }`,
    { handle, first: 5 }
  );

  // 4. List first 5 collections in the store
  const collectionsTest = await gql(
    `{ collections(first: 10) { edges { node { id title handle } } } }`
  );

  return NextResponse.json({
    env: envCheck,
    shop: shopTest,
    collection: { handle, ...collectionTest },
    allCollections: collectionsTest,
  }, { status: 200 });
}
