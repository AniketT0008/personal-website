"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { about } from "@/data/about";
import { siteConfig } from "@/data/site";

export function AboutPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="space-y-6"
    >
      {about.photoSrc && (
        <div className="relative h-36 w-36 overflow-hidden rounded-xl ring-1 ring-white/10">
          <Image
            src={about.photoSrc}
            alt={about.photoAlt}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>
      )}

      <div className="space-y-3">
        {about.bio.map((paragraph, i) => (
          <p key={i} className="text-sm text-fg-muted leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Single column on purpose — the left panel is capped at max-w-xl, so two
          columns squeeze list items down to one word per line. */}
      <div className="grid gap-3">
        <ListBlock title="A few fun facts" items={[...about.funFacts]} />
        <ListBlock
          title="Currently learning"
          items={[...about.currentlyLearning]}
        />
      </div>

      <div className="rounded-xl bg-accent/10 p-4 ring-1 ring-accent/20">
        <h3 className="text-sm font-semibold text-fg">Want to build something?</h3>
        <p className="mt-1 text-sm text-fg-muted leading-relaxed">
          I&rsquo;m always up for a good hardware problem, a design team, or just
          talking shop about robots. My inbox is open.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Say hello
        </a>
      </div>
    </motion.div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl bg-bg-elevated/50 p-4 ring-1 ring-white/5">
      <h3 className="mb-2.5 text-sm font-semibold text-fg">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-fg-muted leading-snug"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
