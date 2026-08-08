import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Plan Your Journey",
  description:
    "Start planning your private safari journey through Zimbabwe, Zambia and Botswana with Caracal Safaris. Tell us your dream — we'll build the rest.",
};

export default function PlanYourJourneyPage() {
  return (
    <>
      <section className="relative min-h-screen flex">
        {/* Left — form panel */}
        <div className="w-full lg:w-3/5 xl:w-1/2 bg-[var(--bg)] flex flex-col justify-center px-8 md:px-16 xl:px-24 py-32 lg:py-24 transition-colors duration-400">
          <div className="max-w-xl w-full mx-auto lg:mx-0">
            <SectionLabel>Start Here</SectionLabel>
            <h1
              className="text-[var(--fg)] text-4xl md:text-5xl mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Plan Your
              <br />
              <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
                Journey.
              </span>
            </h1>
            <p className="text-[var(--fg-50)] mb-12 text-sm leading-relaxed">
              Five simple steps. No commitment. Just tell us what you&apos;re dreaming
              of, and we&apos;ll craft a private journey around it.
            </p>

            <EnquiryForm />
          </div>
        </div>

        {/* Right — cinematic image (desktop only) */}
        <div className="hidden lg:block flex-1 relative">
          <Image
            src="/images/elephant-eye.jpeg"
            alt="Close encounter with an African elephant"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-16 right-12 max-w-xs text-right">
            <p
              className="text-white text-2xl leading-tight"
              style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
            >
              &ldquo;The wilderness holds answers to questions man has not yet learned to ask.&rdquo;
            </p>
            <p className="text-[var(--accent)] text-xs mt-3 tracking-widest uppercase">Biologist Loren Eiseley</p>
          </div>
        </div>
      </section>
    </>
  );
}
