"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartLine } from "@/types/cart";
import { getActivityById } from "@/data/activities";

const STORAGE_KEY = "caracal-cart";

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (activityId: string, quantity?: number) => void;
  removeItem: (activityId: string) => void;
  setQuantity: (activityId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((i) => i.activityId && i.quantity > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const activity = getActivityById(item.activityId);
        if (!activity) return null;
        return {
          ...activity,
          quantity: item.quantity,
          lineTotal: activity.priceUsd * item.quantity,
        };
      })
      .filter((l): l is CartLine => l !== null);
  }, [items]);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines]
  );

  const addItem = useCallback((activityId: string, quantity = 1) => {
    if (!getActivityById(activityId)) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.activityId === activityId);
      if (existing) {
        return prev.map((i) =>
          i.activityId === activityId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { activityId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((activityId: string) => {
    setItems((prev) => prev.filter((i) => i.activityId !== activityId));
  }, []);

  const setQuantity = useCallback((activityId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.activityId !== activityId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.activityId === activityId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value: CartContextValue = {
    items,
    lines,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((o) => !o),
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
