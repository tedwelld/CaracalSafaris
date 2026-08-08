"use client";

import AddToCartButton from "@/components/cart/AddToCartButton";
import type { Activity } from "@/types/cart";

export default function ExperienceActivities({ activities }: { activities: Activity[] }) {
  return (
    <ul className="space-y-4">
      {activities.map((a) => (
        <li
          key={a.id}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border border-[var(--fg-10)] rounded-sm p-4"
        >
          <div className="flex-1 min-w-0">
            <p className="text-[var(--fg)] font-medium">{a.name}</p>
            <p className="text-xs text-[var(--fg-40)] mt-0.5">
              {a.duration} · from ${a.priceUsd} USD / adult
            </p>
          </div>
          <AddToCartButton activityId={a.id} className="w-full sm:w-auto" />
        </li>
      ))}
    </ul>
  );
}
