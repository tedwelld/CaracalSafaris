"use client";

/**
 * Previously forced light/dark per section. Theme is now time-based
 * (light 06:00–18:00, dark otherwise), so this is a no-op kept for compatibility.
 */
export default function NavbarThemeSetter(_props: { theme: "dark" | "light" }) {
  return null;
}
