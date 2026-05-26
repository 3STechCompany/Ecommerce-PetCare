// Placeholder - cart line operations handled client-side via CartContext
export const runtime = "edge";

export async function POST() {
  return Response.json({ message: "Use CartContext on the client side" }, { status: 200 });
}
