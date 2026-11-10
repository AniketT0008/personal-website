import { about } from "@/data/about";
import { siteConfig } from "@/data/site";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 px-5 pb-20 pt-10 sm:px-8 md:px-12">
      <h1 className="display-title">
        profile<span className="signal">.</span>
      </h1>

      <div className="mx-auto grid w-full max-w-4xl gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {about.bio.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[1.05rem] leading-relaxed text-fg-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="space-y-8 border-t border-[color:var(--border)] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <ListBlock title="A few facts" items={[...about.funFacts]} />
          <ListBlock
            title="Currently learning"
            items={[...about.currentlyLearning]}
          />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
              Reach
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-fg underline underline-offset-4 hover:opacity-60"
            >
              {siteConfig.email}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-sm leading-snug text-fg-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
