"use client";

import { useState, useEffect } from "react";
import {
  ExperienceCard,
  type ExperienceProduct,
} from "@/components/bokun/ExperienceCard";

type Props = {
  /** Cap results (homepage). Omit to show the full Bokun catalogue. */
  limit?: number;
  emptyMessage?: string;
};

export function FeaturedListings({ limit = 4, emptyMessage }: Props) {
  const [products, setProducts] = useState<ExperienceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/bokun/activity.json/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1, pageSize: 50 }),
    })
      .then((r) => r.json())
      .then((data: { items: any[] }) => {
        let list: ExperienceProduct[] = (data.items ?? [])
          .map((p: any) => ({
            id: p.id,
            title: p.title,
            excerpt: p.excerpt ?? p.summary,
            durationText: p.durationText,
            difficultyLevel: p.difficultyLevel,
            activityType: p.activityType,
            photoUrl: p.keyPhoto?.originalUrl ?? p.photos?.[0]?.originalUrl,
            reviewRating: p.reviewRating,
            reviewCount: p.reviewCount,
            durationDays: p.durationDays,
            durationHours: p.durationHours,
          }))
          .sort(
            (a: ExperienceProduct, b: ExperienceProduct) =>
              (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
          );
        if (limit != null) list = list.slice(0, limit);
        setProducts(list);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) {
    return (
      <p className="text-center text-sm text-ink-soft py-8">Loading experiences…</p>
    );
  }

  if (products.length === 0) {
    if (emptyMessage) {
      return <p className="text-center text-sm text-ink-soft py-8">{emptyMessage}</p>;
    }
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ExperienceCard key={p.id} product={p} />
      ))}
    </div>
  );
}
