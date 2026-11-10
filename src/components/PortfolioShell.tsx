"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { TabNav, type TabId } from "@/components/TabNav";
import { WorkPanel } from "@/components/WorkPanel";
import { ProjectsPanel } from "@/components/ProjectsPanel";
import { SkillsPanel } from "@/components/SkillsPanel";
import { AboutPanel } from "@/components/AboutPanel";
import { HeroVisual } from "@/components/HeroVisual";
import { work } from "@/data/work";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export function PortfolioShell() {
  const [tab, setTab] = useState<TabId>("work");

  const counts = {
    work: work.length,
    projects: projects.length,
    skills: skills.length,
  };

  return (
    <div className="min-h-dvh md:h-dvh md:overflow-hidden bg-bg text-fg">
      <div className="flex min-h-dvh flex-col md:h-full md:flex-row">
        {/* Left panel — nav + content */}
        <aside className="relative z-10 flex w-full flex-col border-b border-white/5 md:h-full md:w-[40%] md:min-w-[320px] md:max-w-xl md:border-b-0 md:border-r md:border-white/5 panel-wash">
          <div className="flex h-full flex-col px-5 pt-6 pb-4 sm:px-7 md:px-8 md:pt-8 md:pb-6">
            <SiteHeader />
            <TabNav
              active={tab}
              onChange={setTab}
              counts={counts}
              className="mt-6"
            />

            <div className="relative mt-5 flex-1 overflow-y-auto overscroll-contain pr-1 [-ms-overflow-style:none] [scrollbar-width:thin]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  role="tabpanel"
                  id={`panel-${tab}`}
                  aria-labelledby={`tab-${tab}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pb-8"
                >
                  {tab === "work" && <WorkPanel />}
                  {tab === "projects" && <ProjectsPanel />}
                  {tab === "skills" && <SkillsPanel />}
                  {tab === "about" && <AboutPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </aside>

        {/* Right panel — hero visual (hidden on small screens) */}
        <section
          className="relative hidden md:block md:flex-1 md:h-full"
          aria-label="Visual showcase"
        >
          <HeroVisual />
        </section>

        {/* Mobile compact visual strip */}
        <section
          className="relative h-44 w-full md:hidden border-t border-white/5"
          aria-label="Visual showcase"
        >
          <HeroVisual />
        </section>
      </div>
    </div>
  );
}
