"use client";

import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Share your brief",
    description:
      "Dates, group size, pace, and what you care about most — wildlife, the Falls, adventure, or quiet lodges.",
    icon: <i className="pi pi-compass" style={{ fontSize: "40px" }} />,
  },
  {
    number: "02",
    title: "We design the route",
    description:
      "Lodges, activities and border timing are sequenced into one coherent safari — not a stack of disconnected bookings.",
    icon: <i className="pi pi-sliders-h" style={{ fontSize: "40px" }} />,
  },
  {
    number: "03",
    title: "Travel with your guide",
    description:
      "Meet your Caracal guide on arrival. From there, the day flexes with wildlife sightings, weather and your energy.",
    icon: <i className="pi pi-verified" style={{ fontSize: "40px" }} />,
  },
];

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" background="dark">
      <ScrollReveal>
        <SectionLabel>How booking works</SectionLabel>
        <h2
          className="text-[var(--fg)] text-4xl md:text-5xl mb-16 max-w-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          From first message to first game drive
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-[var(--accent)]/20" />

        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.15} direction="up">
            <div className="relative group">
              <div
                className="text-[var(--accent)]/20 text-8xl font-bold absolute -top-4 -left-2 select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </div>

              <div className="relative z-10 text-[var(--accent)] mb-6 mt-4">
                {step.icon}
              </div>

              <h3
                className="text-[var(--fg)] text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p className="text-[var(--fg)]/60 leading-relaxed">{step.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
