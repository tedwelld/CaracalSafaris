import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import CinematicCard from "@/components/shared/CinematicCard";

const pillars = [
  {
    image: "/images/rainforest.jpeg",
    category: "Wonder",
    title: "The Smoke That Thunders",
    description:
      "Victoria Falls, Livingstone Island, rainforest walks. Where nature overwhelms in the best possible way.",
    href: "/experiences/wonder",
  },
  {
    image: "/images/lion.jpeg",
    category: "Wild",
    title: "Track the Big Five",
    description:
      "Hwange. Chobe. Open vehicles, expert trackers, and Africa's wildlife on its own terms.",
    href: "/experiences/wild",
  },
  {
    image: "/images/bungee.jpeg",
    category: "Thrill",
    title: "The Edge of the Gorge",
    description:
      "Grade 5 rapids. Bungee from 111 metres. Ziplines. Microlight flights. The Zambezi Gorge is a playground.",
    href: "/experiences/thrill",
  },
];

export default function ThreePillarsSection() {
  return (
    <section className="bg-[var(--bg)] section-padding transition-colors duration-400">
      <div className="container-luxury">
        <ScrollReveal className="mb-12">
          <SectionLabel>Three Ways to Experience Africa</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wonder. Wild. Thrill.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.category} delay={i * 0.12}>
              <CinematicCard
                image={p.image}
                category={p.category}
                title={p.title}
                description={p.description}
                href={p.href}
                height="h-[500px] md:h-[640px]"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
