import type { Destination } from "@/types/destination";

export const destinations: Destination[] = [
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe / Zambia",
    tagline: "Spray, gorge & rainforest light",
    description:
      "Stand at the rim where the Zambezi breaks into the gorge — mist, rainbows and rainforest paths that change hour by hour.",
    longDescription:
      "Victoria Falls sits on the Zimbabwe–Zambia border where the Zambezi drops into the Batoka Gorge. Caracal guides time visits for spray, light and quieter walkways, then layer in river time or island access when conditions allow — so you experience the Falls as a place, not a photo stop.",
    image: "/images/victoria-falls.jpeg",
    heroImage: "/images/victoria-falls.jpeg",
    highlights: ["Devil's Pool", "Livingstone Island", "Sunset Cruise", "Gorge Swing", "Rainforest Walk"],
    experiences: ["wonder", "thrill"],
    bestTime: "June – December for clearer views; February – May for peak spray",
    wildlife: ["Hippo", "Crocodile", "Fish Eagle", "Vervet Monkey", "Baboon"],
  },
  {
    slug: "livingstone",
    name: "Livingstone",
    country: "Zambia",
    tagline: "Zambian bank of the Zambezi",
    description:
      "Base yourself on the Zambian side for island access, rafting put-ins, and evenings that stretch into local food and music.",
    longDescription:
      "Livingstone is our Zambian hub — close to the Falls, the river, and adventure put-ins. We use it for Livingstone Island mornings, white-water days, microlights and lodge stays that feel connected to town life without losing the bush rhythm.",
    image: "/images/rafting.jpeg",
    heroImage: "/images/rainforest2.jpeg",
    highlights: ["Livingstone Island", "White-Water Rafting", "Boma Dinner", "Bungee Jumping", "Microlight Flights"],
    experiences: ["wonder", "thrill", "culture"],
    bestTime: "Year-round — low water for rafting, high water for heavier mist",
    wildlife: ["Elephant", "Hippo", "Crocodile", "Puku"],
  },
  {
    slug: "chobe",
    name: "Chobe National Park",
    country: "Botswana",
    tagline: "Riverfront elephant country",
    description:
      "Boat and drive along the Chobe waterfront where elephant, buffalo and birdlife gather in extraordinary numbers.",
    longDescription:
      "Northern Botswana’s Chobe River frontage is a Caracal favourite for afternoon boat safaris and morning drives. We time crossings from Victoria Falls so you arrive rested, then work the river light — elephants in the shallows, hippo pods, and sundowner air that feels miles from town.",
    image: "/images/boat-cruise.jpeg",
    heroImage: "/images/elephant.jpeg",
    highlights: ["Elephant Herds", "Chobe River Boat Safari", "Game Drives", "Sundowner Cruises"],
    experiences: ["wild"],
    bestTime: "May – October when wildlife concentrates at the river",
    wildlife: ["African Elephant", "Buffalo", "Lion", "Leopard", "Hippo", "Crocodile", "Wild Dog"],
  },
  {
    slug: "hwange",
    name: "Hwange National Park",
    country: "Zimbabwe",
    tagline: "Pans, teak & big herds",
    description:
      "Zimbabwe’s largest park — waterhole mornings, open-vehicle drives, and the chance of legendary tuskers.",
    longDescription:
      "Hwange is where Caracal slows the clock: dawn hides, walking options with licensed trackers, and night drives when conditions allow. Dry-season pans pull in elephant and predators; wetter months bring green bush and birdlife. We match lodge style to how long you want to stay out.",
    image: "/images/game-drive.jpeg",
    heroImage: "/images/elephant-eye.jpeg",
    highlights: ["Hwange Super Tuskers", "Walking Safaris", "Night Game Drives", "Painted Dog Research"],
    experiences: ["wild"],
    bestTime: "June – October for waterhole concentrations",
    wildlife: ["African Elephant", "Lion", "Leopard", "Cheetah", "African Wild Dog", "Sable Antelope", "Giraffe"],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
