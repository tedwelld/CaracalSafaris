import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Understand the Caracal Safaris journey — from private consultation to seamless cross-border safari across Zimbabwe, Zambia and Botswana.",
};

const packages = [
  {
    name: "2–4 Day Escape",
    tagline: "A taste of the Triangle",
    includes: ["Victoria Falls experience", "1–2 activities", "Luxury lodge stay", "Private guide"],
    ideal: "Short breaks, first-time visitors",
  },
  {
    name: "5–7 Day Signature",
    tagline: "The complete experience",
    includes: ["Victoria Falls + one safari destination", "Cross-border transfer", "3–5 curated experiences", "Private guide throughout"],
    ideal: "Couples, honeymooners, small groups",
    featured: true,
  },
  {
    name: "8–12 Day Immersion",
    tagline: "Africa without compromise",
    includes: ["Victoria Falls + Chobe + Hwange", "Full cross-border journey", "Walking, boat & game drive safaris", "Bespoke itinerary"],
    ideal: "Serious travellers, wildlife enthusiasts",
  },
];

export default function JourneyPage() {
  return (
    <>
      {/* Hero — dark overlay, text stays white */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-20 overflow-hidden">
        <Image
          src="/images/sunset-cruise.jpeg"
          alt="Sunset cruise on the Zambezi"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>The Journey</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            One journey.
            <br />
            <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              Three countries.
            </span>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <SectionLabel>Our Approach</SectionLabel>
            <h2
              className="text-[var(--fg)] text-4xl md:text-5xl mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Private, seamless, unforgettable
            </h2>
            <p className="text-[var(--fg-70)] leading-relaxed mb-6">
              The Victoria Falls Triangle — Zimbabwe, Zambia, and Botswana — is one
              contiguous wilderness. Most operators treat the borders as barriers.
              We treat them as opportunities.
            </p>
            <p className="text-[var(--fg-60)] leading-relaxed">
              With dual-licensed guides and established relationships across all
              three countries, Caracal Safaris moves you through this landscape without friction.
              One vehicle, one guide, one uninterrupted story.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative h-80 overflow-hidden rounded-sm">
              <Image
                src="/images/game-drive.jpeg"
                alt="Private game drive"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Journey packages */}
      <SectionWrapper background="dark">
        <ScrollReveal className="mb-14">
          <SectionLabel>Journey Options</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Choose your length
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.name} delay={i * 0.1}>
              <div
                className={`p-8 rounded-sm border h-full flex flex-col transition-colors duration-400 ${
                  pkg.featured
                    ? "border-[var(--accent)] bg-[var(--accent)]/5"
                    : "border-[var(--fg-10)] bg-[var(--fg-05)]"
                }`}
              >
                {pkg.featured && (
                  <span className="text-[var(--accent)] text-xs tracking-widest uppercase mb-4 block">
                    Most Popular
                  </span>
                )}
                <h3
                  className="text-[var(--fg)] text-2xl mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pkg.name}
                </h3>
                <p
                  className="text-[var(--accent)] mb-6 italic"
                  style={{ fontFamily: "var(--font-editorial)" }}
                >
                  {pkg.tagline}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[var(--fg-60)] text-sm">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[var(--fg-40)] text-xs mb-6">Ideal for: {pkg.ideal}</p>
                <Link
                  href="/plan-your-journey"
                  className={`text-center py-3 px-6 rounded text-sm font-medium transition-colors duration-300 ${
                    pkg.featured
                      ? "bg-[var(--accent)] text-[#1a1a1a] hover:bg-[var(--accent-hover)]"
                      : "border border-[var(--fg-20)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  Plan this journey
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="charcoal">
        <div className="text-center">
          <ScrollReveal>
            <h2
              className="text-[var(--fg)] text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to begin?
            </h2>
            <p className="text-[var(--fg-60)] mb-10 max-w-lg mx-auto">
              Tell us your dream. We will build the rest.
            </p>
            <Link
              href="/plan-your-journey"
              className="inline-block bg-[var(--accent)] text-[#1a1a1a] px-10 py-4 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Plan Your Journey
            </Link>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
