"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/shared/ScrollReveal";

const destinations = [
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe / Zambia",
    image: "/images/sunset-cruise.jpeg",
    className: "col-span-2 row-span-2 md:col-span-1 md:row-span-1",
    height: "h-72 md:h-96 lg:h-[480px]",
  },
  {
    slug: "livingstone",
    name: "Livingstone",
    country: "Zambia",
    image: "/images/elephant.jpeg",
    className: "",
    height: "h-64 md:h-56 lg:h-56",
  },
  {
    slug: "chobe",
    name: "Chobe",
    country: "Botswana",
    image: "/images/boat-cruise.jpeg",
    className: "",
    height: "h-64 md:h-56 lg:h-56",
  },
  {
    slug: "hwange",
    name: "Hwange",
    country: "Zimbabwe",
    image: "/images/game-drive.jpeg",
    className: "",
    height: "h-64 md:h-56 lg:h-56",
  },
];

export default function DestinationsPreviewSection() {
  return (
    <SectionWrapper id="destinations" background="charcoal">
      <ScrollReveal className="mb-12">
        <SectionLabel>Where we take you</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl max-w-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four places. One Caracal guide.
          </h2>
          <Link
            href="/destinations"
            className="text-[var(--accent)] text-sm tracking-wide hover:text-[var(--accent-hover)] transition-colors"
          >
            Explore destinations →
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large featured card — Victoria Falls */}
        <ScrollReveal delay={0} className="md:row-span-2">
          <DestCard d={destinations[0]} large />
        </ScrollReveal>

        {/* Right column — 3 smaller */}
        {destinations.slice(1).map((d, i) => (
          <ScrollReveal key={d.slug} delay={0.1 + i * 0.08}>
            <DestCard d={d} />
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}

function DestCard({ d, large }: { d: typeof destinations[number]; large?: boolean }) {
  return (
    <motion.div
      whileHover="hover"
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${large ? "h-80 md:h-full md:min-h-[480px]" : "h-52 md:h-56"}`}
    >
      <motion.div
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image src={d.image} alt={d.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover gold overlay */}
      <motion.div
        variants={{ hover: { opacity: 0.15 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[var(--accent)]"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-1">{d.country}</p>
        <h3 className="text-white text-2xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
          {d.name}
        </h3>
        <motion.div
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/destinations/${d.slug}`}
            className="text-[var(--accent)] text-sm hover:text-[var(--accent-hover)] transition-colors"
          >
            Explore More →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
