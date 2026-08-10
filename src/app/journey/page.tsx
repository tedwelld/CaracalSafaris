import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "How a Caracal Africa Safaris private safari works — from first brief to cross-border days in Zimbabwe, Zambia and Botswana.",
};

const packages = [
  {
    name: "2–4 Day Escape",
    tagline: "Falls-focused with room to breathe",
    includes: ["Victoria Falls experiences", "1–2 activities", "Lodge stay", "Private guide"],
    ideal: "Short stays and first visits",
  },
  {
    name: "5–7 Day Signature",
    tagline: "Falls plus one wildlife region",
    includes: ["Falls + Hwange or Chobe", "Cross-border transfer", "3–5 activities", "Private guide throughout"],
    ideal: "Couples, honeymoons, small groups",
    featured: true,
  },
  {
    name: "8–12 Day Immersion",
    tagline: "The full Caracal circuit",
    includes: ["Falls + Chobe + Hwange", "Full cross-border route", "Boat, drive & walk options", "Bespoke pacing"],
    ideal: "Wildlife enthusiasts and longer stays",
  },
];

export default function JourneyPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-20 overflow-hidden">
        <Image
          src="/images/sunset-cruise.jpeg"
          alt="Sunset on the Zambezi"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>How we travel</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            One guide.
            <br />
            <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              Three countries.
            </span>
          </h1>
        </div>
      </section>

      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <SectionLabel>Our approach</SectionLabel>
            <h2
              className="text-[var(--fg)] text-4xl md:text-5xl mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Private days, continuous route
            </h2>
            <p className="text-[var(--fg-70)] leading-relaxed mb-6">
              Zimbabwe, Zambia and Botswana sit in one wildlife and river corridor.
              We plan the sequence so borders feel like a change of scenery — not a reset of your trip.
            </p>
            <p className="text-[var(--fg-60)] leading-relaxed">
              Your Caracal guide stays with you. Lodges, activities and transfer windows
              are booked to match how you like to move: early starts for wildlife, slower
              mornings when you want them.
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

      <SectionWrapper background="dark">
        <ScrollReveal className="mb-14">
          <SectionLabel>Safari lengths</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pick a frame — we refine the details
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
                    Most requested
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
                      ? "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
                      : "border border-[var(--fg-20)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  Enquire about this length
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="charcoal">
        <div className="text-center">
          <ScrollReveal>
            <h2
              className="text-[var(--fg)] text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to outline dates?
            </h2>
            <p className="text-[var(--fg-60)] mb-10 max-w-lg mx-auto">
              Send a short brief — we reply with a clear proposed route.
            </p>
            <Link
              href="/plan-your-journey"
              className="inline-block bg-[var(--accent)] text-[var(--accent-fg)] px-10 py-4 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Start planning
            </Link>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
