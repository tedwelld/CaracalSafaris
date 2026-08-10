"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Pi } from "@/components/Pi";

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalPrice, count, remove } = useCart();

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
                Your cart ({count})
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
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[var(--fg-50)] mb-6">Your cart is empty.</p>
                  <Link
                    href="/experiences"
                    onClick={closeCart}
                    className="text-[var(--accent)] text-sm hover:text-[var(--accent-hover)]"
                  >
                    Browse tours →
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-line bg-surface p-3"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl ?? "/images/victoria-falls.jpeg"}
                        alt=""
                        className="h-16 w-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-ink-soft">
                          {item.date} · {item.startTime}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gold-dark">
                          {item.totalPrice} {item.currency}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-ink-soft hover:text-red-500 self-start"
                        aria-label="Remove"
                      >
                        <Pi name="pi-trash" className="text-sm" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--fg-10)] px-5 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-soft">Total</span>
                  <span className="font-semibold text-foreground">{totalPrice} USD</span>
                </div>
                <p className="text-xs text-ink-soft">
                  Pick up checkout exactly where you left off.
                </p>
                <Link
                  href={`/product/${items[0].productId}?resume=1&item=${encodeURIComponent(items[0].id)}`}
                  onClick={closeCart}
                  className="flex w-full items-center justify-center rounded bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-3 text-sm font-semibold hover:bg-[var(--accent-hover)]"
                >
                  Continue booking
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
