"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getTagById, categoryColors } from "@/data/projects";
import { TagPill } from "@/components/TagPill";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  className?: string;
};

export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  return (
    <motion.button
      layout
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={() => onOpen(project)}
      className={cn(
        "card-hover group w-full text-left rounded-xl overflow-hidden bg-bg-elevated/60 ring-1 ring-white/5",
        "hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      aria-label={`Open project: ${project.title}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-muted">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            unoptimized={project.thumbnail.endsWith(".gif")}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="project-image-placeholder" aria-label={project.category}>
            <span>{project.category}</span>
            <strong>{project.title}</strong>
          </div>
        )}
      </div>
      <div className="p-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-fg group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] text-fg-subtle">
            {project.year}
          </span>
        </div>
        <p className="mt-1 text-sm text-fg-muted line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {project.tags.map((tagId) => {
            const tag = getTagById(tagId);
            if (!tag) return null;
            const colors = categoryColors[tag.category];
            return (
              <TagPill
                key={tagId}
                label={tag.label}
                textClass={colors.text}
                bgClass={colors.bg}
              />
            );
          })}
        </div>
        <span
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-fg-subtle group-hover:text-accent transition-colors"
          aria-hidden
        >
          Read the story
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}
