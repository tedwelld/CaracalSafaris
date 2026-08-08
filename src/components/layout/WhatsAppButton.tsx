"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-black/30 md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <i className="pi pi-whatsapp text-white" style={{ fontSize: "26px" }} />
    </motion.a>
  );
}
