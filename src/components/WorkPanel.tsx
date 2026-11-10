"use client";

import { AnimatePresence } from "framer-motion";
import { work } from "@/data/work";
import { WorkItem } from "@/components/WorkItem";

export function WorkPanel() {
  return (
    <div>
      <p className="text-sm text-fg-muted leading-relaxed">
        Where I&rsquo;ve been so far. Just getting started — most of my hands-on
        work lives in the Projects tab.
      </p>

      <AnimatePresence mode="popLayout">
        {work.map((entry) => (
          <WorkItem key={entry.id} entry={entry} />
        ))}
      </AnimatePresence>
    </div>
  );
}
