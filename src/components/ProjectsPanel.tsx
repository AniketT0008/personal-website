"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  projects,
  tagsByCategory,
  categoryColors,
  type Project,
  type TagCategory,
} from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { TagPill } from "@/components/TagPill";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER: TagCategory[] = [
  "Embedded",
  "Vision & AI",
  "Robotics",
  "Web",
  "Algorithms",
  "Learning",
];

export function ProjectsPanel() {
  const [openFilters, setOpenFilters] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [active, setActive] = useState<Project | null>(null);
  const grouped = tagsByCategory();

  const toggleTag = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const filtered =
    selected.length === 0
      ? projects
      : projects.filter((p) => selected.every((t) => p.tags.includes(t)));

  return (
    <div className="space-y-4">
      <p className="text-sm text-fg-muted leading-relaxed">
        A mix of robots, computer vision, and web tools. Tap any card to read
        the full story — what the problem was, how I solved it, and what broke
        along the way.
      </p>

      <div className="rounded-xl ring-1 ring-white/5 bg-bg-elevated/40 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenFilters((v) => !v)}
          aria-expanded={openFilters}
          className="flex w-full items-center justify-between px-3.5 py-3 text-left hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent transition-colors"
        >
          <span className="text-sm font-medium text-fg">
            Filter by tech
            {selected.length > 0 ? (
              <span className="ml-2 text-accent">
                {selected.length} selected
              </span>
            ) : (
              <span className="ml-2 text-fg-subtle font-normal">
                {filtered.length} projects
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-fg-subtle transition-transform duration-200",
              openFilters && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {openFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3 border-t border-white/5 px-3.5 pb-3.5 pt-3">
                {CATEGORY_ORDER.map((cat) => {
                  const tags = grouped[cat];
                  if (!tags.length) return null;
                  const colors = categoryColors[cat];
                  return (
                    <div key={cat}>
                      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                        {cat}
                      </p>
                      <div className="flex flex-wrap gap-1.5" role="group" aria-label={`${cat} tags`}>
                        {tags.map((tag) => (
                          <TagPill
                            key={tag.id}
                            label={tag.label}
                            textClass={colors.text}
                            bgClass={colors.bg}
                            ringClass={colors.ring}
                            selected={selected.includes(tag.id)}
                            onClick={() => toggleTag(tag.id)}
                            size="md"
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
                {selected.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="rounded-md px-2 py-1 -ml-2 text-xs text-fg-subtle hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-dashed border-white/10 py-10 text-center"
          >
            <p className="text-sm text-fg-muted">
              Nothing matches that combination yet.
            </p>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="mt-3 rounded-lg bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            >
              Show all projects
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setActive}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
