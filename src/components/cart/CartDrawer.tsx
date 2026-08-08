"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    subtotal,
    itemCount,
    setQuantity,
    removeItem,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-[var(--bg)] shadow-2xl border-l border-[var(--fg-10)]"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-[var(--fg-10)] px-5 py-4">
              <h2
                className="text-lg text-[var(--fg)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your cart ({itemCount})
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--fg-60)] hover:bg-[var(--fg-10)]"
                aria-label="Close"
              >
                <i className="pi pi-times" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[var(--fg-50)] mb-6">Your cart is empty.</p>
                  <Link
                    href="/experiences"
                    onClick={closeCart}
                    className="text-[var(--accent)] text-sm hover:text-[var(--accent-hover)]"
                  >
                    Browse experiences →
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-3">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[var(--fg)] text-sm truncate"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {line.name}
                        </p>
                        <p className="text-[var(--fg-40)] text-xs mt-0.5">
                          {line.duration} · ${line.priceUsd}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            className="w-7 h-7 rounded border border-[var(--fg-20)] text-[var(--fg)]"
                            onClick={() => setQuantity(line.id, line.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-sm w-6 text-center">{line.quantity}</span>
                          <button
                            type="button"
                            className="w-7 h-7 rounded border border-[var(--fg-20)] text-[var(--fg)]"
                            onClick={() => setQuantity(line.id, line.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="ml-auto text-xs text-[var(--fg-40)] hover:text-[var(--accent)]"
                            onClick={() => removeItem(line.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--accent)] font-medium">
                        ${line.lineTotal}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-[var(--fg-10)] px-5 py-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--fg-60)]">Subtotal (USD)</span>
                  <span className="text-[var(--fg)] font-semibold">${subtotal}</span>
                </div>
                <p className="text-[10px] text-[var(--fg-40)] leading-relaxed">
                  Indicative pricing. Final quote and payment arrangements confirmed after
                  your booking request.
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center border border-[var(--fg-20)] text-[var(--fg)] py-3 rounded text-sm hover:border-[var(--accent)] transition-colors"
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block text-center bg-[var(--accent)] text-[var(--accent-fg)] py-3 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
