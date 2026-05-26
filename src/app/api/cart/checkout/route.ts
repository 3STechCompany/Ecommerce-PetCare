// Placeholder - checkout redirect handled client-side via cart.checkoutUrl
export const runtime = "edge";

export async function POST() {
  return Response.json({ message: "Use goToCheckout() from CartContext on the client side" }, { status: 200 });
}
