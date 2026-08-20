import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { owner } from "@/data/owner";

type Props = {
  /** Homepage teaser vs full About treatment */
  variant?: "teaser" | "detailed";
};

export default function OwnerSection({ variant = "teaser" }: Props) {
  if (variant === "detailed") {
    return (
      <SectionWrapper id="owner" background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ScrollReveal className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src={owner.image}
                alt={owner.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <p className="mt-4 text-xs tracking-widest uppercase text-[var(--fg-40)]">
              {owner.location}
            </p>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <SectionLabel>The owner</SectionLabel>
              <h2
                className="text-[var(--fg)] text-4xl md:text-5xl leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {owner.name}
              </h2>
              <p
                className="text-[var(--accent)] text-lg mb-8"
                style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
              >
                {owner.role}
              </p>
              {owner.bio.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="text-[var(--fg-70)] leading-relaxed mb-5 text-base md:text-lg"
                >
                  {para}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="mt-12">
              <h3
                className="text-[var(--fg)] text-2xl mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What he can do for you
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {owner.detailedCapabilities.map((cap) => (
                  <div
                    key={cap.title}
                    className="border-l-2 border-[var(--accent)] pl-5"
                  >
                    <h4
                      className="text-[var(--fg)] text-lg mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cap.title}
                    </h4>
                    <p className="text-[var(--fg-60)] text-sm leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="owner" background="charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <ScrollReveal>
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm">
            <Image
              src={owner.image}
              alt={owner.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.08}>
          <SectionLabel>Meet the owner</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {owner.name}
          </h2>
          <p
            className="text-[var(--accent)] text-lg mb-6"
            style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
          >
            {owner.role}
          </p>
          <p className="text-[var(--fg-70)] leading-relaxed mb-8 text-base md:text-lg">
            {owner.teaser}
          </p>

          <ul className="space-y-3 mb-10">
            {owner.capabilities.slice(0, 5).map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[var(--fg-60)] text-sm"
              >
                <i
                  className="pi pi-check mt-0.5 text-[var(--accent)]"
                  style={{ fontSize: "12px" }}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about#owner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            More about your host
            <i className="pi pi-arrow-right" style={{ fontSize: "12px" }} />
          </Link>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
