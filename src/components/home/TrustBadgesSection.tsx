import SectionWrapper from "@/components/shared/SectionWrapper";
import ScrollReveal from "@/components/shared/ScrollReveal";

const TripAdvisorBadge = () => (
  <div className="flex flex-col items-center gap-5">
    {/* Badge */}
    <div className="relative flex flex-col items-center justify-center w-44 h-44 rounded-full bg-[#00aa6c] shadow-2xl ring-4 ring-[#00aa6c]/30">
      {/* Owl icon using PrimeIcon as stand-in, overlaid with custom owl paths */}
      <svg
        viewBox="0 0 64 64"
        className="w-16 h-16 mb-1"
        fill="white"
        aria-hidden="true"
      >
        {/* Simplified owl silhouette */}
        <ellipse cx="32" cy="34" rx="18" ry="20" />
        <ellipse cx="22" cy="19" rx="9" ry="11" />
        <ellipse cx="42" cy="19" rx="9" ry="11" />
        {/* Eyes */}
        <circle cx="22" cy="20" r="5" fill="#00aa6c" />
        <circle cx="42" cy="20" r="5" fill="#00aa6c" />
        <circle cx="22" cy="20" r="2.5" fill="white" />
        <circle cx="42" cy="20" r="2.5" fill="white" />
        {/* Beak */}
        <polygon points="32,27 29,32 35,32" fill="#f5a623" />
        {/* Wings */}
        <ellipse cx="13" cy="38" rx="6" ry="10" transform="rotate(-15 13 38)" />
        <ellipse cx="51" cy="38" rx="6" ry="10" transform="rotate(15 51 38)" />
        {/* Feet */}
        <rect x="24" y="52" width="4" height="6" rx="2" />
        <rect x="36" y="52" width="4" height="6" rx="2" />
      </svg>
      <p className="text-white text-[10px] tracking-[0.2em] uppercase font-bold leading-none">
        Travelers&apos;
      </p>
      <p className="text-white text-[10px] tracking-[0.2em] uppercase font-bold leading-none">
        Choice
      </p>
    </div>

    {/* Year + Label */}
    <div className="text-center">
      <p
        className="text-[var(--accent)] text-4xl font-bold leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        2024
      </p>
      <p className="text-[var(--fg-60)] text-xs tracking-widest uppercase mt-1">
        TripAdvisor Award
      </p>
    </div>
  </div>
);

export default function TrustBadgesSection() {
  return (
    <SectionWrapper background="dark" className="py-20 border-t border-[var(--fg-05)]">
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-3">
            Recognition
          </p>
          <h2
            className="text-[var(--fg)] text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Trusted by guests who return
          </h2>
          <p className="text-[var(--fg-50)] mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Consistent guest feedback on TripAdvisor reflects how we guide —
            attentive, local, and unhurried.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <TripAdvisorBadge />

          {/* Divider */}
          <div className="hidden sm:block w-px h-40 bg-[var(--fg-10)]" />

          {/* Description */}
          <div className="max-w-xs text-center sm:text-left">
            <p
              className="text-[var(--fg)] text-xl mb-3 leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TripAdvisor Travelers&apos; Choice Award 2024
            </p>
            <p className="text-[var(--fg-55)] text-sm leading-relaxed mb-5">
              Awarded to the top 10% of businesses worldwide based on the
              quality and consistency of traveller reviews over the past year.
            </p>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className="pi pi-star-fill"
                  style={{ color: "#00aa6c", fontSize: "16px" }}
                />
              ))}
              <span className="text-[var(--fg-50)] text-xs ml-1">5.0 on TripAdvisor</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
