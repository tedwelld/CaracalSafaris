/** Blog posts — transformed from Caracal experience content into Aphalis-style posts. */

export type BlogSection = {
  id: string;
  label: string;
  content: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  body: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "wonder",
    title: "Into the Mist: Victoria Falls Wonder",
    excerpt:
      "Stand at the edge of one of the world's greatest natural wonders — rainforest walks, Livingstone Island, and sunset on the Zambezi.",
    date: "2026-05-12",
    author: "Caracal Safaris",
    image: "/images/rainforest2.jpeg",
    body:
      "Stand at the edge of one of the world's greatest natural wonders. Walk through the rainforest, feel the spray, swim at Livingstone Island, and drift downstream as the sun melts into the Zambezi.",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Victoria Falls — Mosi-oa-Tunya, the Smoke That Thunders — is the heart of the Caracal triangle. On the Zimbabwe and Zambia sides alike, rainforest paths lead to lookout points where spray rises like mist and the gorge opens beneath your feet.\n\nWe pace the day around light, water levels and your energy: early rainforest walks, island swims when the river allows, and unhurried time at the viewpoints that make the Falls unforgettable.",
      },
      {
        id: "highlights",
        label: "Highlights",
        content:
          "Rainforest Walk — Feel the spray on well-kept paths with a private guide who knows every viewpoint.\n\nLivingstone Island — When water levels permit, reach the edge of the Falls for a swim and champagne moment few travellers forget.\n\nSunset Cruise — Drift the Zambezi as hippos surface and the sky turns copper.\n\nDevil's Pool — A seasonal thrill on the Zambia side, arranged with care and local expertise.",
      },
      {
        id: "planning",
        label: "Planning",
        content:
          "High water (roughly February–July) brings the most dramatic curtain of spray; low water opens more rock platforms and adventure access. We recommend at least two nights around the Falls if you want both wonder and a soft adventure day.\n\nPair this with a game drive in Hwange or Chobe to turn a short stay into a classic triangle safari.",
      },
    ],
  },
  {
    slug: "wild",
    title: "Track the Big Five",
    excerpt:
      "Open-vehicle game drives through Hwange and Chobe. Boat safaris past elephant-lined banks. Walking safaris with expert trackers.",
    date: "2026-04-28",
    author: "Caracal Safaris",
    image: "/images/elephant-eye.jpeg",
    body:
      "Open-vehicle game drives through Hwange and Chobe. Boat safaris past elephant-lined banks. Walking safaris with expert trackers who read the land like a language.",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Hwange and Chobe sit within easy reach of Victoria Falls, making wildlife the natural second act of a Falls journey. Our dual-licensed guides cross borders seamlessly so you stay focused on the bush, not logistics.",
      },
      {
        id: "highlights",
        label: "Highlights",
        content:
          "Game Drives — Morning and afternoon drives in open vehicles with room for photography and quiet viewing.\n\nBoat Safaris — Drift Chobe's channels where elephants come to drink in remarkable numbers.\n\nWalking Safaris — Slow, sensory tracking with armed professional guides.\n\nNight Drives — When available, spotlight nocturnal hunters after dark.",
      },
      {
        id: "when",
        label: "Best Time",
        content:
          "Dry season (May–October) concentrates game at waterholes and offers classic sightings. Green season brings birdlife, newborns and quieter camps — ideal for photographers who value atmosphere over density.",
      },
    ],
  },
  {
    slug: "thrill",
    title: "The Edge of the Zambezi",
    excerpt:
      "Grade 5 white water. Bungee from the Victoria Falls Bridge. Zip across the gorge. Fly over the Falls in a microlight.",
    date: "2026-04-02",
    author: "Caracal Safaris",
    image: "/images/rafting.jpeg",
    body:
      "Grade 5 white water. Bungee from the Victoria Falls Bridge. Zip across the gorge. Fly over the Falls in a microlight. The Zambezi Gorge is Africa's adventure playground.",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "Below the Falls, the Zambezi carves a deep gorge that has become Southern Africa's adventure capital. We match activities to season, fitness and nerve — from full-day rafting to a single leap from the bridge.",
      },
      {
        id: "highlights",
        label: "Highlights",
        content:
          "White-Water Rafting — World-class rapids with names that earn their reputation.\n\nBungee Jumping — 111 metres from the Victoria Falls Bridge, border beneath your feet.\n\nZipline & Gorge Swing — Cross or plunge into the gorge with professional operators.\n\nMicrolight Flight — See the Smoke That Thunders from above at golden hour.",
      },
      {
        id: "safety",
        label: "Safety",
        content:
          "We work with licensed operators and brief every guest before they step onto the water or the bridge. Low-water season generally suits rafting; high water opens different flight and spray experiences. Tell us your comfort level — we build the day around it.",
      },
    ],
  },
  {
    slug: "culture",
    title: "Stories Around the Fire",
    excerpt:
      "Boma evenings under the stars. Community visits. Storytelling with elders. Traditional dance and food — Africa's humanity, up close.",
    date: "2026-03-15",
    author: "Caracal Safaris",
    image: "/images/simunye.jpeg",
    body:
      "Boma evenings under the stars. Community visits to local villages. Storytelling with elders. Traditional dance and food. Africa's humanity, up close and unhurried.",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content:
          "A Caracal journey is not only landscape and wildlife — it is people. We arrange respectful village visits, evening performances and meals that connect you to the communities who call the Falls region home.",
      },
      {
        id: "highlights",
        label: "Highlights",
        content:
          "Boma Evenings — Firelight, music and a feast under southern skies.\n\nVillage Visits — Meet hosts who share daily life, crafts and stories on their terms.\n\nTraditional Dance — Rhythm and costume that celebrate local heritage.\n\nLocal Cuisine — Flavours of the region, from riverside fish to slow-cooked stews.",
      },
      {
        id: "ethos",
        label: "Our Ethos",
        content:
          "Cultural experiences should benefit the communities who host them. We choose partners carefully, keep group sizes intimate, and never treat people as a backdrop. Ask us if you want a deeper immersion day built into your itinerary.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

const EXPERIENCE_META: Record<
  string,
  { label: string; title: string; destinations: string[]; highlights: string[] }
> = {
  wonder: {
    label: "Wonder",
    title: "Into the Mist",
    destinations: ["victoria-falls", "livingstone"],
    highlights: ["Rainforest Walk", "Livingstone Island", "Sunset Cruise", "Devil's Pool"],
  },
  wild: {
    label: "Wild",
    title: "Track the Big Five",
    destinations: ["chobe", "hwange"],
    highlights: ["Game Drives", "Boat Safaris", "Walking Safaris", "Night Drives"],
  },
  thrill: {
    label: "Thrill",
    title: "The Edge of the Zambezi",
    destinations: ["victoria-falls", "livingstone"],
    highlights: ["White-Water Rafting", "Bungee Jumping", "Zipline", "Microlight Flight", "Gorge Swing"],
  },
  culture: {
    label: "Culture",
    title: "Stories Around the Fire",
    destinations: ["victoria-falls", "livingstone", "hwange"],
    highlights: ["Boma Evenings", "Village Visits", "Traditional Dance", "Local Cuisine"],
  },
};

/** Home showcase shape — backed by blog posts. Prefer blogPosts / getPost. */
export const experiences = blogPosts.map((p) => {
  const meta = EXPERIENCE_META[p.slug] ?? {
    label: p.slug,
    title: p.title,
    destinations: [] as string[],
    highlights: [] as string[],
  };
  return {
    slug: p.slug,
    category: p.slug as "wonder" | "wild" | "thrill" | "culture",
    label: meta.label,
    title: meta.title,
    description: p.body,
    image: p.image,
    destinations: meta.destinations,
    highlights: meta.highlights,
  };
});

export function getExperienceBySlug(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
