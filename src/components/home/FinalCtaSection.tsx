import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { siteConfig } from "@/data/siteConfig";

export default function FinalCtaSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/helicopter-ride.jpeg"
        alt="Aerial view over Victoria Falls"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative z-10 container-luxury text-center">
        <ScrollReveal>
          <p className="text-[#c4b49a] text-xs tracking-[0.3em] uppercase mb-6">
            Begin your journey
          </p>
          <h2
            className="text-white text-5xl md:text-7xl lg:text-8xl mb-8 leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            We will take
            <br />
            <span className="text-[#c4b49a] italic" style={{ fontFamily: "var(--font-editorial)" }}>
              you there.
            </span>
          </h2>
          <p
            className="text-white/70 text-lg md:text-xl max-w-lg mx-auto mb-12"
            style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
          >
            One conversation. One journey. One Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/plan-your-journey"
              className="bg-[#c4b49a] text-[#1a1a1a] px-10 py-4 rounded text-sm font-semibold tracking-wide hover:bg-[#d4c4aa] transition-colors duration-300 min-w-[220px] text-center"
            >
              Plan Your Journey
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Caracal Safaris, I am ready to plan my journey.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white/40 px-10 py-4 rounded text-sm tracking-wide hover:border-white hover:bg-white/5 transition-all duration-300 min-w-[220px] text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
