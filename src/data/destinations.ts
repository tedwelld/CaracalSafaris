import type { Destination } from "@/types/destination";

export const destinations: Destination[] = [
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe / Zambia",
    tagline: "The Smoke That Thunders",
    description:
      "One of the Seven Natural Wonders of the World. The Zambezi River plunges 108 metres into the gorge below, creating a roar and mist cloud visible for miles.",
    longDescription:
      "Victoria Falls — Mosi-oa-Tunya in the local Tonga language, meaning 'The Smoke That Thunders' — straddles the border between Zimbabwe and Zambia. With a width of 1,708 metres and a drop of 108 metres, it is considered the world's largest sheet of falling water. The surrounding rainforest ecosystem thrives on the constant mist, creating a permanent micro-climate that supports extraordinary biodiversity.",
    image: "/images/victoria-falls.jpeg",
    heroImage: "/images/victoria-falls.jpeg",
    highlights: ["Devil's Pool", "Livingstone Island", "Sunset Cruise", "Gorge Swing", "Rainforest Walk"],
    experiences: ["wonder", "thrill"],
    bestTime: "June – December (dry season for best visibility and activities)",
    wildlife: ["Hippo", "Crocodile", "Fish Eagle", "Vervet Monkey", "Baboon"],
  },
  {
    slug: "livingstone",
    name: "Livingstone",
    country: "Zambia",
    tagline: "Gateway to the Zambezi",
    description:
      "Named after the legendary explorer David Livingstone, this vibrant Zambian town sits on the banks of the Zambezi River, offering extraordinary access to the Falls from the Zambian side.",
    longDescription:
      "Livingstone is Zambia's adventure capital. From here, travellers access Livingstone Island — the rock on which Dr David Livingstone stood when he first saw the Falls in 1855. The town combines colonial-era charm with a thriving local culture, excellent lodges, and unmatched access to white-water rafting on the Zambezi.",
    image: "/images/rafting.jpeg",
    heroImage: "/images/rainforest2.jpeg",
    highlights: ["Livingstone Island", "White-Water Rafting", "Boma Dinner", "Bungee Jumping", "Microlight Flights"],
    experiences: ["wonder", "thrill", "culture"],
    bestTime: "Year-round — low water (August–January) for rafting, high water (February–July) for mist",
    wildlife: ["Elephant", "Hippo", "Crocodile", "Puku"],
  },
  {
    slug: "chobe",
    name: "Chobe National Park",
    country: "Botswana",
    tagline: "Elephant Country",
    description:
      "Home to the world's largest concentration of African elephants, Chobe offers extraordinary wildlife encounters by land and by river along the iconic Chobe Waterfront.",
    longDescription:
      "Chobe National Park in northern Botswana is one of Africa's great wildlife sanctuaries. The Chobe River frontage supports one of the continent's most dramatic concentrations of wildlife — particularly elephants, with an estimated 50,000 roaming the park. Boat safaris along the Chobe River deliver intimate encounters with hippos, crocodiles, and extraordinary birdlife.",
    image: "/images/boat-cruise.jpeg",
    heroImage: "/images/elephant.jpeg",
    highlights: ["Elephant Herds", "Chobe River Boat Safari", "Game Drives", "Sundowner Cruises"],
    experiences: ["wild"],
    bestTime: "May – October (dry season — wildlife congregates at the river)",
    wildlife: ["African Elephant", "Buffalo", "Lion", "Leopard", "Hippo", "Crocodile", "Wild Dog"],
  },
  {
    slug: "hwange",
    name: "Hwange National Park",
    country: "Zimbabwe",
    tagline: "Zimbabwe's Wild Heart",
    description:
      "Zimbabwe's largest national park, Hwange spans 14,600 km² of wilderness and is home to over 100 mammal species, including some of Africa's last great elephant herds.",
    longDescription:
      "Hwange National Park is one of Africa's best-kept safari secrets. Its vast pans attract remarkable concentrations of wildlife during the dry season — including the legendary 'Hwange Super Tuskers', among Africa's last great-tusked elephants. Walking safaris, night drives, and hide-based photography make Hwange a true bucket-list destination.",
    image: "/images/game-drive.jpeg",
    heroImage: "/images/elephant-eye.jpeg",
    highlights: ["Hwange Super Tuskers", "Walking Safaris", "Night Game Drives", "Painted Dog Research"],
    experiences: ["wild"],
    bestTime: "June – October (dry season — wildlife concentrates at waterholes)",
    wildlife: ["African Elephant", "Lion", "Leopard", "Cheetah", "African Wild Dog", "Sable Antelope", "Giraffe"],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
