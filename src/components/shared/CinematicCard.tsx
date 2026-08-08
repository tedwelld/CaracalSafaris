"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

interface CinematicCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
  height?: string;
}

export default function CinematicCard({
  image,
  category,
  title,
  description,
  href,
  height = "h-[600px]",
}: CinematicCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${height} overflow-hidden rounded-sm group cursor-pointer`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <SectionLabel>{category}</SectionLabel>
        <h3
          className="text-[#f5f0e8] text-3xl mb-3 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <p className="text-[#f5f0e8]/70 text-sm leading-relaxed mb-5 max-w-xs">
          {description}
        </p>
        <Link
          href={href}
          className="text-[#c4b49a] text-sm tracking-wide hover:text-[#d4c4aa] transition-colors inline-flex items-center gap-2"
        >
          Explore →
        </Link>
      </div>
    </motion.div>
  );
}
