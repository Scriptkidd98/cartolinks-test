"use client"

import React, { useEffect, useState, createContext } from "react";

export const DarkModeContext = createContext<{darkMode: boolean, toggleDarkMode: () => void}>({darkMode: false, toggleDarkMode: () => {}});

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<null | boolean>(null);

  useEffect(() => {
    const local = window.localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = local === "dark" || (!local && system);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add("dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        window.localStorage.setItem("theme", "light");
      }
      return newVal;
    });
  };

  if (darkMode === null) {
    return null;
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}