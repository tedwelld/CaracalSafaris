import Link from "next/link";
import type { Activity } from "@/types/cart";

/** Legacy activities grid — points to Bokun featured tours. */
export default function ExperienceActivities({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <p className="text-[var(--fg-50)] text-sm">
        Browse live bookable tours on the{" "}
        <Link href="/experiences" className="text-[var(--accent)] hover:underline">
          home page
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {activities.map((a) => (
        <li
          key={a.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--fg-10)] pb-4"
        >
          <div>
            <p className="font-medium text-[var(--fg)]">{a.name}</p>
            <p className="text-sm text-[var(--fg-50)]">
              {a.duration} · from ${a.priceUsd}
            </p>
          </div>
          <Link
            href="/experiences"
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Book via Bókun →
          </Link>
        </li>
      ))}
    </ul>
  );
}
