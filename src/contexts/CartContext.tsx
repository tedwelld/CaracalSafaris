"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Bokun booking cart line (Aphalis model). */
export type CartItem = {
  id: string;
  productId: number;
  title: string;
  imageUrl?: string;
  date: string;
  startTime: string;
  participants: Record<number, number>;
  pricingCategories: { id: number; title: string }[];
  totalPrice: number;
  currency: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  /** Alias for MobileBottomNav / CartButton compatibility */
  itemCount: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => [...prev, item]);
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.length;
    return {
      items,
      count,
      itemCount: count,
      totalPrice: items.reduce((s, i) => s + i.totalPrice, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((o) => !o),
      add,
      remove,
      clear,
    };
  }, [items, isOpen, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
