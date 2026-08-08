"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useSiteTheme } from "@/contexts/NavbarThemeContext";
import { siteConfig } from "@/data/siteConfig";
import CartButton from "@/components/cart/CartButton";

const leftLinks = [
  { label: "Home", href: "/" },
  { label: "The Journey", href: "/journey" },
  { label: "Destinations", href: "/destinations" },
];

const rightLinks = [
  { label: "Experiences", href: "/experiences" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const allLinks = [...leftLinks, ...rightLinks];

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
}

interface TokenSet {
  scrolledBg: string;
  textDefault: string;
  textHover: string;
  textActive: string;
  underline: string;
  hamburgerBar: string;
  mobileBg: string;
  mobileText: string;
  mobileActive: string;
  mobileHover: string;
  mobileCta: string;
  mobileWa: string;
}

const tokens: Record<string, TokenSet> = {
  dark: {
    scrolledBg:   "bg-[var(--bg)]/95 backdrop-blur-sm shadow-lg",
    textDefault:  "text-[var(--fg-60)]",
    textHover:    "hover:text-[var(--fg)]",
    textActive:   "text-[var(--accent)]",
    underline:    "bg-[var(--accent)]",
    hamburgerBar: "bg-[var(--fg)]",
    mobileBg:     "bg-[var(--bg)]",
    mobileText:   "text-[var(--fg)]",
    mobileActive: "text-[var(--accent)]",
    mobileHover:  "hover:text-[var(--accent)]",
    mobileCta:    "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]",
    mobileWa:     "text-[var(--fg-50)] hover:text-[var(--accent)]",
  },
  light: {
    scrolledBg:   "bg-[var(--bg)]/95 backdrop-blur-sm shadow-sm",
    textDefault:  "text-[var(--fg-50)]",
    textHover:    "hover:text-[var(--fg)]",
    textActive:   "text-[var(--accent)]",
    underline:    "bg-[var(--accent)]",
    hamburgerBar: "bg-[var(--fg)]",
    mobileBg:     "bg-[var(--bg)]",
    mobileText:   "text-[var(--fg)]",
    mobileActive: "text-[var(--accent)] font-semibold",
    mobileHover:  "hover:text-[var(--accent)]",
    mobileCta:    "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]",
    mobileWa:     "text-[var(--fg-40)] hover:text-[var(--fg)]",
  },
};

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  t: TokenSet;
  onClick?: () => void;
}

function NavLink({ href, label, active, t, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-xs tracking-[0.18em] uppercase transition-colors duration-300 pb-0.5 group ${
        active ? t.textActive : `${t.textDefault} ${t.textHover}`
      }`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-px ${t.underline} transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const isScrolled = useNavbarScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = useIsActive();
  const { theme } = useSiteTheme();
  const t = tokens[theme];

  return (
    <>
      <header
        className={`brand-surface fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || menuOpen ? t.scrolledBg : "bg-transparent"
        }`}
      >
        <div className="brand-surface__glow" aria-hidden />
        <nav className="container-luxury flex items-center h-20">

          {/* Left links */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-10 pr-10">
            {leftLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
                t={t}
              />
            ))}
          </div>

          {/* Centered logo — full lockup includes brand name */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0 group">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={200}
              height={72}
              className="h-12 w-auto max-w-[160px] sm:max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Right links + cart */}
          <div className="hidden lg:flex flex-1 items-center justify-start gap-10 pl-10">
            {rightLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
                t={t}
              />
            ))}

            <div className="ml-auto flex items-center gap-2 pl-6 border-l border-[var(--fg-10)]">
              <CartButton />
            </div>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex lg:hidden flex-1 items-center justify-end gap-1">
            <CartButton />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-0.5 ${t.hamburgerBar} transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 ${t.hamburgerBar} transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 ${t.hamburgerBar} transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 ${t.mobileBg} flex flex-col justify-center items-center gap-8 lg:hidden transition-colors duration-400 pb-24`}
          >
            {allLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-3xl transition-colors ${
                    isActive(link.href)
                      ? t.mobileActive
                      : `${t.mobileText} ${t.mobileHover}`
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mt-4 flex flex-col items-center gap-4"
            >
              <Link
                href="/plan-your-journey"
                onClick={() => setMenuOpen(false)}
                className={`px-8 py-3 rounded text-sm font-semibold transition-colors ${t.mobileCta}`}
              >
                Plan Your Journey
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={`text-sm transition-colors ${t.mobileWa}`}
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
