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

const CART_KEY = "caracal-bokun-cart";
const DRAFT_KEY = "caracal-checkout-draft";

/** Bokun booking cart line. */
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

export type CheckoutDraft = {
  cartItemId: string;
  productId: number;
  /** Milestone where the guest left off (1–4). */
  milestone: 1 | 2 | 3 | 4;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
  };
  paymentOption: "full" | "deposit" | "arrival";
  payTiming: "now" | "later";
  acceptPolicy: boolean;
  updatedAt: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  itemCount: number;
  totalPrice: number;
  isOpen: boolean;
  /** True after localStorage cart/draft have been loaded. */
  hydrated: boolean;
  checkoutDraft: CheckoutDraft | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  saveCheckoutDraft: (draft: Omit<CheckoutDraft, "updatedAt">) => void;
  clearCheckoutDraft: () => void;
  getDraftForProduct: (productId: number) => CheckoutDraft | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutDraft, setCheckoutDraft] = useState<CheckoutDraft | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedItems = readJson<CartItem[]>(CART_KEY);
    const storedDraft = readJson<CheckoutDraft>(DRAFT_KEY);
    if (Array.isArray(storedItems)) setItems(storedItems);
    if (storedDraft) setCheckoutDraft(storedDraft);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeJson(CART_KEY, items);
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (checkoutDraft) writeJson(DRAFT_KEY, checkoutDraft);
    else localStorage.removeItem(DRAFT_KEY);
  }, [checkoutDraft, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      // Replace existing line for the same product so resume stays single-threaded
      const without = prev.filter((i) => i.productId !== item.productId);
      return [...without, item];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setCheckoutDraft((draft) => (draft?.cartItemId === id ? null : draft));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCheckoutDraft(null);
  }, []);

  const saveCheckoutDraft = useCallback((draft: Omit<CheckoutDraft, "updatedAt">) => {
    setCheckoutDraft({ ...draft, updatedAt: Date.now() });
  }, []);

  const clearCheckoutDraft = useCallback(() => setCheckoutDraft(null), []);

  const getDraftForProduct = useCallback(
    (productId: number) =>
      checkoutDraft?.productId === productId ? checkoutDraft : null,
    [checkoutDraft],
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.length;
    return {
      items,
      count,
      itemCount: count,
      totalPrice: items.reduce((s, i) => s + i.totalPrice, 0),
      isOpen,
      hydrated,
      checkoutDraft,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((o) => !o),
      add,
      remove,
      clear,
      saveCheckoutDraft,
      clearCheckoutDraft,
      getDraftForProduct,
    };
  }, [
    items,
    isOpen,
    hydrated,
    checkoutDraft,
    add,
    remove,
    clear,
    saveCheckoutDraft,
    clearCheckoutDraft,
    getDraftForProduct,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
