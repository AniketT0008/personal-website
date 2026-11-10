import { skillsByCategory, skillCategories } from "@/data/skills";

export default function SkillsPage() {
  const grouped = skillsByCategory();

  return (
    <div className="flex flex-col gap-10 px-5 pb-20 pt-10 sm:px-8 md:px-12">
      <div>
        <p className="home-section-kicker">Tools used in the work</p>
        <h1 className="display-title">
          toolkit<span className="signal">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
          A practical snapshot of the languages, software, and embedded tools
          used across my projects.
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <section className="skill-route-card" key={category}>
            <p className="project-card-index">AREA / {String(index + 1).padStart(2, "0")}</p>
            <h2>{category}</h2>
            <div className="home-project-tags">
              {grouped[category].map((skill) => (
                <span key={skill.id}>{skill.label}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
