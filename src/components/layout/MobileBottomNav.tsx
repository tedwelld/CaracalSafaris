"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Home", href: "/", icon: "pi-home" },
  { label: "Trips", href: "/destinations", icon: "pi-map-marker" },
  { label: "Plan", href: "/plan-your-journey", icon: "pi-compass", primary: true },
  { label: "Experiences", href: "/experiences", icon: "pi-camera" },
  { label: "Contact", href: "/contact", icon: "pi-envelope" },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-[var(--fg-10)] bg-[var(--bg)]/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobile primary navigation"
    >
      {/* Tribal-inspired accent strip from logo */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, var(--accent) 0 8px, var(--accent-fg) 8px 16px, var(--savanna) 16px 24px, var(--accent-fg) 24px 32px)",
        }}
      />

      <ul className="grid grid-cols-5 h-[4.25rem]">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const primary = "primary" in tab && tab.primary;

          return (
            <li key={tab.href} className="flex">
              <Link
                href={tab.href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                  active || primary
                    ? "text-[var(--accent)]"
                    : "text-[var(--fg-40)] hover:text-[var(--fg-70)]"
                }`}
              >
                <span
                  className={
                    primary
                      ? "flex w-11 h-11 -mt-5 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-fg)] shadow-lg shadow-black/25"
                      : "flex items-center justify-center"
                  }
                >
                  <i className={`pi ${tab.icon}`} style={{ fontSize: "18px" }} aria-hidden />
                </span>
                <span
                  className={`text-[9px] tracking-wide uppercase leading-none ${
                    primary ? "mt-0.5 font-semibold" : ""
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
