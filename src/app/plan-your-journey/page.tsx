import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Start planning",
  description:
    "Outline dates and preferences for a private Caracal Africa Safaris itinerary across Zimbabwe, Zambia and Botswana.",
};

export default function PlanYourJourneyPage() {
  return (
    <>
      <section className="relative min-h-screen flex">
        {/* Left — form panel */}
        <div className="w-full lg:w-3/5 xl:w-1/2 bg-[var(--bg)] flex flex-col justify-center px-8 md:px-16 xl:px-24 py-32 lg:py-24 transition-colors duration-400">
          <div className="max-w-xl w-full mx-auto lg:mx-0">
            <SectionLabel>Planning form</SectionLabel>
            <h1
              className="text-[var(--fg)] text-4xl md:text-5xl mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Tell us how
              <br />
              <span className="text-[var(--accent)] italic" style={{ fontFamily: "var(--font-editorial)" }}>
                you travel.
              </span>
            </h1>
            <p className="text-[var(--fg-50)] mb-12 text-sm leading-relaxed">
              Five short steps. No payment yet — just enough detail for us to propose a clear safari plan.
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
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-16 right-12 max-w-xs text-right">
            <p
              className="text-white text-2xl leading-tight"
              style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
            >
              &ldquo;Good guiding is knowing when to wait — and where the light will fall.&rdquo;
            </p>
            <p className="text-[var(--accent)] text-xs mt-3 tracking-widest uppercase">Caracal Africa Safaris</p>
          </div>
        </div>
      </section>
    </>
  );
}
