// API route placeholder - Cart operations are handled client-side via CartContext
// using the Shopify Storefront API directly (NEXT_PUBLIC_ token)
export const runtime = "edge";

export async function GET() {
  return Response.json({ message: "Cart is managed client-side via Shopify Storefront API" });
}
