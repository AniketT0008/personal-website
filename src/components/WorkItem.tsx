"use client";

import { motion } from "framer-motion";
import type { WorkEntry } from "@/data/work";
import { cn } from "@/lib/utils";

type WorkItemProps = {
  entry: WorkEntry;
  className?: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function WorkItem({ entry, className }: WorkItemProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex gap-3 py-4 border-b border-white/5 last:border-0", className)}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-muted text-xs font-mono font-semibold text-accent ring-1 ring-white/10 overflow-hidden"
        aria-hidden={!entry.logoSrc}
      >
        {entry.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.logoSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden>{initials(entry.company)}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold text-fg leading-snug">
          {entry.role}
        </h3>
        <p className="mt-0.5 text-sm text-fg-muted">
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {entry.company}
            </a>
          ) : (
            entry.company
          )}
          <span className="text-fg-subtle"> · {entry.employmentType}</span>
        </p>
        <p className="mt-1 font-mono text-[11px] text-fg-subtle tracking-wide">
          {entry.dateRange}
          <span className="mx-1.5 text-white/20">·</span>
          {entry.location}
        </p>
        <p className="mt-2 text-sm text-fg-muted leading-relaxed">
          {entry.description}
        </p>
      </div>
    </motion.article>
  );
}
