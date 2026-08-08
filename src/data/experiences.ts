import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    slug: "wonder",
    category: "wonder",
    label: "Wonder",
    title: "Into the Mist",
    description:
      "Stand at the edge of one of the world's greatest natural wonders. Walk through the rainforest, feel the spray, swim at Livingstone Island, and drift downstream as the sun melts into the Zambezi.",
    image: "/images/rainforest2.jpeg",
    destinations: ["victoria-falls", "livingstone"],
    highlights: ["Rainforest Walk", "Livingstone Island", "Sunset Cruise", "Devil's Pool"],
  },
  {
    slug: "wild",
    category: "wild",
    label: "Wild",
    title: "Track the Big Five",
    description:
      "Open-vehicle game drives through Hwange and Chobe. Boat safaris past elephant-lined banks. Walking safaris with expert trackers who read the land like a language.",
    image: "/images/elephant-eye.jpeg",
    destinations: ["chobe", "hwange"],
    highlights: ["Game Drives", "Boat Safaris", "Walking Safaris", "Night Drives"],
  },
  {
    slug: "thrill",
    category: "thrill",
    label: "Thrill",
    title: "The Edge of the Zambezi",
    description:
      "Grade 5 white water. Bungee from the Victoria Falls Bridge. Zip across the gorge. Fly over the Falls in a microlight. The Zambezi Gorge is Africa's adventure playground.",
    image: "/images/rafting.jpeg",
    destinations: ["victoria-falls", "livingstone"],
    highlights: ["White-Water Rafting", "Bungee Jumping", "Zipline", "Microlight Flight", "Gorge Swing"],
  },
  {
    slug: "culture",
    category: "culture",
    label: "Culture",
    title: "Stories Around the Fire",
    description:
      "Boma evenings under the stars. Community visits to local villages. Storytelling with elders. Traditional dance and food. Africa's humanity, up close and unhurried.",
    image: "/images/simunye.jpeg",
    destinations: ["victoria-falls", "livingstone", "hwange"],
    highlights: ["Boma Evenings", "Village Visits", "Traditional Dance", "Local Cuisine"],
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getExperiencesByCategory(category: string): Experience[] {
  return experiences.filter((e) => e.category === category);
}
