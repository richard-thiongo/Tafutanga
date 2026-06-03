"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "./themeStore";

export function ThemeToggle({ className = "" }) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const initTheme = useThemeStore((s) => s.initTheme);


  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >

      {isDark ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

