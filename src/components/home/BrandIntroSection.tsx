import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { siteConfig } from "@/data/siteConfig";

export default function BrandIntroSection() {
  return (
    <SectionWrapper id="about-intro" background="charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <ScrollReveal direction="left">
          <SectionLabel>Who we are</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl leading-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Not a brochure itinerary.
            <br />
            <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              A safari shaped around you.
            </span>
          </h2>
          <p className="text-[var(--fg-70)] leading-relaxed mb-6 text-lg">
            Caracal Africa Safaris is a Victoria Falls–based team of private guides.
            We lead small groups and families across Zimbabwe, Zambia and Botswana —
            with the same guide, the same vehicle, and a plan written for how you travel.
          </p>
          <p className="text-[var(--fg-60)] leading-relaxed text-base">
            Cross-border paperwork, lodge timing and wildlife pacing are handled for you.
            You bring curiosity; we bring the road knowledge that only comes from living here.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1}>
          <div className="grid grid-cols-2 gap-8">
            {siteConfig.counters.map((c) => (
              <AnimatedCounter
                key={c.label}
                end={c.end}
                label={c.label}
                suffix={c.suffix}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
