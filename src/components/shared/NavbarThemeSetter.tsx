"use client";

import { useEffect } from "react";
import { useNavbarTheme, type NavbarTheme } from "@/contexts/NavbarThemeContext";

export default function NavbarThemeSetter({ theme }: { theme: NavbarTheme }) {
  const { setTheme } = useNavbarTheme();
  useEffect(() => {
    setTheme(theme);
    return () => setTheme("dark");
  }, [theme, setTheme]);
  return null;
}
