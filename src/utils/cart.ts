import { siteConfig } from "@/config/site";
import { getProduct, isSizeAvailable } from "@/data/products";
import type { CartItem, Product } from "@/types";

export const makeKey = (productId: string, size?: string, colorId?: string): string =>
  `${productId}|${size ?? ""}|${colorId ?? ""}`;

export function clampQuantity(q: number): number {
  if (!Number.isFinite(q)) return 1;
  return Math.min(siteConfig.maxQuantityPerItem, Math.max(1, Math.floor(q)));
}

export type SelectionError = "unavailable" | "size" | "color" | "sizeUnavailable" | null;

/** Checks that a product + chosen options can legitimately be ordered. */
export function validateSelection(product: Product, size?: string, colorId?: string): SelectionError {
  if (product.status !== "available") return "unavailable";
  if (product.sizes.length > 0) {
    if (!size) return "size";
    if (!isSizeAvailable(product, size)) return "sizeUnavailable";
  }
  if (product.colors.length > 0) {
    if (!colorId || !product.colors.some((c) => c.id === colorId)) return "color";
  }
  return null;
}

/** Cleans whatever was stored in localStorage: unknown products, bad options and bad quantities are dropped. */
export function sanitizeCart(raw: unknown): { items: CartItem[]; removed: boolean } {
  if (!Array.isArray(raw)) return { items: [], removed: false };
  const items: CartItem[] = [];
  let removed = false;

  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) {
      removed = true;
      continue;
    }
    const e = entry as Record<string, unknown>;
    const productId = typeof e.productId === "string" ? e.productId : "";
    const size = typeof e.size === "string" ? e.size : undefined;
    const colorId = typeof e.colorId === "string" ? e.colorId : undefined;
    const quantity = typeof e.quantity === "number" ? e.quantity : NaN;
    const product = getProduct(productId);

    if (!product || validateSelection(product, size, colorId) !== null || !Number.isFinite(quantity)) {
      removed = true;
      continue;
    }

    const key = makeKey(productId, size, colorId);
    const safeQty = clampQuantity(quantity); // clamp each entry first so a bad duplicate can't reduce a valid one
    const existing = items.find((i) => i.key === key);
    if (existing) {
      existing.quantity = clampQuantity(existing.quantity + safeQty);
    } else {
      items.push({ key, productId, size, colorId, quantity: safeQty });
    }
  }
  return { items, removed };
}
