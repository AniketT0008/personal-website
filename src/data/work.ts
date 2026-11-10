/**
 * Work / experience
 */

export type WorkEntry = {
  id: string;
  company: string;
  role: string;
  employmentType:
    | "Internship"
    | "Co-op"
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Research"
    | "Design Team"
    | "Volunteer"
    | "Education";
  dateRange: string;
  location: string;
  description: string;
  /** Company logo path under /public, e.g. "/images/acme.png". Leave undefined for initials avatar. */
  logoSrc?: string;
  companyUrl?: string;
};

export const work: WorkEntry[] = [
  {
    id: "mcmaster-eng-2026",
    company: "McMaster University",
    role: "Engineering I Student",
    employmentType: "Education",
    dateRange: "Sep 2026 — Expected 2030",
    location: "Hamilton, ON",
    description:
      "Bachelor of Engineering (Co-op) student building a foundation in engineering design and computation. Expected graduation: 2030.",
    companyUrl: "https://www.mcmaster.ca/engineering/",
  },
  {
    id: "firesat",
    company: "MAC RoboMaster",
    role: "Computer Vision Member",
    employmentType: "Design Team",
    dateRange: "Sep 2026 — present",
    location: "Hamilton, ON",
    description:
      "Contributing to the Python vision stack on an Orange Pi for object detection and target tracking on the team's autonomous Sentry robot.",
  },
  {
    id: "firesat",
    company: "AIAA McMaster FIRESAT",
    role: "Edge AI Member",
    employmentType: "Design Team",
    dateRange: "Sep 2026 — present",
    location: "Hamilton, ON",
    description:
      "Scoping software for a high-altitude balloon wildfire-detection payload, including preprocessing dual-LWIR and broadband thermal inputs, onboard inference, health monitoring, and downlink. Model adaptation remains unvalidated.",
  },
];
