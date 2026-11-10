"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  projectCategories,
  projects,
  projectsByCategory,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";
import { cn } from "@/lib/utils";

export default function WorkPage() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [active, setActive] = useState<Project | null>(null);
  const grouped = projectsByCategory();

  const sections = useMemo(() => {
    if (filter === "All") {
      return projectCategories
        .map((cat) => ({ category: cat, items: grouped[cat] }))
        .filter((s) => s.items.length > 0);
    }
    return [{ category: filter, items: grouped[filter] }];
  }, [filter, grouped]);

  return (
    <div className="flex flex-col gap-10 px-5 pb-20 pt-10 sm:px-8 md:px-12">
      <h1 className="display-title">
        builds<span className="signal">.</span>
      </h1>

      <div className="work-hero relative">
        <Image
          src="/images/projects/gesture-robot.gif"
          alt="Gesture-controlled robot in motion"
          fill
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-14">
        <nav
          className="flex flex-wrap items-end gap-y-2 border-b border-[color:var(--border)] pb-1"
          aria-label="Project categories"
        >
          <button
            type="button"
            onClick={() => setFilter("All")}
            className={cn("category-pill", filter === "All" && "active")}
          >
            All
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn("category-pill", filter === cat && "active")}
            >
              {cat}
            </button>
          ))}
        </nav>

        {sections.map(({ category, items }) => (
          <section key={category} className="flex flex-col gap-5">
            <div className="section-rule px-1">
              <h2>{category}</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {items.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActive(project)}
                  className="project-card"
                  aria-label={`Open project: ${project.title}`}
                >
                  <span className="project-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.summary}</p>
                </button>
              ))}
            </div>
          </section>
        ))}

        <p className="font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">
          {projects.length} builds indexed — open any for the full write-up.
        </p>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
