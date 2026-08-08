import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "About Caracal Safaris",
  description:
    "Caracal Safaris was born in the landscape — decades of guiding across Zimbabwe, Zambia and Botswana, built on local expertise, private journeys and deep conservation values.",
};

const values = [
  {
    title: "Local Knowledge",
    description:
      "Our guides have lived and worked in the Victoria Falls Triangle for decades. They know the rain, the seasons, the animals, and the people.",
  },
  {
    title: "Truly Private",
    description:
      "Every journey is yours alone. Your vehicle, your guide, your pace. No shared transfers, no group tours.",
  },
  {
    title: "Seamless Borders",
    description:
      "Dual-licensed and cross-border accredited. We handle all logistics between Zimbabwe, Zambia, and Botswana.",
  },
  {
    title: "Conservation First",
    description:
      "We work with properties and communities committed to conservation and responsible tourism.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — dark overlay, text stays white */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-20 overflow-hidden">
        <Image
          src="/images/elephant.jpeg"
          alt="Elephant in the wild"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>About Caracal Safaris</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Born in the
            <br />
            <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              landscape.
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <SectionLabel>Our Story</SectionLabel>
            <h2
              className="text-[var(--fg)] text-4xl mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Raised on the banks of the Zambezi
            </h2>
            <p className="text-[var(--fg-70)] leading-relaxed mb-6">
              Caracal Safaris grew out of a simple belief: that the
              Victoria Falls Triangle — spanning Zimbabwe, Zambia, and Botswana —
              is one of the world&apos;s greatest wilderness experiences, and that
              most visitors only see a fraction of it.
            </p>
            <p className="text-[var(--fg-60)] leading-relaxed">
              Our team of dual-licensed guides has spent decades navigating this
              terrain. We have built relationships with the best lodges,
              conservation projects, and community experiences across all three
              countries — so that your journey is seamless, private, and
              genuinely immersive.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative h-[420px] overflow-hidden rounded-sm">
              <Image
                src="/images/simunye.jpeg"
                alt="The Caracal Safaris experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper background="dark">
        <ScrollReveal className="mb-14">
          <SectionLabel>Why Caracal Safaris</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What makes us different
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="border-l-2 border-[var(--accent)] pl-8">
                <h3
                  className="text-[var(--fg)] text-xl mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p className="text-[var(--fg-60)] leading-relaxed">{v.description}</p>
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
              Come journey with us
            </h2>
            <p className="text-[var(--fg-60)] mb-10 max-w-lg mx-auto">
              Every journey is personal. Let&apos;s talk about yours.
            </p>
            <Link
              href="/plan-your-journey"
              className="inline-block bg-[var(--accent)] text-[var(--accent-fg)] px-10 py-4 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Plan Your Journey
            </Link>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
