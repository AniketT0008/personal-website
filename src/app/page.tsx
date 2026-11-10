import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { work } from "@/data/work";
import { projects, getTagById } from "@/data/projects";
import { skillCategories, skills } from "@/data/skills";

const hardwareIds = [
  "gesture-controlled-robot",
  "competition-robotics",
  "pid-self-balancing-robot",
  "bare-metal-avr",
];
const hardwareProjects = hardwareIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project) => Boolean(project));
const hackathonProjects = projects.filter((project) => project.category === "Hackathons");
const teamEntries = work.filter((entry) => entry.employmentType === "Design Team");

function ProjectCard({ project, label }: { project: (typeof projects)[number]; label: string }) {
  return (
    <article className="simple-card">
      {(project.thumbnail || (project.gallery && project.gallery.length > 0)) && (
        <div className={"simple-card-media" + (project.gallery && project.gallery.length > 0 ? " simple-card-media-pair" : "")}>
          {project.thumbnail && (
            <div className="simple-card-photo">
              <Image
                src={project.thumbnail}
                alt={project.thumbnailAlt ?? ""}
                fill
                unoptimized={project.thumbnail.endsWith(".gif")}
                sizes="(max-width: 760px) 100vw, 40vw"
              />
            </div>
          )}
          {project.gallery?.slice(0, 1).map((image) => (
            <div className="simple-card-photo" key={image.src}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
          ))}
        </div>
      )}
      <div className="simple-card-meta">
        <span>{label}</span>
        <span>{project.year}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="simple-tags">
        {project.tags.slice(0, 4).map((id) => {
          const tag = getTagById(id);
          return tag ? <span key={tag.id}>{tag.label}</span> : null;
        })}
      </div>
      <div className="simple-card-links">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Demo <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            Source <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="simple-home">
      <section className="simple-hero" id="top">
        <div className="simple-hero-copy">
          <p className="simple-eyebrow">McMaster Engineering I Co-op · Expected 2030</p>
          <h1>Aniket Thakur</h1>
          <h2>Hardware-first engineering.</h2>
          <p className="simple-lede">
            I build and test robotics, embedded systems, and computer vision
            software — then share the results clearly.
          </p>
          <div className="simple-actions">
            <Link className="simple-button simple-button-primary" href="#hardware">
              Hardware projects
            </Link>
            <a className="simple-button" href={siteConfig.resumePath} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
            <a className="simple-button" href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <p className="simple-focus">
            Robotics <span>·</span> Embedded software <span>·</span> Computer vision <span>·</span> Edge AI
          </p>
        </div>
        <figure className="simple-hero-photo">
          <Image
            src="/images/projects/gesture-robot.png"
            alt="ESP32 robot used in the gesture-control project"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 42vw"
            className="simple-hero-image"
          />
          <figcaption>Gesture-Controlled Robot · 2026</figcaption>
        </figure>
      </section>

      <section className="simple-section" id="hardware">
        <header className="simple-section-heading">
          <p className="simple-kicker">01 / Hardware & robotics</p>
          <h2>Systems you can build and test.</h2>
          <p>Team work and projects centered on physical robots, embedded code, and sensing.</p>
        </header>
        <div className="simple-card-grid">
          {hardwareProjects.map((project) => project && (
            <ProjectCard key={project.id} project={project} label={project.category} />
          ))}
        </div>
      </section>

      <section className="simple-section" id="hackathons">
        <header className="simple-section-heading">
          <p className="simple-kicker">02 / Hackathon projects</p>
          <h2>AI and software builds.</h2>
          <p>These AI and software projects were built for hackathons; each card links to its demo or source.</p>
        </header>
        <div className="simple-card-grid">
          {hackathonProjects.map((project) => (
            <ProjectCard key={project.id} project={project} label="Hackathon project" />
          ))}
        </div>
      </section>

      <section className="simple-section" id="teams">
        <header className="simple-section-heading">
          <p className="simple-kicker">03 / Student teams</p>
          <h2>Engineering team work.</h2>
        </header>
        <div className="simple-team-list">
          {teamEntries.map((entry) => (
            <article className="simple-team-row" key={entry.id}>
              <div>
                <p className="simple-kicker">{entry.dateRange}</p>
                <h3>{entry.role}</h3>
                <p className="simple-team-name">{entry.company}</p>
              </div>
              <p>{entry.description}</p>
            </article>
          ))}
        </div>
        <Link className="simple-text-link" href="/experience">More about education and teams <ArrowUpRight size={14} aria-hidden /></Link>
      </section>

      <section className="simple-section" id="skills">
        <header className="simple-section-heading">
          <p className="simple-kicker">04 / Toolkit</p>
          <h2>Tools I use.</h2>
        </header>
        <div className="simple-skill-grid">
          {skillCategories.map((category) => (
            <article className="simple-skill-group" key={category}>
              <h3>{category}</h3>
              <div className="simple-tags">
                {skills.filter((skill) => skill.category === category).map((skill) => (
                  <span key={skill.id}>{skill.label}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <Link className="simple-text-link" href="/skills">All skills and tools <ArrowUpRight size={14} aria-hidden /></Link>
      </section>

      <section className="simple-about" id="about">
        <div>
          <p className="simple-kicker">05 / About</p>
          <h2>Curious about how the whole system works.</h2>
        </div>
        <p>
          I’m an Engineering I co-op student at McMaster University. I enjoy
          moving between code, sensors, and physical behavior, with project
          notes that make prototype status and measured results easy to tell apart.
        </p>
        <Link className="simple-text-link" href="/about">More about me <ArrowUpRight size={14} aria-hidden /></Link>
      </section>

      <section className="simple-contact" id="contact">
        <div>
          <p className="simple-kicker">06 / Contact</p>
          <h2>Have a hardware problem to solve?</h2>
          <p>Open to co-ops, design-team work, and collaborations in robotics and embedded systems.</p>
        </div>
        <div className="simple-actions">
          <a className="simple-button simple-button-primary" href={"mailto:" + siteConfig.email}>
            <Mail size={15} aria-hidden /> Email
          </a>
          <a className="simple-button" href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      </section>

      <footer className="simple-footer">
        <span>© 2026 Aniket Thakur</span>
        <Link href="#top">Back to top ↑</Link>
      </footer>
    </div>
  );
}
