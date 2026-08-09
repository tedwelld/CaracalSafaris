/**
 * Tour landing-page content. Bokun is the source of truth for pricing and
 * availability — each tour may map to a Bokun experienceId.
 */

export type Tour = {
  slug: string;
  name: string;
  destinationSlug: string;
  category: "Accommodated" | "Budget" | "Child Friendly" | "Classic" | "Group" | "Nature Walk";
  durationDays: number;
  summary: string;
  description: string;
  highlights: string[];
  priceFrom?: string;
  image: string;
  bokunExperienceId?: string;
  bokunProductId?: number;
  bookingCount?: number;
};

export const tours: Tour[] = [
  {
    slug: "victoria-falls-classic",
    name: "Victoria Falls Classic Discovery",
    destinationSlug: "victoria-falls",
    category: "Classic",
    durationDays: 3,
    summary: "Guided tour of the Falls, a sunset Zambezi cruise and a Hwange game drive.",
    description:
      "Our signature short safari: tour the mighty Victoria Falls with a knowledgeable guide, cruise the Zambezi as the sun sets, and head into Hwange National Park in search of elephant, lion and wild dog. The perfect introduction to the region.",
    highlights: ["Guided Falls tour", "Sunset Zambezi cruise", "Hwange game drive", "All transfers"],
    priceFrom: "$65",
    image: "/images/victoria-falls.jpeg",
    bokunExperienceId: "1228507",
    bokunProductId: 1228507,
    bookingCount: 142,
  },
  {
    slug: "chobe-river-safari",
    name: "Chobe River Safari",
    destinationSlug: "chobe",
    category: "Group",
    durationDays: 2,
    summary: "Big-game river cruises and drives in elephant country.",
    description:
      "Chobe National Park hosts one of Africa's largest elephant populations. Cruise the river at golden hour and take morning game drives along the floodplains teeming with wildlife.",
    highlights: ["Chobe river cruise", "Floodplain game drive", "Birdlife", "Sundowners"],
    priceFrom: "On request",
    image: "/images/elephant-eye.jpeg",
    bookingCount: 156,
  },
  {
    slug: "hwange-game-drive",
    name: "Hwange Big Five Safari",
    destinationSlug: "hwange",
    category: "Classic",
    durationDays: 3,
    summary: "Open-vehicle game drives through Zimbabwe's largest national park.",
    description:
      "Spend days tracking elephant, lion and wild dog across Hwange's teak forests and grassy plains with dual-licensed Caracal guides.",
    highlights: ["Open-vehicle drives", "Waterhole viewing", "Expert trackers", "Night drive option"],
    priceFrom: "On request",
    image: "/images/lion.jpeg",
    bookingCount: 88,
  },
  {
    slug: "zambezi-adventure",
    name: "Zambezi Adventure Day",
    destinationSlug: "victoria-falls",
    category: "Nature Walk",
    durationDays: 1,
    summary: "Rafting, gorge views and rainforest walks around Victoria Falls.",
    description:
      "A high-energy day on the Zambezi — white-water rafting, rainforest walks and iconic gorge viewpoints with local adventure specialists.",
    highlights: ["White-water rafting", "Rainforest walk", "Gorge viewpoints", "Transfers"],
    priceFrom: "On request",
    image: "/images/rafting.jpeg",
    bookingCount: 120,
  },
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
export const getToursByDestination = (destinationSlug: string) =>
  tours.filter((t) => t.destinationSlug === destinationSlug);
