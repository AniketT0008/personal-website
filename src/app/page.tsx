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

function ProjectArt({ id, title }: { id: string; title: string }) {
  const label = "SCHEMATIC / " + title.toUpperCase();

  if (id === "queuemerger") {
    return (
      <div className="simple-card-art" role="img" aria-label="Schematic: student questions grouped by shared root cause">
        <span className="simple-art-label">{label}</span>
        <svg viewBox="0 0 520 150" aria-hidden="true">
          <rect className="simple-art-box" x="18" y="22" width="92" height="28" rx="5" />
          <rect className="simple-art-box" x="18" y="61" width="92" height="28" rx="5" />
          <rect className="simple-art-box" x="18" y="100" width="92" height="28" rx="5" />
          <path className="simple-art-line" d="M110 36 H180 V75 H228 M110 75 H228 M110 114 H180 V75" />
          <circle className="simple-art-node" cx="248" cy="75" r="20" />
          <path className="simple-art-line" d="M268 75 H345" />
          <rect className="simple-art-box simple-art-box-strong" x="350" y="53" width="145" height="44" rx="7" />
          <text className="simple-art-text" x="32" y="41">QUESTION</text>
          <text className="simple-art-text" x="229" y="79">ROOT</text>
          <text className="simple-art-text" x="371" y="80">TA RESPONSE</text>
        </svg>
        <span className="simple-art-caption">Individual questions → shared blockers</span>
      </div>
    );
  }

  if (id === "adaptive-study-engine") {
    return (
      <div className="simple-card-art" role="img" aria-label="Schematic: lesson, recall, and adaptive review cycle">
        <span className="simple-art-label">{label}</span>
        <svg viewBox="0 0 520 150" aria-hidden="true">
          <rect className="simple-art-box" x="22" y="42" width="112" height="58" rx="7" />
          <rect className="simple-art-box" x="204" y="42" width="112" height="58" rx="7" />
          <rect className="simple-art-box simple-art-box-strong" x="386" y="42" width="112" height="58" rx="7" />
          <path className="simple-art-line" d="M134 71 H195 M316 71 H377" />
          <path className="simple-art-line simple-art-dash" d="M440 108 C400 140, 113 140, 78 108" />
          <text className="simple-art-text" x="50" y="76">LESSON</text>
          <text className="simple-art-text" x="233" y="76">RECALL</text>
          <text className="simple-art-text" x="412" y="76">NEXT REVIEW</text>
        </svg>
        <span className="simple-art-caption">Learn → recall → schedule the next review</span>
      </div>
    );
  }

  if (id === "pid-self-balancing-robot") {
    return (
      <div className="simple-card-art" role="img" aria-label="Schematic: balance sensor, PID loop, and wheel control">
        <span className="simple-art-label">{label}</span>
        <svg viewBox="0 0 520 150" aria-hidden="true">
          <circle className="simple-art-wheel" cx="174" cy="112" r="21" />
          <circle className="simple-art-wheel" cx="300" cy="112" r="21" />
          <path className="simple-art-body" d="M165 95 L190 38 H276 L309 95 Z" />
          <rect className="simple-art-box-strong" x="208" y="50" width="50" height="25" rx="4" />
          <path className="simple-art-line" d="M235 49 V22 H382" />
          <rect className="simple-art-box" x="386" y="9" width="107" height="28" rx="5" />
          <text className="simple-art-text" x="403" y="28">PITCH → PID</text>
          <text className="simple-art-text" x="194" y="145">BENCH PROTOTYPE</text>
        </svg>
        <span className="simple-art-caption">Estimate pitch → tune control → retest</span>
      </div>
    );
  }

  if (id === "bare-metal-avr") {
    return (
      <div className="simple-card-art" role="img" aria-label="Schematic: microcontroller output driving an indicator LED">
        <span className="simple-art-label">{label}</span>
        <svg viewBox="0 0 520 150" aria-hidden="true">
          <rect className="simple-art-box-strong" x="170" y="26" width="164" height="88" rx="10" />
          <path className="simple-art-line" d="M170 42 H130 M170 62 H130 M170 82 H130 M170 102 H130 M334 70 H390" />
          <path className="simple-art-line" d="M390 70 H430" />
          <circle className="simple-art-node" cx="450" cy="70" r="18" />
          <path className="simple-art-line simple-art-dash" d="M437 56 L463 84 M463 56 L437 84" />
          <text className="simple-art-text" x="200" y="76">MCU / GPIO</text>
          <text className="simple-art-text" x="428" y="115">LED</text>
        </svg>
        <span className="simple-art-caption">Register write → output pin → built-in LED</span>
      </div>
    );
  }

  return (
    <div className="simple-card-art simple-card-art-generic" role="img" aria-label={"Project schematic for " + title}>
      <span className="simple-art-label">{label}</span>
      <div className="simple-art-generic-mark" aria-hidden="true" />
      <strong>{title}</strong>
    </div>
  );
}

function ProjectCard({ project, label }: { project: (typeof projects)[number]; label: string }) {
  const gallery = project.gallery ?? [];
  const cardImages = project.thumbnail ? gallery.slice(0, 1) : gallery.slice(0, 2);

  return (
    <article className="simple-card">
      {project.videoUrl ? (
        <div className="simple-card-video">
          <video controls preload="none" playsInline poster={project.videoPoster}>
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      ) : (project.thumbnail || cardImages.length > 0) ? (
        <div className={"simple-card-media" + (project.thumbnail && cardImages.length > 0 ? " simple-card-media-pair" : "")}>
          {project.thumbnail && (
            <div className="simple-card-photo">
              <Image src={project.thumbnail} alt={project.thumbnailAlt ?? ""} fill unoptimized={project.thumbnail.endsWith(".gif")} sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
          )}
          {cardImages.map((image) => (
            <div className="simple-card-photo" key={image.src}>
              <Image src={image.src} alt={image.alt} fill unoptimized={image.src.endsWith(".gif")} sizes="(max-width: 760px) 100vw, 40vw" />
            </div>
          ))}
        </div>
      ) : (
        <ProjectArt id={project.id} title={project.title} />
      )}
      {project.videoUrl && gallery.length > 0 && (
        <div className="simple-card-media">
          {gallery.slice(0, 1).map((image) => (
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
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Demo <ArrowUpRight size={14} aria-hidden /></a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source <ArrowUpRight size={14} aria-hidden /></a>
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
