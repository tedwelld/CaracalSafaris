"use client";

import { useEffect, useMemo, useState } from "react";
import { Pi } from "@/components/Pi";
import { cn } from "@/lib/cn";
import {
  ExperienceCard,
  type ExperienceProduct,
  difficultyLabel,
} from "@/components/bokun/ExperienceCard";

type SortKey = "popular" | "name" | "duration";

function mapProduct(p: any): ExperienceProduct {
  return {
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
  };
}

function durationSortValue(p: ExperienceProduct) {
  if (p.durationDays && p.durationDays > 0) return p.durationDays * 24;
  if (p.durationHours && p.durationHours > 0) return p.durationHours;
  return 9999;
}

export function ExperiencesCatalog({
  emptyMessage = "Experiences will appear here once Bókun is connected. Check back soon, or plan a private journey with us.",
}: {
  emptyMessage?: string;
}) {
  const [products, setProducts] = useState<ExperienceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("popular");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/bokun/activity.json/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1, pageSize: 100 }),
    })
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text().catch(() => "");
          throw new Error(text || `Failed to load experiences (${r.status})`);
        }
        return r.json();
      })
      .then((data: { items?: any[]; error?: string }) => {
        if (data.error) throw new Error(data.error);
        setProducts((data.items ?? []).map(mapProduct));
      })
      .catch((err: Error) => {
        setProducts([]);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const activityTypes = useMemo(() => {
    const types = [
      ...new Set(products.map((p) => p.activityType).filter(Boolean) as string[]),
    ].sort();
    return ["All", ...types];
  }, [products]);

  const difficulties = useMemo(() => {
    const levels = [
      ...new Set(products.map((p) => p.difficultyLevel).filter(Boolean) as string[]),
    ];
    const order = ["EASY", "MODERATE", "HARD", "CHALLENGING"];
    levels.sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    return ["All", ...levels];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];
    const q = search.trim().toLowerCase();

    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt?.toLowerCase().includes(q) ?? false) ||
          (p.activityType?.toLowerCase().includes(q) ?? false) ||
          (p.durationText?.toLowerCase().includes(q) ?? false),
      );
    }
    if (typeFilter !== "All") {
      result = result.filter((p) => p.activityType === typeFilter);
    }
    if (difficultyFilter !== "All") {
      result = result.filter((p) => p.difficultyLevel === difficultyFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "popular") return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return durationSortValue(a) - durationSortValue(b);
    });

    return result;
  }, [products, search, typeFilter, difficultyFilter, sortBy]);

  const activeFilters =
    (typeFilter !== "All" ? 1 : 0) +
    (difficultyFilter !== "All" ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setDifficultyFilter("All");
  };

  if (loading) {
    return <p className="text-center text-sm text-ink-soft py-12">Loading experiences…</p>;
  }

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Pi name="pi-exclamation-circle" className="text-3xl text-gold-dark" />
        <p className="text-ink-soft max-w-md">{emptyMessage}</p>
        <p className="text-xs text-ink-soft/70">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-sm text-ink-soft py-12">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Search + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Pi
            name="pi-search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft"
          />
          <input
            type="search"
            placeholder="Search experiences by name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-9 pr-10 text-sm text-foreground placeholder:text-ink-soft/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-foreground"
              aria-label="Clear search"
            >
              <Pi name="pi-times-circle" className="text-sm" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-ink-soft sm:inline">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="popular">Most Popular</option>
            <option value="name">Name A–Z</option>
            <option value="duration">Duration (shortest)</option>
          </select>
        </div>
      </div>

      {/* Activity type chips */}
      {activityTypes.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {activityTypes.map((type) => {
            const count =
              type === "All"
                ? products.length
                : products.filter((p) => p.activityType === type).length;
            const label = type === "All" ? "All" : type.replace(/_/g, " ");
            return (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm capitalize",
                  typeFilter === type
                    ? "bg-gold text-neutral-900 shadow-sm"
                    : "bg-muted text-ink-soft hover:bg-gold/20 hover:text-foreground",
                )}
              >
                {label}
                <span className="ml-1 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Difficulty + clear */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink-soft">Difficulty</span>
          <div className="flex flex-wrap gap-1.5">
            {difficulties.map((level) => {
              const count =
                level === "All"
                  ? products.length
                  : products.filter((p) => p.difficultyLevel === level).length;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficultyFilter(level)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    difficultyFilter === level
                      ? "bg-gold/20 text-gold-dark border border-gold/30"
                      : "text-ink-soft border border-transparent hover:border-line",
                  )}
                >
                  {level === "All" ? "All" : difficultyLabel(level)} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {activeFilters > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-gold-dark hover:underline"
          >
            <Pi name="pi-filter-slash" className="text-xs" />
            Clear all ({activeFilters})
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Pi name="pi-ticket" className="text-4xl text-ink-soft/40" />
          <p className="text-ink-soft">No experiences match your filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-gold-dark hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-ink-soft">
            Showing {filtered.length}{" "}
            {filtered.length === 1 ? "experience" : "experiences"}
            {activeFilters > 0 && (
              <>
                {" "}
                with {activeFilters} {activeFilters === 1 ? "filter" : "filters"} active
              </>
            )}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ExperienceCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
