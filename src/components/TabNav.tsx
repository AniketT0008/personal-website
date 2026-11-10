"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TabId = "work" | "projects" | "skills" | "about";

const TABS: { id: TabId; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
];

type TabNavProps = {
  active: TabId;
  onChange: (tab: TabId) => void;
  counts?: Partial<Record<TabId, number>>;
  className?: string;
};

export function TabNav({ active, onChange, counts, className }: TabNavProps) {
  return (
    <nav className={cn(className)} aria-label="Primary">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-1 rounded-xl bg-bg-elevated/60 p-1 ring-1 ring-white/5"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          const count = counts?.[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => {
                const idx = TABS.findIndex((t) => t.id === active);
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  onChange(TABS[(idx + 1) % TABS.length].id);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  onChange(TABS[(idx - 1 + TABS.length) % TABS.length].id);
                } else if (e.key === "Home") {
                  e.preventDefault();
                  onChange(TABS[0].id);
                } else if (e.key === "End") {
                  e.preventDefault();
                  onChange(TABS[TABS.length - 1].id);
                }
              }}
              className={cn(
                "relative min-w-0 flex-1 rounded-lg px-2 py-2 text-[13px] font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive ? "text-accent" : "text-fg-subtle hover:text-fg"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-accent/15 ring-1 ring-accent/20"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden
                />
              )}
              <span className="relative flex items-center justify-center gap-1.5">
                {tab.label}
                {typeof count === "number" && (
                  <span
                    className={cn(
                      "hidden font-mono text-[10px] transition-colors min-[420px]:inline",
                      isActive ? "text-accent/70" : "text-fg-subtle"
                    )}
                  >
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
