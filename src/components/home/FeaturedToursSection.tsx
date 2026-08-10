import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import { FeaturedListings } from "@/components/bokun/FeaturedListings";

export default function FeaturedToursSection() {
  return (
    <SectionWrapper background="dark" id="featured-tours">
      <div className="text-center mb-12">
        <SectionLabel>Bookable experiences</SectionLabel>
        <h2
          className="text-[var(--fg)] text-4xl md:text-5xl mt-4"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Popular activities right now
        </h2>
        <p className="text-[var(--fg-60)] mt-4 max-w-xl mx-auto text-base">
          Live availability for Falls, river and wildlife activities — book online or ask us to weave them into a private safari.
        </p>
      </div>
      <FeaturedListings />
    </SectionWrapper>
  );
}
