export const siteConfig = {
  name: "Caracal Africa Safaris",
  tagline: "Born on the Zambezi. Built for you.",
  url: "https://www.caracalafricasafaris.com",
  logo: "/images/caracal-logo.png",
  description:
    "Locally led private safaris across Zimbabwe, Zambia and Botswana — crafted around your pace, with guides who live this landscape.",
  /** Public general contact (contact page / footer default). */
  email: "info@caracalafricasafaris.com",
  emails: {
    admin: "admin@caracalafricasafaris.com",
    info: "info@caracalafricasafaris.com",
    reservations: "reservations@caracalafricasafaris.com",
  },
  whatsappNumber: "+263789276807",
  whatsappMessage:
    "Hello Caracal Africa Safaris — I'd like help planning a private safari.",
  socials: {
    instagram: "https://instagram.com/caracalsafaris",
    facebook: "https://facebook.com/caracalsafaris",
    twitter: "https://twitter.com/caracalsafaris",
  },
  location: "Victoria Falls, Zimbabwe",
  bokunChannelUUID:
    process.env.NEXT_PUBLIC_BOKUN_CHANNEL_UUID ??
    "00000000-0000-0000-0000-000000000000",
  bokunFeaturedListId: process.env.NEXT_PUBLIC_BOKUN_FEATURED_LIST_ID ?? "",
  bokunDefaultCurrency: process.env.NEXT_PUBLIC_BOKUN_DEFAULT_CURRENCY ?? "USD",
  counters: [
    { end: 3, label: "Countries", suffix: "" },
    { end: 4, label: "UNESCO Sites", suffix: "" },
    { end: 15, label: "Years Guiding", suffix: "+" },
    { end: 500, label: "Private Safaris", suffix: "+" },
  ],
};
