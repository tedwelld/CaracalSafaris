import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Wonder, Wild, Thrill, Culture — four ways to experience the Victoria Falls Triangle with Caracal Safaris.",
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[360px] flex items-end pb-16 overflow-hidden">
        <Image
          src="/images/rainforest.jpeg"
          alt="Safari experiences"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>Experiences</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Wonder. Wild. Thrill.
          </h1>
        </div>
      </section>

      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.slug} delay={i * 0.1}>
              <Link href={`/experiences/${exp.slug}`} className="group block">
                <div className="relative h-64 overflow-hidden rounded-sm mb-5">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <SectionLabel>{exp.label}</SectionLabel>
                <h2
                  className="text-[var(--fg)] text-2xl mb-3 group-hover:text-[var(--accent)] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {exp.title}
                </h2>
                <p className="text-[var(--fg-60)] text-sm leading-relaxed mb-3">
                  {exp.description}
                </p>
                <span className="text-[var(--accent)] text-sm">Discover {exp.label} →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
