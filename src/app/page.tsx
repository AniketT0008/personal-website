import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { work } from "@/data/work";
import { projects, getTagById } from "@/data/projects";
import { skills, skillCategories } from "@/data/skills";

const featuredProjects = projects.filter((project) => project.featured);
const teamEntries = work.filter((entry) => entry.employmentType === "Design Team");

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero-layout" id="top">
        <div className="home-hero-copy">
          <p className="home-eyebrow">
            <span className="home-status-dot" aria-hidden />
            Aniket Thakur <span aria-hidden>·</span> McMaster Engineering I
            <span aria-hidden>·</span> Expected 2030
          </p>
          <h1 className="home-display-title">
            Robotics that move.
            <span>AI that helps.</span>
          </h1>
          <p className="home-intro">
            I build systems where software meets the physical world — from
            computer vision and embedded robots to AI tools with a practical
            purpose.
          </p>
          <div className="home-actions">
            <Link className="home-button home-button-primary" href="/work">
              Explore selected work <ArrowDownRight size={17} aria-hidden />
            </Link>
            <a
              className="home-button"
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <ArrowUpRight size={16} aria-hidden />
            </a>
            <a
              className="home-button"
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
          <div className="home-focus-tags" aria-label="Areas of focus">
            <span>Robotics</span>
            <span>Embedded systems</span>
            <span>Computer vision</span>
            <span>Applied AI</span>
          </div>
        </div>
        <div className="home-hero-visual">
          <Image
            src="/images/projects/gesture-robot.gif"
            alt="Gesture-controlled robot responding to a hand gesture"
            fill
            priority
            unoptimized
            sizes="(max-width: 900px) 100vw, 48vw"
            className="home-hero-image"
          />
          <div className="home-visual-grid" aria-hidden />
          <div className="home-visual-caption">
            <span>BUILD 02 / COMPUTER VISION</span>
            Gesture control → embedded drive
          </div>
          <div className="home-visual-index" aria-hidden>
            AT / 2026
          </div>
        </div>
      </section>

      <div className="home-signal-strip" aria-label="Portfolio focus">
        <div><b>01</b><span>Robotics & embedded</span></div>
        <div><b>02</b><span>Vision & edge AI</span></div>
        <div><b>03</b><span>Useful software</span></div>
      </div>

      <section className="home-section" id="selected-work">
        <div className="home-section-heading">
          <div>
            <p className="home-section-kicker">01 / Selected work</p>
            <h2>Projects with something to show.</h2>
          </div>
          <p className="home-section-intro">
            A curated set of robotics, computer vision, and AI projects. Each
            project page separates working features from experiments still
            being evaluated.
          </p>
        </div>
        <div className="home-project-grid">
          {featuredProjects.map((project, index) => (
            <article className="home-project-card" key={project.id}>
              <div className="home-project-art">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.thumbnailAlt ?? ""}
                    fill
                    unoptimized={project.thumbnail.endsWith(".gif")}
                    sizes="(max-width: 700px) 100vw, 50vw"
                    className="home-project-image"
                  />
                ) : (
                  <div className="home-project-placeholder" aria-hidden>
                    <span>{project.category}</span>
                    <strong>{project.title}</strong>
                  </div>
                )}
                <span className="home-project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="home-project-content">
                <p className="home-project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="home-project-summary">{project.summary}</p>
                <div className="home-project-tags">
                  {project.tags.slice(0, 4).map((tagId) => {
                    const tag = getTagById(tagId);
                    return tag ? <span key={tag.id}>{tag.label}</span> : null;
                  })}
                </div>
                <div className="home-project-links">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      Live demo <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      Source <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link className="home-text-link" href="/work">
          View all projects <ArrowUpRight size={15} aria-hidden />
        </Link>
      </section>

      <section className="home-section home-team-section" id="teams">
        <div className="home-section-heading">
          <div>
            <p className="home-section-kicker">02 / Engineering teams</p>
            <h2>Working on real systems.</h2>
          </div>
          <p className="home-section-intro">
            Student teams connect software work to physical hardware, data, and
            deployment constraints.
          </p>
        </div>
        <div className="home-team-grid">
          {teamEntries.map((entry, index) => (
            <article className="home-team-card" key={entry.id}>
              <p className="home-project-category">TEAM / {String(index + 1).padStart(2, "0")}</p>
              <h3>{entry.role}</h3>
              <p className="home-team-name">{entry.company}</p>
              <p>{entry.description}</p>
              <span>{entry.dateRange}</span>
            </article>
          ))}
        </div>
        <Link className="home-text-link" href="/experience">
          Read team and education details <ArrowUpRight size={15} aria-hidden />
        </Link>
      </section>

      <section className="home-section" id="toolkit">
        <div className="home-section-heading">
          <div>
            <p className="home-section-kicker">03 / Toolkit</p>
            <h2>Built across the stack.</h2>
          </div>
          <p className="home-section-intro">
            Technologies used in the projects above, grouped by the kind of work
            they support.
          </p>
        </div>
        <div className="home-skill-grid">
          {skillCategories.map((category) => (
            <article className="home-skill-card" key={category}>
              <h3>{category}</h3>
              <div>
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => <span key={skill.id}>{skill.label}</span>)}
              </div>
            </article>
          ))}
        </div>
        <Link className="home-text-link" href="/skills">
          Skills and tools <ArrowUpRight size={15} aria-hidden />
        </Link>
      </section>

      <section className="home-about-strip" id="about">
        <div>
          <p className="home-section-kicker">04 / About</p>
          <h2>Curiosity, tested on real systems.</h2>
        </div>
        <p>
          I’m an Engineering I student at McMaster University. I like moving
          between code, sensors, and physical behavior — and I keep project
          write-ups clear about what has been measured and what is still in
          progress.
        </p>
        <Link className="home-text-link" href="/about">
          More about me <ArrowUpRight size={15} aria-hidden />
        </Link>
      </section>

      <section className="home-contact-card" id="contact">
        <div>
          <p className="home-section-kicker">05 / Contact</p>
          <h2>Have a build in mind?</h2>
          <p>
            Open to co-ops, design-team work, and thoughtful collaborations in
            robotics, embedded systems, and AI.
          </p>
        </div>
        <div className="home-contact-actions">
          <a className="home-button home-button-primary" href={"mailto:" + siteConfig.email}>
            <Mail size={16} aria-hidden /> Get in touch
          </a>
          <a
            className="home-button"
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </section>

      <footer className="home-footer">
        <span>© 2026 Aniket Thakur · Robotics, embedded systems, and applied AI</span>
        <div>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={siteConfig.resumePath} target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
