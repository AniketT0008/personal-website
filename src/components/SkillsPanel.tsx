"use client";

import { motion } from "framer-motion";
import {
  skillsByCategory,
  skillCategories,
  skillCategoryColors,
} from "@/data/skills";
import { TagPill } from "@/components/TagPill";

export function SkillsPanel() {
  const grouped = skillsByCategory();

  return (
    <div className="space-y-6">
      <p className="text-sm text-fg-muted leading-relaxed">
        Things I&rsquo;ve actually shipped something with — not just read about.
      </p>

      {skillCategories.map((cat, i) => {
        const items = grouped[cat];
        const colors = skillCategoryColors[cat];
        return (
          <motion.section
            key={cat}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04, ease: "easeOut" }}
          >
            <h3 className="mb-2.5 text-sm font-semibold text-fg">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <TagPill
                  key={skill.id}
                  label={skill.label}
                  textClass={colors.text}
                  bgClass={colors.bg}
                  size="md"
                />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
