"use client";

import Link from "next/link";
import { Pi } from "@/components/Pi";
import { Photo } from "@/components/Photo";

export type ExperienceProduct = {
  id: number;
  title: string;
  excerpt?: string;
  durationText?: string;
  difficultyLevel?: string;
  activityType?: string;
  photoUrl?: string;
  reviewRating?: number;
  reviewCount?: number;
  durationDays?: number;
  durationHours?: number;
};

const scrim =
  "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent";

export function difficultyLabel(level?: string) {
  return (
    ({ EASY: "Easy", MODERATE: "Moderate", HARD: "Hard", CHALLENGING: "Challenging" } as Record<
      string,
      string
    >)[level ?? ""] ??
    level ??
    "Activity"
  );
}

export function ExperienceCard({ product: p }: { product: ExperienceProduct }) {
  return (
    <Link href={`/product/${p.id}`} className="group block">
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5">
        <Photo
          src={p.photoUrl ?? "/images/victoria-falls.jpeg"}
          alt={p.title}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className={scrim} />
        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 p-4">
          <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-foreground">
            {difficultyLabel(p.difficultyLevel)}
          </span>
          {p.durationText && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
              <Pi name="pi-clock" className="text-xs" /> {p.durationText}
            </span>
          )}
          {p.activityType && (
            <span className="rounded-full bg-black/35 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {p.activityType.replace(/_/g, " ")}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="text-lg text-white">{p.title}</h3>
          {p.excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-white/85">{p.excerpt}</p>
          )}
          {p.reviewCount !== undefined && p.reviewCount > 0 && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-white/90 backdrop-blur-sm">
                <Pi name="pi-star-fill" className="text-gold-light" />{" "}
                {p.reviewRating?.toFixed(1)} ({p.reviewCount})
              </span>
            </div>
          )}
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
            View &amp; book{" "}
            <Pi
              name="pi-arrow-right"
              className="text-sm transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
