"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type SiteTheme = "dark" | "light";
export type NavbarTheme = SiteTheme;

/** Light 06:00–17:59, dark 18:00–05:59 (local time) */
export function themeFromLocalTime(date = new Date()): SiteTheme {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

function applyThemeClass(theme: SiteTheme) {
  document.documentElement.classList.toggle("theme-light", theme === "light");
}

interface SiteThemeContextValue {
  theme: SiteTheme;
}

const defaultValue: SiteThemeContextValue = {
  theme: "dark",
};

export const SiteThemeContext = createContext<SiteThemeContextValue>(defaultValue);
export const NavbarThemeContext = SiteThemeContext;

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window === "undefined") return "dark";
    return themeFromLocalTime();
  });

  const syncTheme = useCallback(() => {
    const next = themeFromLocalTime();
    setTheme(next);
    applyThemeClass(next);
  }, []);

  useEffect(() => {
    syncTheme();

    const interval = window.setInterval(syncTheme, 60_000);

    const now = new Date();
    const nextBoundary = new Date(now);
    if (now.getHours() < 6) {
      nextBoundary.setHours(6, 0, 0, 0);
    } else if (now.getHours() < 18) {
      nextBoundary.setHours(18, 0, 0, 0);
    } else {
      nextBoundary.setDate(nextBoundary.getDate() + 1);
      nextBoundary.setHours(6, 0, 0, 0);
    }
    const msUntilBoundary = Math.max(nextBoundary.getTime() - now.getTime(), 0);
    const boundaryTimer = window.setTimeout(syncTheme, msUntilBoundary + 250);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(boundaryTimer);
    };
  }, [syncTheme]);

  return (
    <SiteThemeContext.Provider value={{ theme }}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function NavbarThemeProvider({ children }: { children: React.ReactNode }) {
  return <SiteThemeProvider>{children}</SiteThemeProvider>;
}

export function useSiteTheme() {
  return useContext(SiteThemeContext);
}

export function useNavbarTheme() {
  const { theme } = useContext(SiteThemeContext);
  return { theme };
}
