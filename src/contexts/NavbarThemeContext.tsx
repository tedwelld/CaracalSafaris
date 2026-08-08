"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type SiteTheme = "dark" | "light";
export type NavbarTheme = SiteTheme;

interface SiteThemeContextValue {
  theme: SiteTheme;
  toggleTheme: () => void;
  setTheme: (t: SiteTheme) => void;
}

const defaultValue: SiteThemeContextValue = {
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
};

export const SiteThemeContext = createContext<SiteThemeContextValue>(defaultValue);
export const NavbarThemeContext = SiteThemeContext;

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("caracal-theme") as SiteTheme | null;
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
    localStorage.setItem("caracal-theme", theme);
  }, [theme]);

  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));
  const setTheme = (t: SiteTheme) => setThemeState(t);

  return (
    <SiteThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
  const { theme, setTheme } = useContext(SiteThemeContext);
  return { theme, setTheme };
}
