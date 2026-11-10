import Link from "next/link";
import { siteConfig } from "@/data/site";

const links = [
  { href: "/#hardware", label: "Hardware" },
  { href: "/#hackathons", label: "Hackathons" },
  { href: "/experience", label: "Teams" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="simple-header">
      <nav className="simple-nav" aria-label="Primary">
        <Link href="/" className="simple-brand">
          {siteConfig.name}
          <span>McMaster Engineering I</span>
        </Link>
        <div className="simple-nav-links">
          {links.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </nav>
    </header>
  );
}
