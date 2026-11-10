"use client";

import { Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
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

export function SiteHeader({ className }: SiteHeaderProps) {
  const { name, tagline, email, social, availability } = siteConfig;

  const iconBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted ring-1 ring-white/5 hover:bg-accent/10 hover:text-accent hover:ring-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors";

  return (
    <header className={cn("space-y-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 font-mono text-sm font-semibold text-accent ring-1 ring-accent/30"
            aria-hidden
          >
            {initials(name)}
          </div>
          <div>
            <p className="text-sm text-fg-subtle">Hey, I&rsquo;m</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg leading-none">
              {name}
            </h1>
          </div>
        </div>
        <ThemeToggle className="shrink-0" />
      </div>

      <p className="text-sm text-fg-muted leading-relaxed max-w-[26rem]">
        {tagline}
      </p>

      {availability && (
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 ring-1 ring-emerald-400/20">
          <span
            className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-400"
            aria-hidden
          />
          {availability}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-bg hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Get in touch
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="GitHub"
          title="GitHub"
        >
          <GitHubIcon className="h-4 w-4" />
        </a>
        {social.twitter && (
          <a
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label="X / Twitter"
            title="X / Twitter"
          >
            <XIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    </header>
  );
}
