"use client";

/**
 * Legacy activity add-to-cart control. Experiences are now blog posts;
 * Bokun booking uses BookingModal → cart.add(). Kept as a no-op stub so
 * any remaining imports compile.
 */
export default function AddToCartButton({
  className = "",
}: {
  activityId?: string;
  className?: string;
}) {
  return (
    <LinkHint className={className} />
  );
}

function LinkHint({ className }: { className?: string }) {
  return (
    <a
      href="/experiences"
      className={`inline-flex items-center justify-center rounded bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-2 text-sm font-semibold hover:bg-[var(--accent-hover)] ${className}`}
    >
      View bookable tours
    </a>
  );
}
