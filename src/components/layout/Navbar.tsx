"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useSiteTheme } from "@/contexts/NavbarThemeContext";
import { siteConfig } from "@/data/siteConfig";
import CartButton from "@/components/cart/CartButton";

type NavChild = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/** Four top-level items — Journey under Home, Contact under About */
const leftNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [{ label: "The Journey", href: "/journey" }],
  },
  { label: "Destinations", href: "/destinations" },
];

const rightNav: NavItem[] = [
  { label: "Experiences", href: "/experiences" },
  {
    label: "About",
    href: "/about",
    children: [{ label: "Contact", href: "/contact" }],
  },
];

const allNav = [...leftNav, ...rightNav];

function useIsActive() {
  const pathname = usePathname();
  return (item: NavItem | NavChild, parent?: NavItem) => {
    if ("children" in item && item.children?.length) {
      if (item.href === "/") {
        return (
          pathname === "/" ||
          item.children.some(
            (c) => pathname === c.href || pathname.startsWith(c.href + "/")
          )
        );
      }
      return (
        pathname === item.href ||
        pathname.startsWith(item.href + "/") ||
        item.children.some(
          (c) => pathname === c.href || pathname.startsWith(c.href + "/")
        )
      );
    }
    if (item.href === "/") return pathname === "/" && !parent;
    return pathname === item.href || pathname.startsWith(item.href + "/");
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
  dropdownBg: string;
  dropdownBorder: string;
  dropdownItem: string;
  dropdownItemHover: string;
  dropdownItemActive: string;
}

const tokens: Record<string, TokenSet> = {
  dark: {
    scrolledBg: "bg-[var(--bg)]/95 backdrop-blur-sm shadow-lg",
    textDefault: "text-[var(--fg-60)]",
    textHover: "hover:text-[var(--fg)]",
    textActive: "text-[var(--accent)]",
    underline: "bg-[var(--accent)]",
    hamburgerBar: "bg-[var(--fg)]",
    mobileBg: "bg-[var(--bg)]",
    mobileText: "text-[var(--fg)]",
    mobileActive: "text-[var(--accent)]",
    mobileHover: "hover:text-[var(--accent)]",
    mobileCta: "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]",
    mobileWa: "text-[var(--fg-50)] hover:text-[var(--accent)]",
    dropdownBg: "bg-[#140e0a]",
    dropdownBorder: "border-[#3d2b1f]",
    dropdownItem: "text-[#fbf4e8]/80",
    dropdownItemHover: "hover:bg-[#2c1b12] hover:text-[#f06522]",
    dropdownItemActive: "bg-[#2c1b12] text-[#f06522]",
  },
  light: {
    scrolledBg: "bg-[var(--bg)]/95 backdrop-blur-sm shadow-sm",
    textDefault: "text-[var(--fg-50)]",
    textHover: "hover:text-[var(--fg)]",
    textActive: "text-[var(--accent)]",
    underline: "bg-[var(--accent)]",
    hamburgerBar: "bg-[var(--fg)]",
    mobileBg: "bg-[var(--bg)]",
    mobileText: "text-[var(--fg)]",
    mobileActive: "text-[var(--accent)] font-semibold",
    mobileHover: "hover:text-[var(--accent)]",
    mobileCta: "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]",
    mobileWa: "text-[var(--fg-40)] hover:text-[var(--fg)]",
    dropdownBg: "bg-[#140e0a]",
    dropdownBorder: "border-[#3d2b1f]",
    dropdownItem: "text-[#fbf4e8]/80",
    dropdownItemHover: "hover:bg-[#2c1b12] hover:text-[#f06522]",
    dropdownItemActive: "bg-[#2c1b12] text-[#f06522]",
  },
};

function NavLink({
  href,
  label,
  active,
  t,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  t: TokenSet;
  onClick?: () => void;
}) {
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

function NavDropdown({
  item,
  active,
  childActive,
  t,
}: {
  item: NavItem;
  active: boolean;
  childActive: (href: string) => boolean;
  t: TokenSet;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-[110]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`relative inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase transition-colors duration-300 pb-0.5 ${
          active ? t.textActive : `${t.textDefault} ${t.textHover}`
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Link href={item.href} className="relative">
          {item.label}
          <span
            className={`absolute bottom-0 left-0 h-px ${t.underline} transition-all duration-300 ${
              active ? "w-full" : "w-0"
            }`}
          />
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`${item.label} submenu`}
          className="p-0.5 -mr-1"
          onClick={() => setOpen((o) => !o)}
        >
          <i
            className={`pi pi-chevron-down transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            style={{ fontSize: "9px" }}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-full left-0 z-[120] pt-2 min-w-[12rem]`}
          >
            <div
              className={`py-2 rounded-sm border shadow-[0_16px_40px_rgba(0,0,0,0.55)] ring-1 ring-black/40 ${t.dropdownBg} ${t.dropdownBorder}`}
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-xs tracking-[0.14em] uppercase transition-colors ${
                    childActive(child.href)
                      ? t.dropdownItemActive
                      : `${t.dropdownItem} ${t.dropdownItemHover}`
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const isScrolled = useNavbarScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const isActive = useIsActive();
  const { theme } = useSiteTheme();
  const t = tokens[theme];
  const pathname = usePathname();

  const childIsActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`brand-surface fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled || menuOpen ? t.scrolledBg : "bg-transparent"
        }`}
      >
        <div className="brand-surface__clip" aria-hidden>
          <div className="brand-surface__glow" />
        </div>
        <nav className="container-luxury flex items-center h-20 relative z-10">
          <div className="hidden lg:flex flex-1 items-center justify-end gap-10 pr-10">
            {leftNav.map((item) =>
              item.children?.length ? (
                <NavDropdown
                  key={item.href}
                  item={item}
                  active={isActive(item)}
                  childActive={childIsActive}
                  t={t}
                />
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive(item)}
                  t={t}
                />
              )
            )}
          </div>

          <Link
            href="/"
            className="flex items-center justify-center flex-shrink-0 group"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/images/caracal-logo.png"
              alt="Caracal Africa Safaris"
              width={240}
              height={88}
              className="h-14 w-auto max-w-[200px] sm:h-16 sm:max-w-[240px] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-start gap-10 pl-10">
            {rightNav.map((item) =>
              item.children?.length ? (
                <NavDropdown
                  key={item.href}
                  item={item}
                  active={isActive(item)}
                  childActive={childIsActive}
                  t={t}
                />
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive(item)}
                  t={t}
                />
              )
            )}

            <div className="ml-auto flex items-center gap-2 pl-6 border-l border-[var(--fg-10)]">
              <CartButton />
            </div>
          </div>

          <div className="flex lg:hidden flex-1 items-center justify-end gap-1">
            <CartButton />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-0.5 ${t.hamburgerBar} transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 ${t.hamburgerBar} transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 ${t.hamburgerBar} transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[90] ${t.mobileBg} flex flex-col justify-center items-center gap-6 lg:hidden transition-colors duration-400 pb-24 overflow-y-auto`}
          >
            {allNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-3"
              >
                {item.children?.length ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`text-3xl transition-colors ${
                          isActive(item) ? t.mobileActive : `${t.mobileText} ${t.mobileHover}`
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Show ${item.label} submenu`}
                        onClick={() =>
                          setMobileExpanded((id) =>
                            id === item.href ? null : item.href
                          )
                        }
                        className={`w-8 h-8 flex items-center justify-center ${t.mobileText}`}
                      >
                        <i
                          className={`pi pi-chevron-down text-sm transition-transform ${
                            mobileExpanded === item.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileExpanded === item.href && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col items-center gap-2 overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMenuOpen(false)}
                              className={`text-lg tracking-wide ${
                                childIsActive(child.href)
                                  ? t.mobileActive
                                  : `${t.mobileText} ${t.mobileHover}`
                              }`}
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-3xl transition-colors ${
                      isActive(item) ? t.mobileActive : `${t.mobileText} ${t.mobileHover}`
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-col items-center gap-4"
            >
              <Link
                href="/plan-your-journey"
                onClick={() => setMenuOpen(false)}
                className={`px-8 py-3 rounded text-sm font-semibold transition-colors ${t.mobileCta}`}
              >
                Start planning
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
