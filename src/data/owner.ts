/** Owner / lead guide profile — update name & image when you have the final portrait. */

export type OwnerCapability = {
  title: string;
  description: string;
};

export const owner = {
  /** Full name of the owner / lead guide */
  name: "Our Founder",
  role: "Founder & Lead Safari Guide",
  location: "Victoria Falls, Zimbabwe",
  /** Replace with `/images/owner.jpeg` once you add a portrait to public/images */
  image: "/images/game-drive.jpeg",
  imageAlt: "Caracal Africa Safaris founder and lead guide in the field",
  /** Homepage teaser */
  teaser:
    "A Victoria Falls–based guide who designs private safaris across Zimbabwe, Zambia and Botswana — and stays with you on the road.",
  /** About page opening */
  bio: [
    "Caracal Africa Safaris is owner-led from Victoria Falls. Guests don’t get handed between call centres and subcontractors — they travel with a guide who knows these borders, parks and seasons personally.",
    "From first WhatsApp message to the last sundowner, the same person shapes the plan: Falls timing, river light, Hwange pans, Chobe boats, and the quiet logistics that keep a private safari feeling effortless.",
  ],
  /** Short “what he can do” chips / list for homepage */
  capabilities: [
    "Private Falls & rainforest guiding",
    "Cross-border Zimbabwe · Zambia · Botswana",
    "Hwange & Chobe game drives",
    "Custom itineraries for couples & families",
    "Lodge, activity & transfer coordination",
    "Flexible pacing around wildlife & weather",
  ] as string[],
  /** Richer capability cards for About */
  detailedCapabilities: [
    {
      title: "Private guiding",
      description:
        "Your vehicle and your guide for the Falls, the Zambezi, and the parks beyond — no shared-bus circuits.",
    },
    {
      title: "Cross-border safaris",
      description:
        "Seamless Zimbabwe–Zambia–Botswana journeys with paperwork and timing handled so you stay focused on the bush.",
    },
    {
      title: "Wildlife days",
      description:
        "Open-vehicle drives in Hwange, boat safaris on the Chobe, and walks when conditions and regulations allow.",
    },
    {
      title: "Bespoke planning",
      description:
        "Itineraries built around your dates, pace and interests — photography, adventure, culture or slow lodge time.",
    },
    {
      title: "On-ground logistics",
      description:
        "Lodges, activities, pickups and border windows coordinated into one continuous trip.",
    },
    {
      title: "Responsive hosting",
      description:
        "Direct contact before and during travel. Plans flex with sightings, water levels and how you feel each day.",
    },
  ] as OwnerCapability[],
};
