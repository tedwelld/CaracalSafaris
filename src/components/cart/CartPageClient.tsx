"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Pi } from "@/components/Pi";

export default function CartPageClient() {
  const { items, totalPrice, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--fg-50)] mb-4">Your cart is empty.</p>
        <p className="text-[var(--fg-40)] text-sm mb-8 max-w-md mx-auto">
          Add tours from a product page, or browse featured listings on the home page.
        </p>
        <Link
          href="/#featured-tours"
          className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--accent-fg)] px-6 py-3 rounded text-sm font-semibold hover:bg-[var(--accent-hover)]"
        >
          Browse tours
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 rounded-xl border border-line bg-surface p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl ?? "/images/victoria-falls.jpeg"}
              alt=""
              className="h-20 w-28 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-ink-soft">
                {item.date} · {item.startTime}
              </p>
              <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-ink-soft">
                {Object.entries(item.participants)
                  .filter(([, c]) => c > 0)
                  .map(([catId, count]) => {
                    const cat = item.pricingCategories.find((c) => c.id === Number(catId));
                    return (
                      <span key={catId}>
                        {count}× {cat?.title ?? catId}
                      </span>
                    );
                  })}
              </div>
              <p className="mt-2 font-semibold text-gold-dark">
                {item.totalPrice} {item.currency}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Link
                href={`/product/${item.productId}`}
                className="text-sm text-gold-dark hover:underline"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-ink-soft hover:text-red-500"
                aria-label="Remove"
              >
                <Pi name="pi-trash" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <div>
          <p className="text-sm text-ink-soft">Total</p>
          <p className="text-2xl font-semibold text-foreground">{totalPrice} USD</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-sm text-ink-soft hover:text-foreground"
          >
            Clear
          </button>
          <Link
            href={`/product/${items[0].productId}`}
            className="rounded bg-[var(--accent)] text-[var(--accent-fg)] px-6 py-3 text-sm font-semibold hover:bg-[var(--accent-hover)]"
          >
            Continue booking
          </Link>
        </div>
      </div>
    </div>
  );
}
