/**
 * Site identity & social links
 */

export const siteConfig = {
  name: "Aniket Thakur",
  shortName: "ANIKET",
  lastName: "THAKUR",
  tagline: "McMaster Engineering I · Robotics · Embedded Systems · Applied AI",
  location: "Hamilton, ON",
  email: "aniketthakur20008@gmail.com",
  availability: "Open to co-ops, design teams & collabs" as string | null,
  resumePath: "/resume/Aniket_Thakur_Resume.pdf",

  social: {
    linkedin: "https://www.linkedin.com/in/aniket-thakur-551475370/",
    github: "https://github.com/AniketT0008",
    twitter: null as string | null,
  },

  title: "Aniket Thakur — Robotics, Embedded Systems & Applied AI",
  description:
    "McMaster Engineering I student building robotics, embedded systems, computer vision, and applied AI projects.",
  url: "https://aniketthakur.vercel.app",
} as const;

export type SiteConfig = typeof siteConfig;
