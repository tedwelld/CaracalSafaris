"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, lines, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ ref: string; whatsappUrl: string } | null>(
    null
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    travelDatesFrom: "",
    travelDatesTo: "",
    adults: 2,
    children: 0,
    notes: "",
    termsAccepted: false,
  });

  if (items.length === 0 && !success) {
    return (
      <div className="text-center py-16">
        <h1
          className="text-3xl text-[var(--fg)] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Nothing to check out
        </h1>
        <p className="text-[var(--fg-50)] mb-6">Add activities before continuing.</p>
        <Link href="/experiences" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
          Browse experiences →
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6">
          <i className="pi pi-check" style={{ color: "var(--accent)", fontSize: "28px" }} />
        </div>
        <h1
          className="text-4xl text-[var(--fg)] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Booking request sent
        </h1>
        <p className="text-[var(--fg-60)] mb-2">
          Reference <strong className="text-[var(--fg)]">{success.ref}</strong>
        </p>
        <p className="text-[var(--fg-50)] text-sm mb-8">
          We emailed your confirmation. Payment arrangements will follow — no charge was taken
          online.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={success.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--accent)] text-[var(--accent-fg)] px-6 py-3 rounded text-sm font-semibold"
          >
            Continue on WhatsApp
          </a>
          <Link
            href="/experiences"
            className="border border-[var(--fg-20)] px-6 py-3 rounded text-sm text-[var(--fg)]"
          >
            Browse more
          </Link>
        </div>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.termsAccepted) {
      setError("Please accept the terms to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          ...form,
          adults: Number(form.adults),
          children: Number(form.children),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.detail || json.error || "Booking failed");
      }
      clearCart();
      setSuccess({ ref: json.ref, whatsappUrl: json.whatsappUrl });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    "w-full bg-[var(--fg-05)] border border-[var(--fg-15)] rounded text-[var(--fg)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <form onSubmit={onSubmit} className="lg:col-span-2 space-y-5">
        <h1
          className="text-3xl md:text-4xl text-[var(--fg)] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Checkout
        </h1>
        <p className="text-[var(--fg-50)] text-sm mb-6">
          Submit a booking request. We&apos;ll confirm availability and payment next.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Full name *</label>
            <input
              required
              className={field}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Email *</label>
            <input
              required
              type="email"
              className={field}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Phone</label>
            <input
              className={field}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Country</label>
            <input
              className={field}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Travel from</label>
            <input
              type="date"
              className={field}
              value={form.travelDatesFrom}
              onChange={(e) => setForm({ ...form, travelDatesFrom: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Travel to</label>
            <input
              type="date"
              className={field}
              value={form.travelDatesTo}
              onChange={(e) => setForm({ ...form, travelDatesTo: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Adults *</label>
            <input
              required
              type="number"
              min={1}
              className={field}
              value={form.adults}
              onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-xs text-[var(--fg-50)] mb-1 block">Children</label>
            <input
              type="number"
              min={0}
              className={field}
              value={form.children}
              onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-[var(--fg-50)] mb-1 block">Notes</label>
          <textarea
            rows={4}
            className={field}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-[var(--fg-60)]">
          <input
            type="checkbox"
            className="mt-1 accent-[var(--accent)]"
            checked={form.termsAccepted}
            onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
          />
          <span>
            I agree to be contacted about this booking and understand payment is arranged after
            confirmation. *
          </span>
        </label>

        {error && <p className="text-[var(--accent)] text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-3.5 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-40"
        >
          {submitting ? "Sending…" : "Submit booking request"}
        </button>
      </form>

      <aside className="bg-[var(--fg-05)] border border-[var(--fg-10)] rounded-sm p-6 h-fit">
        <h2 className="text-xs tracking-widest uppercase text-[var(--accent)] mb-4">
          Order summary
        </h2>
        <ul className="space-y-3 mb-4">
          {lines.map((l) => (
            <li key={l.id} className="flex justify-between text-sm gap-3">
              <span className="text-[var(--fg-70)]">
                {l.name} × {l.quantity}
              </span>
              <span className="text-[var(--fg)]">${l.lineTotal}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-[var(--fg-10)] pt-3 text-sm font-semibold">
          <span>Subtotal</span>
          <span className="text-[var(--accent)]">${subtotal} USD</span>
        </div>
      </aside>
    </div>
  );
}
