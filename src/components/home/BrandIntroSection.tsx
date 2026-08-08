import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { siteConfig } from "@/data/siteConfig";

export default function BrandIntroSection() {
  return (
    <SectionWrapper id="about-intro" background="charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — text */}
        <ScrollReveal direction="left">
          <SectionLabel>Who We Are</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl leading-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Africa is not a destination.
            <br />
            <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              It is a state of wonder.
            </span>
          </h2>
          <p className="text-[var(--fg-70)] leading-relaxed mb-6 text-lg">
            Caracal Safaris is a private, fully guided safari experience rooted in the heart
            of the Victoria Falls Triangle. We operate across Zimbabwe, Zambia, and Botswana —
            three countries, one seamless journey.
          </p>
          <p className="text-[var(--fg-60)] leading-relaxed text-base">
            Our dual-licensed guides move seamlessly between borders. Your vehicle, your guide,
            your rhythm — one uninterrupted journey through the Victoria Falls Triangle,
            crafted entirely around you.
          </p>
        </ScrollReveal>

        {/* Right — counters */}
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
