import { siteConfig } from "@/data/site";

const links = [
  {
    id: "01",
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
  },
  {
    id: "02",
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    value: "Aniket Thakur",
  },
  {
    id: "03",
    label: "GitHub",
    href: siteConfig.social.github,
    value: "@AniketT0008",
  },
  {
    id: "04",
    label: "Portfolio",
    href: siteConfig.url,
    value: "aniketthakur.vercel.app",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-10 px-5 pb-20 pt-10 sm:px-8 md:px-12">
      <h1 className="display-title">
        uplink<span className="signal">.</span>
      </h1>

      <p className="max-w-xl text-lg leading-relaxed text-fg-muted">
        Open to co-ops, design teams, and side projects. If you have an idea in
        mind, send a note by email or reach out directly.
      </p>

      <div className="mx-auto w-full max-w-3xl border-t border-[color:var(--border)]">
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.id}
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="contact-row group"
            >
              <span className="project-card-index">{link.id}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                  {link.label}
                </p>
                <p className="mt-1 text-lg font-medium group-hover:opacity-60 transition-opacity">
                  {link.value}
                </p>
              </div>
              <span className="text-fg-subtle transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          );
        })}
      </div>

      <p className="text-sm uppercase tracking-[0.14em] text-fg-subtle">
        {siteConfig.location}
      </p>
    </div>
  );
}
