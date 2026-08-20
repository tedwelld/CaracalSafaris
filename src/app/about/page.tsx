import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import OwnerSection from "@/components/shared/OwnerSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Caracal Africa Safaris is a Victoria Falls–based guiding team leading private safaris across Zimbabwe, Zambia and Botswana.",
};

const values = [
  {
    title: "Guides who live here",
    description:
      "Our team works these roads and parks year-round. Season, water levels and wildlife movement shape how we plan each day.",
  },
  {
    title: "Private by default",
    description:
      "Your vehicle and your guide. We don’t fold you into shared transfers or fixed group circuits.",
  },
  {
    title: "Borders handled for you",
    description:
      "Zimbabwe, Zambia and Botswana in one continuous safari — paperwork and timing managed so you stay focused on the bush.",
  },
  {
    title: "Partners who care for place",
    description:
      "We favour lodges and operators invested in conservation and fair community benefit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-20 overflow-hidden">
        <Image
          src="/images/elephant.jpeg"
          alt="Elephant in Hwange country"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>About Caracal Africa Safaris</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Guided from
            <br />
            <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              Victoria Falls home ground.
            </span>
          </h1>
        </div>
      </section>

      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <SectionLabel>Our story</SectionLabel>
            <h2
              className="text-[var(--fg)] text-4xl mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built where the Zambezi runs
            </h2>
            <p className="text-[var(--fg-70)] leading-relaxed mb-6">
              Caracal Africa Safaris started with guides who already knew this
              corner of southern Africa — the Falls, the river, Hwange and Chobe —
              and wanted guests to experience it with the same continuity locals enjoy.
            </p>
            <p className="text-[var(--fg-60)] leading-relaxed">
              Today we design private safaris that cross borders cleanly, keep
              group sizes small, and leave room for wildlife timing to lead the day.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative h-[420px] overflow-hidden rounded-sm">
              <Image
                src="/images/simunye.jpeg"
                alt="Evening at a Caracal-hosted lodge experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      <OwnerSection variant="detailed" />

      <SectionWrapper background="charcoal">
        <ScrollReveal className="mb-14">
          <SectionLabel>Why travel with us</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What guests notice
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

      <SectionWrapper background="dark">
        <div className="text-center">
          <ScrollReveal>
            <h2
              className="text-[var(--fg)] text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Talk through your dates
            </h2>
            <p className="text-[var(--fg-60)] mb-10 max-w-lg mx-auto">
              Share how you like to travel — we&apos;ll outline a clear safari plan.
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
