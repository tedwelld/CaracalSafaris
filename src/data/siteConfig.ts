export const siteConfig = {
  name: "Caracal Safaris",
  tagline: "The Smoke That Thunders",
  url: "https://www.caracalsafaris.com",
  logo: "/images/caracal-logo.png",
  description:
    "Private journeys through Zimbabwe, Zambia & Botswana within the Victoria Falls Triangle.",
  email: "admin@caracalsafaris.com",
  whatsappNumber: "+263789276807",
  whatsappMessage:
    "Hello Caracal Safaris, I am interested in planning a private safari journey.",
  socials: {
    instagram: "https://instagram.com/caracalsafaris",
    facebook: "https://facebook.com/caracalsafaris",
    twitter: "https://twitter.com/caracalsafaris",
  },
  location: "Victoria Falls, Zimbabwe",
  // Bokun booking channel
  bokunChannelUUID:
    process.env.NEXT_PUBLIC_BOKUN_CHANNEL_UUID ??
    "00000000-0000-0000-0000-000000000000",
  bokunFeaturedListId: process.env.NEXT_PUBLIC_BOKUN_FEATURED_LIST_ID ?? "",
  bokunDefaultCurrency: process.env.NEXT_PUBLIC_BOKUN_DEFAULT_CURRENCY ?? "USD",
  counters: [
    { end: 3, label: "Countries", suffix: "" },
    { end: 4, label: "UNESCO Sites", suffix: "" },
    { end: 15, label: "Years Experience", suffix: "+" },
    { end: 500, label: "Private Journeys", suffix: "+" },
  ],
};
