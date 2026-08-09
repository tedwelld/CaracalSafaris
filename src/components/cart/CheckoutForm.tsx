"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

/**
 * Legacy checkout page — Bokun bookings complete inside BookingModal.
 * This page points guests back to product booking or the enquiry form.
 */
export default function CheckoutForm() {
  const { items, totalPrice, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--fg-50)] mb-6">Add a tour before continuing.</p>
        <Link href="/#featured-tours" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
          Browse tours →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="rounded-xl border border-line bg-surface p-6">
        <h2 className="text-lg text-foreground font-semibold">Booking next steps</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Online payments and availability run through Bókun on each product page.
          You have {items.length} item{items.length === 1 ? "" : "s"} totalling{" "}
          <strong className="text-foreground">{totalPrice} USD</strong>.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          {items.map((i) => (
            <li key={i.id}>
              {i.title} — {i.date} {i.startTime}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href={`/product/${items[0].productId}`}
          className="inline-flex items-center justify-center rounded bg-[var(--accent)] text-[var(--accent-fg)] px-6 py-3 text-sm font-semibold hover:bg-[var(--accent-hover)]"
        >
          Complete Bokun booking
        </Link>
        <Link
          href="/plan-your-journey"
          className="inline-flex items-center justify-center rounded border border-line px-6 py-3 text-sm text-foreground hover:bg-muted"
        >
          Or plan a private journey
        </Link>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-ink-soft hover:text-foreground"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
