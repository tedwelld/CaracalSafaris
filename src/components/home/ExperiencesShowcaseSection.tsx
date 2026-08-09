import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { experiences } from "@/data/experiences";

export default function ExperiencesShowcaseSection() {
  return (
    <SectionWrapper id="experiences" background="dark">
      <ScrollReveal className="mb-16">
        <SectionLabel>What We Do</SectionLabel>
        <h2
          className="text-[var(--fg)] text-4xl md:text-5xl max-w-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Experiences that stay with you
        </h2>
      </ScrollReveal>

      <div className="space-y-24">
        {experiences.map((exp, i) => (
          <div
            key={exp.slug}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              i % 2 !== 0 ? "lg:[&>*:first-child]:order-last" : ""
            }`}
          >
            {/* Image */}
            <ScrollReveal direction={i % 2 === 0 ? "left" : "right"}>
              <div className="relative h-80 md:h-[420px] overflow-hidden rounded-sm">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal direction={i % 2 === 0 ? "right" : "left"} delay={0.1}>
              <SectionLabel>{exp.label}</SectionLabel>
              <h3
                className="text-[var(--fg)] text-3xl md:text-4xl mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {exp.title}
              </h3>
              <p className="text-[var(--fg)]/70 leading-relaxed text-lg mb-6">
                {exp.description}
              </p>
              <ul className="space-y-2 mb-8">
                {exp.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-center gap-3 text-[var(--fg)]/60 text-sm">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link
                href={`/blog/${exp.slug}`}
                className="text-[var(--accent)] text-sm tracking-wide hover:text-[var(--accent-hover)] transition-colors"
              >
                Read {exp.label} stories →
              </Link>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
