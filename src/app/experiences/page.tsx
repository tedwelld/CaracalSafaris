import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { ExperiencesCatalog } from "@/components/bokun/ExperiencesCatalog";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Search and filter safari experiences across Zimbabwe, Zambia and Botswana — live availability powered by Bókun.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHeader
        title="Experiences"
        subtitle="Search, filter and book game drives, cruises, walks and adventures — live availability powered by Bókun."
        image="/images/elephant-eye.jpeg"
      />
      <Section>
        <ExperiencesCatalog />
      </Section>
    </>
  );
}
