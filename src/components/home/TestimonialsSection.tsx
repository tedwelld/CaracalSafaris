"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused]);

  const t = testimonials[active];

  return (
    <section
      className="bg-[var(--bg-alt)] section-padding transition-colors duration-400"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-luxury">
        <div className="text-center mb-12">
          <SectionLabel>Traveller Stories</SectionLabel>
          <h2
            className="text-[var(--fg)] text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From those who have journeyed
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Stars */}
          <div className="flex justify-center gap-1.5 mb-8">
            {Array.from({ length: t.rating }).map((_, i) => (
              <i key={i} className="pi pi-star-fill" style={{ color: "#c4b49a", fontSize: "18px" }} />
            ))}
          </div>

          {/* Quote */}
          <div className="min-h-40 flex items-center justify-center mb-10">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-[var(--fg)] text-xl md:text-2xl text-center leading-relaxed"
                style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
              >
                &ldquo;{t.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "author"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-[var(--fg)] font-medium">{t.author}</p>
              <p className="text-[#c4b49a] text-sm mt-1">
                {t.country} · {t.journey}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active ? "bg-[var(--accent)] w-6" : "bg-[var(--fg-20)]"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
