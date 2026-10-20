import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "@/data/products";
import type { CartItem, Product } from "@/types";
import { clampQuantity, makeKey, sanitizeCart, validateSelection } from "@/utils/cart";

const STORAGE_KEY = "asrart.cart.v1";

export interface CartLine {
  item: CartItem;
  product: Product;
  lineTotal: number;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** Returns true if the item was added, false if the selection is invalid. */
  addItem: (productId: string, quantity: number, size?: string, colorId?: string) => boolean;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  removedNotice: boolean;
  dismissNotice: () => void;
}

const CartContext = createContext<CartValue | null>(null);

function loadInitial(): { items: CartItem[]; removed: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], removed: false };
    return sanitizeCart(JSON.parse(raw));
  } catch {
    return { items: [], removed: false };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(loadInitial);
  const [items, setItems] = useState<CartItem[]>(initial.items);
  const [removedNotice, setRemovedNotice] = useState(initial.removed);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode…) — the bag still works for this visit */
    }
  }, [items]);

  const addItem = useCallback<CartValue["addItem"]>((productId, quantity, size, colorId) => {
    const product = getProduct(productId);
    if (!product || validateSelection(product, size, colorId) !== null) return false;
    const key = makeKey(productId, size, colorId);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: clampQuantity(i.quantity + quantity) } : i));
      }
      return [...prev, { key, productId, size, colorId, quantity: clampQuantity(quantity) }];
    });
    return true;
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity: clampQuantity(quantity) } : i)));
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const dismissNotice = useCallback(() => setRemovedNotice(false), []);

  const value = useMemo<CartValue>(() => {
    const lines: CartLine[] = [];
    for (const item of items) {
      const product = getProduct(item.productId);
      if (product) lines.push({ item, product, lineTotal: product.price * item.quantity });
    }
    return {
      lines,
      count: lines.reduce((n, l) => n + l.item.quantity, 0),
      subtotal: lines.reduce((s, l) => s + l.lineTotal, 0),
      addItem,
      setQuantity,
      removeItem,
      clear,
      removedNotice,
      dismissNotice,
    };
  }, [items, addItem, setQuantity, removeItem, clear, removedNotice, dismissNotice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
