import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { destinations, getDestinationBySlug } from "@/data/destinations";

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return {
    title: dest.name,
    description: dest.description,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  return (
    <>
      {/* Hero — dark overlay, text stays white */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 overflow-hidden">
        <Image
          src={dest.heroImage}
          alt={dest.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/85" />
        <div className="relative z-10 container-luxury">
          <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-3">{dest.country}</p>
          <h1
            className="text-white text-5xl md:text-7xl lg:text-8xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {dest.name}
          </h1>
          <p
            className="text-white/70 text-xl md:text-2xl mt-4 italic"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {dest.tagline}
          </p>
        </div>
      </section>

      {/* Overview */}
      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-[var(--fg-80)] text-lg leading-relaxed mb-8">
              {dest.longDescription}
            </p>
            <div className="border-t border-[var(--fg-10)] pt-8">
              <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-3">Best Time to Visit</p>
              <p className="text-[var(--fg-60)] text-sm">{dest.bestTime}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div>
              <h3
                className="text-[var(--fg)] text-2xl mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Highlights
              </h3>
              <ul className="space-y-3 mb-10">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-[var(--fg-70)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <h3
                className="text-[var(--fg)] text-2xl mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Wildlife
              </h3>
              <div className="flex flex-wrap gap-2">
                {dest.wildlife.map((w) => (
                  <span
                    key={w}
                    className="text-xs text-[var(--fg-60)] border border-[var(--fg-15)] px-3 py-1.5 rounded-full"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="bg-[var(--bg-alt)] py-24 transition-colors duration-400">
        <div className="container-luxury text-center">
          <ScrollReveal>
            <h2
              className="text-[var(--fg)] text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Plan your journey to {dest.name}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href={`/plan-your-journey?destination=${dest.slug}`}
                className="bg-[var(--accent)] text-[#1a1a1a] px-8 py-4 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
              >
                Plan This Journey
              </Link>
              <Link
                href="/destinations"
                className="border border-[var(--fg-20)] text-[var(--fg)] px-8 py-4 rounded text-sm hover:border-[var(--fg-40)] transition-colors"
              >
                All Destinations
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
