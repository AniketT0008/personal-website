"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useBootDone } from "@/components/boot/BootContext";
import { cn } from "@/lib/utils";

const primary = [
  { href: "/work", label: "work", idx: "01" },
  { href: "/experience", label: "teams", idx: "02" },
  { href: "/about", label: "about", idx: "03" },
  { href: "/skills", label: "toolkit", idx: "04" },
  { href: "/contact", label: "contact", idx: "05" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const ready = useBootDone();

  return (
    <nav
      className={cn("site-nav", ready ? "nav-ready" : "nav-hidden")}
      aria-label="Primary"
      aria-hidden={!ready}
    >
      <div className="flex flex-1 items-center">
        <Link
          href="/"
          className={cn("nav-brand", pathname === "/" && "active")}
          tabIndex={ready ? 0 : -1}
        >
          <span className="nav-brand-mark" aria-hidden>
            <span>AT</span>
          </span>
          {siteConfig.shortName}
        </Link>
      </div>

      <div className="flex flex-[2] items-center justify-between gap-4">
        <div className="hidden items-center gap-6 sm:flex">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(pathname === item.href && "active")}
              tabIndex={ready ? 0 : -1}
            >
              <span className="nav-idx">{item.idx}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={ready ? 0 : -1}
            >
              li
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={ready ? 0 : -1}
            >
              gh
            </a>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle lg:block">
              {siteConfig.location}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-full flex gap-4 overflow-x-auto border-b border-[color:var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_90%,transparent)] px-4 py-2 sm:hidden">
        {primary.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap text-sm",
              pathname === item.href && "active"
            )}
            tabIndex={ready ? 0 : -1}
          >
            <span className="nav-idx">{item.idx}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
