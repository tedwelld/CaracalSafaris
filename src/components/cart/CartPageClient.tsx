"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function CartPageClient() {
  const { lines, subtotal, setQuantity, removeItem, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="text-center py-20">
        <h1
          className="text-4xl text-[var(--fg)] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your cart is empty
        </h1>
        <p className="text-[var(--fg-50)] mb-8">
          Choose activities from our experiences to build your journey.
        </p>
        <Link
          href="/experiences"
          className="inline-block bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-3 rounded text-sm font-semibold hover:bg-[var(--accent-hover)]"
        >
          Browse experiences
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h1
            className="text-3xl md:text-4xl text-[var(--fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your cart
          </h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-[var(--fg-40)] hover:text-[var(--accent)]"
          >
            Clear all
          </button>
        </div>

        <ul className="divide-y divide-[var(--fg-10)] border-y border-[var(--fg-10)]">
          {lines.map((line) => (
            <li key={line.id} className="py-6 flex gap-4">
              <div className="relative h-24 w-28 flex-shrink-0 overflow-hidden rounded-sm">
                <Image src={line.image} alt={line.name} fill className="object-cover" sizes="112px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                  {line.name}
                </p>
                <p className="text-xs text-[var(--fg-40)] mt-1">
                  {line.destinationHint} · {line.duration}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="w-8 h-8 rounded border border-[var(--fg-20)]"
                    onClick={() => setQuantity(line.id, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{line.quantity}</span>
                  <button
                    type="button"
                    className="w-8 h-8 rounded border border-[var(--fg-20)]"
                    onClick={() => setQuantity(line.id, line.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-4 text-xs text-[var(--fg-40)] hover:text-[var(--accent)]"
                    onClick={() => removeItem(line.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[var(--accent)] font-semibold">${line.lineTotal}</p>
                <p className="text-xs text-[var(--fg-40)]">${line.priceUsd} each</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="bg-[var(--fg-05)] border border-[var(--fg-10)] rounded-sm p-6 h-fit">
        <h2 className="text-sm tracking-widest uppercase text-[var(--accent)] mb-4">
          Summary
        </h2>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[var(--fg-60)]">Subtotal</span>
          <span className="text-[var(--fg)] font-semibold">${subtotal} USD</span>
        </div>
        <p className="text-xs text-[var(--fg-40)] mb-6 leading-relaxed">
          Payment is arranged after we confirm your booking request. Prices shown are
          indicative per adult.
        </p>
        <Link
          href="/checkout"
          className="block text-center bg-[var(--accent)] text-[var(--accent-fg)] py-3.5 rounded text-sm font-semibold hover:bg-[var(--accent-hover)]"
        >
          Proceed to checkout
        </Link>
        <Link
          href="/experiences"
          className="block text-center text-sm text-[var(--fg-50)] mt-4 hover:text-[var(--fg)]"
        >
          Continue browsing
        </Link>
      </aside>
    </div>
  );
}
