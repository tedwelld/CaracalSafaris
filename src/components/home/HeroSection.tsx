"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { CheckAvailabilityModal } from "@/components/bokun/CheckAvailabilityModal";
import { siteConfig } from "@/data/siteConfig";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [availOpen, setAvailOpen] = useState(false);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const text = el.innerText;
    const words = text.split(" ");
    el.innerHTML = words
      .map((w) => `<span class="inline-block overflow-hidden"><span class="hero-word inline-block">${w}</span></span>`)
      .join(" ");

    gsap.fromTo(
      ".hero-word",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.12, duration: 1.0, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => {});
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Pulled: safari video hero */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-safari-poster.jpg"
        aria-label="Safari wildlife across the Victoria Falls region"
      >
        <source src="/videos/hero-safari.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />

      <div className="relative z-10 container-luxury text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-white text-2xl sm:text-3xl md:text-4xl tracking-[0.04em] mb-5"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {siteConfig.name}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-[var(--accent)] text-xs tracking-[0.28em] uppercase mb-8"
        >
          Zimbabwe · Zambia · Botswana
        </motion.p>

        <h1
          ref={headlineRef}
          className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          See Africa with those who live it.
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-white/80 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
        >
          Private safaris led by local guides — across Zimbabwe, Zambia &amp; Botswana.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/plan-your-journey"
            className="bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-4 rounded text-sm font-semibold tracking-wide hover:bg-[var(--accent-hover)] transition-colors duration-300 min-w-[200px] text-center"
          >
            Start planning
          </Link>
          <button
            type="button"
            onClick={() => setAvailOpen(true)}
            className="text-white border border-white/40 px-8 py-4 rounded text-sm tracking-wide hover:border-white hover:bg-white/5 transition-all duration-300 min-w-[200px] text-center cursor-pointer"
          >
            Check availability
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="animate-bounce-slow text-[var(--accent)]">
          <i className="pi pi-arrow-down" style={{ fontSize: "20px" }} />
        </div>
      </motion.div>

      <CheckAvailabilityModal open={availOpen} onClose={() => setAvailOpen(false)} />
    </section>
  );
}
