"use client";

import { create } from "zustand";

const STORAGE_KEY = "tafutanga:theme";

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    set({ theme });
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
  initTheme: () => {
    let theme = "light";
    try {
      theme = localStorage.getItem(STORAGE_KEY) || getSystemTheme();
    } catch {
      theme = getSystemTheme();
    }
    applyTheme(theme);
    set({ theme });
  },
}));

