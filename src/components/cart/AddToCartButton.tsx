"use client";

import { useCart } from "@/contexts/CartContext";

interface Props {
  activityId: string;
  className?: string;
}

export default function AddToCartButton({ activityId, className = "" }: Props) {
  const { addItem, lines } = useCart();
  const inCart = lines.some((l) => l.id === activityId);

  return (
    <button
      type="button"
      onClick={() => addItem(activityId)}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm font-semibold transition-colors ${
        inCart
          ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40 hover:bg-[var(--accent)]/30"
          : "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
      } ${className}`}
    >
      <i className={`pi ${inCart ? "pi-check" : "pi-shopping-cart"}`} style={{ fontSize: "13px" }} />
      {inCart ? "Added — add another" : "Add to cart"}
    </button>
  );
}
