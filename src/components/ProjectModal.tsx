"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { getTagById, categoryColors } from "@/data/projects";
import { TagPill } from "@/components/TagPill";
import { GitHubIcon } from "@/components/icons";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close project details"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-bg-elevated ring-1 ring-white/10 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/5 px-5 py-4">
              <div>
                <p className="font-mono text-[11px] text-fg-subtle">
                  {project.year}
                </p>
                <h2
                  id="project-modal-title"
                  className="text-lg font-semibold text-fg"
                >
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-fg-muted hover:bg-white/5 hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--fg)]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4 space-y-5">
              {project.videoUrl ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-bg-muted">
                  <video className="h-full w-full object-contain" controls preload="none" playsInline poster={project.videoPoster}>
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>
                </div>
              ) : project.thumbnail ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-bg-muted">
                  <Image
                    src={project.thumbnail}
                    alt={project.thumbnailAlt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 42rem"
                    unoptimized={project.thumbnail.endsWith(".gif")}
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="project-image-placeholder project-image-placeholder-large">
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
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
                      size="md"
                    />
                  );
                })}
              </div>

              <Section title="Problem">{project.problem}</Section>
              <Section title="Approach">{project.approach}</Section>
              <Section title="What I learned">{project.learned}</Section>

              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                    Gallery
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.gallery.map((img) => (
                      <div
                        key={img.src}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-muted"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 20rem"
                          unoptimized={img.src.endsWith(".gif")}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pb-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[color:var(--border)] px-3 py-2 text-sm text-fg hover:border-[color:var(--border-strong)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--fg)] transition-colors"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-fg px-3 py-2 text-sm text-bg hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--fg)] transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h3 className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{children}</p>
    </section>
  );
}
