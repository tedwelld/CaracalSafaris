"use client";

import { useCart } from "@/contexts/CartContext";

export default function CartButton({ className = "" }: { className?: string }) {
  const { itemCount, toggleCart } = useCart();

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--fg-10)] text-[var(--fg-60)] hover:text-[var(--fg)] ${className}`}
    >
      <i className="pi pi-shopping-cart" style={{ fontSize: "16px" }} />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] text-[10px] font-bold flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
