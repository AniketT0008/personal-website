/**
 * About / bio content
 */

export const about = {
  photoSrc: undefined as string | undefined,
  photoAlt: "Portrait of Aniket Thakur",

  bio: [
    "I'm Aniket Thakur, a McMaster Engineering I co-op student focused on robotics, computer vision, embedded software, and applied AI.",
    "As a Computer Vision Member on MAC RoboMaster, I contribute to the Python vision stack on an Orange Pi for object detection and target tracking on the team's autonomous Sentry robot.",
    "With AIAA McMaster FIRESAT, I am scoping edge software for a high-altitude balloon wildfire-detection payload. Model adaptation is not yet validated, so I do not claim model performance.",
    "My independent work ranges from gesture-driven robot control to ProjectForge AI, a live tool that turns project files and repositories into useful career materials.",
    "I like projects where the system can be observed and measured. I document what is working, what is still being validated, and what I learned along the way.",
    "Open to co-ops, design-team work, and thoughtful collaborations — reach out anytime.",
  ],

  funFacts: [
    "Gesture robot: fixed left/right misclassification and reduced training to under one second with hand landmarks and a compact MLP",
    "Competition robotics: 1st place in Maze and 2nd place in Sumo at FEP",
    "ProjectForge AI is live and generates career-ready material from project artifacts",
    "FIRESAT payload software and model adaptation are still being scoped; no model performance result is claimed",
  ],

  currentlyLearning: [
    "Object detection and target tracking for the RoboMaster Sentry robot",
    "Data and preprocessing requirements for dual-LWIR and broadband thermal inputs",
    "Embedded inference, payload health monitoring, and downlink planning",
  ],
} as const;
