import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";
import CinematicCard from "@/components/shared/CinematicCard";

const pillars = [
  {
    image: "/images/rainforest.jpeg",
    category: "Wonder",
    title: "Falls, spray & rainforest paths",
    description:
      "Walk the gorge rim, feel the mist, and take quieter viewpoints most day-trippers never reach.",
    href: "/blog/wonder",
  },
  {
    image: "/images/lion.jpeg",
    category: "Wild",
    title: "Open-vehicle game country",
    description:
      "Hwange and Chobe with trackers who read the bush — elephant herds, lion country, and slow mornings at waterholes.",
    href: "/blog/wild",
  },
  {
    image: "/images/bungee.jpeg",
    category: "Thrill",
    title: "Gorge adrenaline, on your terms",
    description:
      "Rafting, bridge jumps, ziplines and microlights — sequenced so the day still feels like a safari, not a queue.",
    href: "/blog/thrill",
  },
];

export default function ThreePillarsSection() {
  return (
    <section className="bg-[var(--bg)] section-padding transition-colors duration-400">
      <div className="container-luxury">
        <ScrollReveal className="mb-12">
          <SectionLabel>How a Caracal safari unfolds</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wonder. Wildlife. Edge.
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
