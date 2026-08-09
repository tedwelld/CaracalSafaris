import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import { FeaturedListings } from "@/components/bokun/FeaturedListings";

export default function FeaturedToursSection() {
  return (
    <SectionWrapper background="dark" id="featured-tours">
      <div className="text-center mb-12">
        <SectionLabel>Tours &amp; Activities</SectionLabel>
        <h2
          className="text-[var(--fg)] text-4xl md:text-5xl mt-4"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Featured Safari Tours
        </h2>
        <p className="text-[var(--fg-60)] mt-4 max-w-xl mx-auto text-base">
          Most booked adventures — live availability and booking powered by Bókun.
        </p>
      </div>
      <FeaturedListings />
    </SectionWrapper>
  );
}
