import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ExperienceActivities from "@/components/cart/ExperienceActivities";
import { experiences, getExperienceBySlug } from "@/data/experiences";
import { getActivitiesByExperience } from "@/data/activities";

export async function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  return { title: exp.title, description: exp.description };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  const activities = getActivitiesByExperience(slug);

  return (
    <>
      <section className="relative h-[65vh] min-h-[450px] flex items-end pb-20 overflow-hidden">
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/85" />
        <div className="relative z-10 container-luxury">
          <SectionLabel>{exp.label}</SectionLabel>
          <h1
            className="text-white text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {exp.title}
          </h1>
        </div>
      </section>

      <SectionWrapper background="charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <p className="text-[var(--fg-80)] text-lg leading-relaxed mb-8">{exp.description}</p>
            <h3
              className="text-[var(--fg)] text-2xl mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Choose activities
            </h3>
            <ExperienceActivities activities={activities} />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="bg-[var(--fg-05)] border border-[var(--fg-10)] rounded-sm p-8 transition-colors duration-400">
              <h3
                className="text-[var(--fg)] text-2xl mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Build your journey
              </h3>
              <p className="text-[var(--fg-60)] mb-8 text-sm leading-relaxed">
                Add the activities you want to your cart, then check out. We&apos;ll confirm
                availability and payment arrangements within 24 hours.
              </p>
              <Link
                href="/cart"
                className="block text-center bg-[var(--accent)] text-[var(--accent-fg)] px-6 py-3.5 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors mb-4"
              >
                View cart
              </Link>
              <Link
                href="/plan-your-journey"
                className="block text-center border border-[var(--fg-20)] text-[var(--fg)] px-6 py-3.5 rounded text-sm hover:border-[var(--accent)] transition-colors mb-4"
              >
                Or plan a custom journey
              </Link>
              <Link
                href="/experiences"
                className="block text-center text-[var(--fg-60)] text-sm hover:text-[var(--fg)] transition-colors"
              >
                ← All Experiences
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  );
}
