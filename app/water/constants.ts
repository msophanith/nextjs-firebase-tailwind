export type BottleSize = "330ml" | "500ml" | "1.5L";
export type PackSize = "Single" | "6-Pack" | "12-Pack" | "Custom";

export interface ProductVariant {
  size: BottleSize;
  price: number;
}

export interface PackOption {
  count: number;
  label: PackSize;
  discount: number; // 0 to 1 (e.g. 0.1 for 10%)
}

export interface CartItem {
  id: string;
  size: BottleSize;
  pack: PackSize;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

export const BOTTLE_VARIANTS: ProductVariant[] = [
  { size: "330ml", price: 1.0 },
  { size: "500ml", price: 1.5 },
  { size: "1.5L", price: 2.5 },
];

export const PACK_OPTIONS: PackOption[] = [
  { label: "Single", count: 1, discount: 0 },
  { label: "6-Pack", count: 6, discount: 0.1 },
  { label: "12-Pack", count: 12, discount: 0.2 },
];
