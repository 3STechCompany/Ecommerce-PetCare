// ============================================================
// SHIPPING SCOPE
//
// Quy ước: mọi sản phẩm mặc định ship US. Sản phẩm nào ship
// thêm EU thì gắn tag "ships-eu" trên Shopify Admin (Products →
// chọn sản phẩm → Tags). Không cần deploy lại code khi thêm/bớt
// sản phẩm — chỉ cần sửa tag trên Shopify.
// ============================================================

const SHIPS_EU_TAG = "ships-eu";

export interface ShippingScope {
  label: string;
  short: string;
  shipsToEU: boolean;
}

export function getShippingScope(tags?: string[]): ShippingScope {
  const shipsToEU = !!tags?.includes(SHIPS_EU_TAG);
  return shipsToEU
    ? { label: "Ships to US & EU", short: "US & EU", shipsToEU: true }
    : { label: "Ships to US only", short: "US only", shipsToEU: false };
}
