import { work } from "@/data/work";

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-10 px-5 pb-20 pt-10 sm:px-8 md:px-12">
      <h1 className="display-title">
        field<span className="signal">.</span>log
      </h1>

      <div className="mx-auto w-full max-w-5xl border-b border-[color:var(--border)]">
        {work.map((entry, index) => (
          <article key={entry.id} className="exp-row">
            <div>
              <p className="project-card-index">
                N°{String(index + 1).padStart(3, "0")}
              </p>
              <p className="mt-2 text-sm text-fg-subtle">{entry.dateRange}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                {entry.role}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                {entry.company}
              </h2>
              <p className="mt-1 text-sm text-fg-subtle">
                {entry.location} | {entry.employmentType}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {entry.description}
              </p>
            </div>
            <div />
          </article>
        ))}
      </div>
    </div>
  );
}
