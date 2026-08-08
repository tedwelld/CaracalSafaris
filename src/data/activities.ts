import type { Activity } from "@/types/cart";
import { experiences } from "@/data/experiences";

/** Indicative USD prices per adult — final quote confirmed offline / via Bokun later */
const PRICE_MAP: Record<string, { priceUsd: number; duration: string }> = {
  "rainforest-walk": { priceUsd: 85, duration: "Half day" },
  "livingstone-island": { priceUsd: 165, duration: "Half day" },
  "sunset-cruise": { priceUsd: 95, duration: "3 hours" },
  "devils-pool": { priceUsd: 145, duration: "Half day" },
  "game-drives": { priceUsd: 120, duration: "Half / full day" },
  "boat-safaris": { priceUsd: 110, duration: "Half day" },
  "walking-safaris": { priceUsd: 95, duration: "3–4 hours" },
  "night-drives": { priceUsd: 90, duration: "2–3 hours" },
  "white-water-rafting": { priceUsd: 140, duration: "Full day" },
  "bungee-jumping": { priceUsd: 168, duration: "1–2 hours" },
  zipline: { priceUsd: 75, duration: "1 hour" },
  "microlight-flight": { priceUsd: 185, duration: "15–30 min" },
  "gorge-swing": { priceUsd: 125, duration: "1–2 hours" },
  "boma-evenings": { priceUsd: 65, duration: "Evening" },
  "village-visits": { priceUsd: 55, duration: "Half day" },
  "traditional-dance": { priceUsd: 45, duration: "2 hours" },
  "local-cuisine": { priceUsd: 70, duration: "Evening" },
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildActivities(): Activity[] {
  const list: Activity[] = [];
  for (const exp of experiences) {
    for (const highlight of exp.highlights) {
      const id = slugify(highlight);
      const meta = PRICE_MAP[id] ?? { priceUsd: 99, duration: "Half day" };
      list.push({
        id,
        name: highlight,
        experienceSlug: exp.slug,
        destinationHint: exp.destinations.join(" · "),
        priceUsd: meta.priceUsd,
        image: exp.image,
        duration: meta.duration,
        description: `Part of the ${exp.label} experience — ${exp.title}.`,
      });
    }
  }
  return list;
}

export const activities: Activity[] = buildActivities();

export function getActivityById(id: string): Activity | undefined {
  return activities.find((a) => a.id === id);
}

export function getActivitiesByExperience(slug: string): Activity[] {
  return activities.filter((a) => a.experienceSlug === slug);
}
