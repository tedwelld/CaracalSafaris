import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { FeaturedListings } from "@/components/bokun/FeaturedListings";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Book safari experiences across Zimbabwe, Zambia and Botswana — live availability powered by Bókun.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHeader
        title="Experiences"
        subtitle="Game drives, boat cruises, walks and adventures — check live availability and book online."
        image="/images/elephant-eye.jpeg"
      />
      <Section>
        <FeaturedListings
          limit={undefined}
          emptyMessage="Experiences will appear here once Bókun is connected. Check back soon, or plan a private journey with us."
        />
      </Section>
    </>
  );
}
