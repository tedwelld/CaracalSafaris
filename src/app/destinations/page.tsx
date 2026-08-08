import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Victoria Falls, Livingstone, Chobe and Hwange — four extraordinary destinations within the Victoria Falls Triangle.",
};

export default function DestinationsPage() {
  return (
    <>
      {/* Hero — dark overlay, text stays white */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end pb-16 overflow-hidden">
        <Image
          src="/images/victoria-falls.jpeg"
          alt="The Victoria Falls Triangle"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>The Victoria Falls Triangle</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Four destinations.
          </h1>
        </div>
      </section>

      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest, i) => (
            <ScrollReveal key={dest.slug} delay={i * 0.1}>
              <Link href={`/destinations/${dest.slug}`} className="group block">
                <div className="relative h-72 overflow-hidden rounded-sm mb-5">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[var(--accent)] text-xs tracking-widest uppercase">{dest.country}</p>
                  </div>
                </div>
                <h2
                  className="text-[var(--fg)] text-2xl mb-2 group-hover:text-[var(--accent)] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {dest.name}
                </h2>
                <p className="text-[var(--fg-60)] text-sm leading-relaxed mb-3">
                  {dest.description}
                </p>
                <span className="text-[var(--accent)] text-sm">Explore {dest.name} →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
