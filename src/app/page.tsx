"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";
import { siteConfig } from "@/data/site";
import { work } from "@/data/work";
import { projects, getTagById } from "@/data/projects";
import type { Project } from "@/data/projects";
import { skillCategories, skills } from "@/data/skills";

const getProjects = (ids: string[]): Project[] =>
  ids.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    return project ? [project] : [];
  });

const hardwareProjects = getProjects(["gesture-controlled-robot", "competition-robotics"]);
const hardwareMentions = getProjects(["pid-self-balancing-robot", "bare-metal-avr"]);
const hackathonProjects = getProjects(["portfolio-builder", "aurora-ai"]);
const hackathonMentions = getProjects(["queuemerger", "adaptive-study-engine"]);
const otherFeaturedProjects = getProjects(["pathfinding-visualizer"]);
const teamEntries = work.filter((entry) => entry.employmentType === "Design Team");

const plainButtonStyle = {
  border: 0,
  padding: 0,
  background: "transparent",
  color: "inherit",
  font: "inherit",
  cursor: "pointer",
} as const;

function ProjectCard({
  project,
  label,
  onOpen,
}: {
  project: Project;
  label: string;
  onOpen: (project: Project) => void;
}) {
  const gallery = project.gallery ?? [];
  const image = project.thumbnail
    ? { src: project.thumbnail, alt: project.thumbnailAlt ?? project.title }
    : gallery[0];

  return (
    <article className="simple-card">
      {project.videoUrl ? (
        <div className="simple-card-video">
          <video controls preload="none" playsInline poster={project.videoPoster ?? project.thumbnail}>
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      ) : image ? (
        <div className="simple-card-media">
          <div className="simple-card-photo">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized={image.src.endsWith(".gif")}
              sizes="(max-width: 760px) 100vw, 40vw"
            />
          </div>
        </div>
      ) : null}
      {project.videoUrl && gallery.length > 0 && (
        <div className="simple-card-media">
          {gallery.slice(0, 2).map((item) => (
            <div className="simple-card-photo" key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 40vw" />
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
        <button
          className="simple-text-link"
          type="button"
          style={{ ...plainButtonStyle, marginTop: 0 }}
          onClick={() => onOpen(project)}
        >
          Details <ArrowUpRight size={14} aria-hidden />
        </button>
      </div>
    </article>
  );
}

function ProjectMentions({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (project: Project) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div className="simple-team-list">
      {items.map((project) => (
        <button
          className="simple-team-row"
          key={project.id}
          type="button"
          style={{
            ...plainButtonStyle,
            width: "100%",
            borderTop: 0,
            borderRight: 0,
            borderLeft: 0,
            textAlign: "left",
          }}
          onClick={() => onOpen(project)}
        >
          <div>
            <p className="simple-kicker">{project.category} · {project.year}</p>
            <h3>{project.title}</h3>
          </div>
          <p>
            {project.summary} <span className="simple-text-link" style={{ marginTop: 0 }}>Open details <ArrowUpRight size={14} aria-hidden /></span>
          </p>
        </button>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
          {hardwareProjects.map((project) => (
            <ProjectCard key={project.id} project={project} label={project.category} onOpen={setActiveProject} />
          ))}
        </div>
        <p className="simple-kicker" style={{ marginTop: "1.35rem", marginBottom: ".2rem" }}>More hardware projects</p>
        <ProjectMentions items={hardwareMentions} onOpen={setActiveProject} />
      </section>

      <section className="simple-section" id="hackathons">
        <header className="simple-section-heading">
          <p className="simple-kicker">02 / Hackathon projects</p>
          <h2>AI and software builds.</h2>
          <p>These AI and software projects were built for hackathons; each card links to its demo or source.</p>
        </header>
        <div className="simple-card-grid">
          {hackathonProjects.map((project) => (
            <ProjectCard key={project.id} project={project} label="Hackathon project" onOpen={setActiveProject} />
          ))}
        </div>
        <p className="simple-kicker" style={{ marginTop: "1.35rem", marginBottom: ".2rem" }}>More hackathon builds</p>
        <ProjectMentions items={hackathonMentions} onOpen={setActiveProject} />
      </section>

      <section className="simple-section" id="other-work">
        <header className="simple-section-heading">
          <p className="simple-kicker">03 / Other featured work</p>
          <h2>Visualizing algorithms.</h2>
          <p>A compact software project with a visual demo.</p>
        </header>
        <div className="simple-card-grid">
          {otherFeaturedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} label={project.category} onOpen={setActiveProject} />
          ))}
        </div>
      </section>

      <section className="simple-section" id="teams">
        <header className="simple-section-heading">
          <p className="simple-kicker">04 / Student teams</p>
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
          <p className="simple-kicker">05 / Toolkit</p>
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
          <p className="simple-kicker">06 / About</p>
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
          <p className="simple-kicker">07 / Contact</p>
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
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
