"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function SafariWelcome() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Caracal Africa Safaris"
        >
          <div className="absolute inset-0 bg-[#0c0806]" />

          {/* Animated savanna glow */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.75, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 70%, rgba(240,101,34,0.35), transparent 60%), radial-gradient(ellipse 60% 40% at 30% 40%, rgba(255,176,32,0.2), transparent 50%)",
            }}
          />

          {/* Rising sun disc */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #ffb020 0%, #f06522 45%, transparent 70%)",
              filter: "blur(2px)",
            }}
            initial={{ bottom: "8%", opacity: 0.3, scale: 0.7 }}
            animate={{ bottom: "28%", opacity: 0.9, scale: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Horizon line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f06522]/60 to-transparent"
            style={{ bottom: "32%" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          />

          {/* Acacia silhouette suggestion */}
          <motion.svg
            viewBox="0 0 120 80"
            className="absolute left-[18%] w-24 h-16 text-black/50"
            style={{ bottom: "32%" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            aria-hidden
          >
            <ellipse cx="60" cy="28" rx="48" ry="18" fill="currentColor" />
            <rect x="56" y="28" width="8" height="42" fill="currentColor" />
          </motion.svg>

          <div className="relative z-10 px-6 text-center max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="mb-8 flex justify-center"
            >
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={220}
                height={80}
                className="h-16 w-auto object-contain drop-shadow-lg"
                priority
              />
            </motion.div>

            <motion.p
              className="text-[#f06522] text-xs tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Welcome
            </motion.p>

            <motion.h2
              className="text-[#fbf4e8] text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              Your safari begins here
            </motion.h2>

            <motion.p
              className="text-[#fbf4e8]/70 text-base sm:text-lg"
              style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {siteConfig.tagline}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
