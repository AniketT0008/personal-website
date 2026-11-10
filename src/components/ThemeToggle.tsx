"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  if (!mounted) {
    return (
      <span
        className={cn("inline-flex h-8 w-8 items-center justify-center", className)}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center text-fg-muted",
        "hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--fg)] transition-colors",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.8} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.8} />
      )}
    </button>
  );
}
