/**
 * Portfolio project catalog.
 * Featured projects appear on the home page; supporting builds remain in Work.
 */

export type ProjectCategory =
  | "Robotics"
  | "Computer Vision"
  | "Software"
  | "Hackathons";

export type TagCategory =
  | "Embedded"
  | "Vision & AI"
  | "Robotics"
  | "Web"
  | "Algorithms"
  | "Learning";

export type ProjectTag = {
  id: string;
  label: string;
  category: TagCategory;
};

const neutralTagColor = {
  text: "text-fg-muted",
  bg: "bg-fg/5",
  ring: "ring-fg/20",
};

export const categoryColors: Record<
  TagCategory,
  { text: string; bg: string; ring: string }
> = {
  Embedded: neutralTagColor,
  "Vision & AI": neutralTagColor,
  Robotics: neutralTagColor,
  Web: neutralTagColor,
  Algorithms: neutralTagColor,
  Learning: neutralTagColor,
};

export const allTags: ProjectTag[] = [
  { id: "esp32", label: "ESP32", category: "Embedded" },
  { id: "arduino", label: "Arduino", category: "Embedded" },
  { id: "cpp", label: "C/C++", category: "Embedded" },
  { id: "embedded-c", label: "Embedded C", category: "Embedded" },
  { id: "pid-control", label: "PID control", category: "Embedded" },
  { id: "python", label: "Python", category: "Vision & AI" },
  { id: "tensorflow", label: "TensorFlow", category: "Vision & AI" },
  { id: "pytorch", label: "PyTorch", category: "Vision & AI" },
  { id: "opencv", label: "OpenCV", category: "Vision & AI" },
  { id: "mediapipe", label: "MediaPipe", category: "Vision & AI" },
  { id: "numpy", label: "NumPy", category: "Vision & AI" },
  { id: "gemini", label: "Gemini API", category: "Vision & AI" },
  { id: "robotics", label: "Robotics", category: "Robotics" },
  { id: "wifi-control", label: "Wi-Fi control", category: "Robotics" },
  { id: "nextjs", label: "Next.js", category: "Web" },
  { id: "typescript", label: "TypeScript", category: "Web" },
  { id: "javascript", label: "JavaScript", category: "Web" },
  { id: "fastapi", label: "FastAPI", category: "Web" },
  { id: "supabase", label: "Supabase", category: "Web" },
  { id: "tailwind", label: "Tailwind CSS", category: "Web" },
  { id: "pathfinding", label: "Pathfinding", category: "Algorithms" },
  { id: "pygame", label: "Pygame", category: "Algorithms" },
  { id: "sm2", label: "SM-2", category: "Learning" },
  { id: "clustering", label: "Question clustering", category: "Learning" },
];

export type Project = {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tags: string[];
  featured?: boolean;
  thumbnail?: string;
  thumbnailAlt?: string;
  gallery?: { src: string; alt: string }[];
  problem: string;
  approach: string;
  learned: string;
  githubUrl?: string;
  demoUrl?: string;
  year: string;
};

export const projectCategories: ProjectCategory[] = [
  "Robotics",
  "Computer Vision",
  "Software",
  "Hackathons",
];

export const projects: Project[] = [
  {
    id: "portfolio-builder",
    title: "ProjectForge AI",
    summary:
      "A live full-stack app that turns GitHub repositories and project files into résumé bullets, interview stories, technical docs, and other career-ready material.",
    category: "Hackathons",
    tags: ["nextjs", "typescript", "tailwind", "supabase", "gemini"],
    featured: true,
    thumbnail: "/images/projects/projectforge-demo.gif",
    thumbnailAlt: "ProjectForge AI product demo",
    problem:
      "Turning raw project files and repositories into clear career materials is slow and inconsistent.",
    approach:
      "Built project workspaces and tunable generation flows with Next.js, Supabase, and Gemini.",
    learned:
      "GitHub OAuth required a server-side PKCE flow. The app now runs with Supabase authentication and saved generations.",
    githubUrl: "https://github.com/AniketT0008/portfolio-builder",
    demoUrl: "https://portfolio-builder-fawn.vercel.app",
    year: "2026",
  },
  {
    id: "gesture-controlled-robot",
    title: "Gesture-Controlled Robot",
    summary:
      "Hand landmarks and a compact classifier turn webcam gestures into Wi-Fi drive commands for an ESP32 robot.",
    category: "Computer Vision",
    tags: ["python", "mediapipe", "opencv", "esp32", "robotics", "wifi-control"],
    featured: true,
    thumbnail: "/images/projects/gesture-robot.gif",
    thumbnailAlt: "Robot controlled by hand gestures",
    problem:
      "The first raw-image classifier confused left and right gestures.",
    approach:
      "Replaced raw-image features with MediaPipe hand landmarks and a compact MLP, then connected predictions to Wi-Fi motor commands.",
    learned:
      "Fixed left/right misclassification and reduced model training time to under one second.",
    githubUrl: "https://github.com/AniketT0008/gesture-controlled-robot",
    year: "2026",
  },
  {
    id: "queuemerger",
    title: "QueueMerger",
    summary:
      "Groups repeated office-hour questions into root-cause clusters so teaching assistants can resolve common blockers together.",
    category: "Hackathons",
    tags: ["python", "clustering"],
    featured: true,
    problem:
      "A busy help queue can hide the same underlying question repeated by many students.",
    approach:
      "Built a queue-compression tool that organizes individual requests into shared root-cause groups for TA review.",
    learned:
      "A clear view of repeated blockers helps a TA prioritize explanations that unblock more than one student.",
    githubUrl: "https://github.com/AniketT0008/QueueMerger",
    demoUrl: "https://anikett0008.github.io/QueueMerger/",
    year: "2026",
  },
  {
    id: "adaptive-study-engine",
    title: "Synapse — Adaptive Study Engine",
    summary:
      "A study app with teacher-led lessons and adaptive review scheduling built around the SM-2 spaced-repetition algorithm.",
    category: "Hackathons",
    tags: ["javascript", "sm2", "learning"],
    featured: true,
    problem:
      "A fixed review schedule does not adapt to what a student remembers from one lesson to the next.",
    approach:
      "Combined teacher mode and lesson-based course decks with SM-2 review intervals.",
    learned:
      "Separating lesson teaching from later recall practice makes the review loop easier to understand and tune.",
    githubUrl: "https://github.com/AniketT0008/adaptive-study-engine",
    demoUrl: "https://AniketT0008.github.io/adaptive-study-engine/",
    year: "2026",
  },
  {
    id: "aurora-ai",
    title: "Aurora AI",
    summary:
      "A multi-agent decision-support prototype that compares user-provided context across career, productivity, and lifestyle questions.",
    category: "Hackathons",
    tags: ["python", "fastapi", "gemini", "opencv"],
    featured: true,
    thumbnail: "/images/projects/aurora-ai-demo.gif",
    thumbnailAlt: "Aurora AI onboarding and decision-support demo",
    problem:
      "Open-ended chat answers can be difficult to compare when a decision has several competing constraints.",
    approach:
      "Built a FastAPI prototype with specialist agents and structured responses, using user-provided context.",
    learned:
      "Structured outputs make it easier to review how a prototype reached its recommendation; this remains a decision-support experiment.",
    githubUrl: "https://github.com/AniketT0008/Aurora-AI",
    demoUrl: "https://aurora-ai-o2f6.onrender.com/",
    year: "2026",
  },
  {
    id: "pathfinding-visualizer",
    title: "Pathfinding, Side by Side",
    summary:
      "A Pygame comparison of BFS, DFS, A*, and bidirectional variants exploring the same generated maze.",
    category: "Software",
    tags: ["python", "pygame", "pathfinding"],
    featured: true,
    thumbnail: "/images/projects/pathfinding-comparison-demo.gif",
    thumbnailAlt: "Side-by-side pathfinding algorithm comparison",
    problem:
      "Pseudocode hides how differently search algorithms explore a maze.",
    approach:
      "Runs six search variants side by side on the same generated maze.",
    learned:
      "Seeing explored cells update in real time makes the trade-offs between search strategies easier to compare.",
    githubUrl:
      "https://github.com/AniketT0008/Visual-Comparison-between-path-finding-algorithms",
    year: "2026",
  },
  {
    id: "competition-robotics",
    title: "Competition Robotics — Maze & Sumo",
    summary:
      "Arduino-based autonomous robot builds: 1st place in Maze and 2nd place in Sumo at FEP.",
    category: "Robotics",
    tags: ["arduino", "cpp", "robotics"],
    problem:
      "Build autonomous robots that can navigate a maze and respond to an opponent in a timed arena.",
    approach:
      "Tuned navigation, drive response, and recovery behavior for the two competition formats.",
    learned:
      "Small changes to robot behavior and mechanical fit can decide whether a strategy works in a real arena.",
    year: "2024",
  },
  {
    id: "pid-self-balancing-robot",
    title: "PID Self-Balancing Robot",
    summary:
      "ESP32 pitch estimation and live PID tuning for on-bench tests; gearbox backlash and motor mismatch remain to be retested.",
    category: "Robotics",
    tags: ["esp32", "cpp", "pid-control", "robotics"],
    thumbnailAlt: "Self-balancing robot prototype",
    problem:
      "Estimate pitch and tune a two-wheel balancing controller before evaluating it with matched motors.",
    approach:
      "Implemented a complementary-filter estimate and serial controls for live PID tuning on the ESP32.",
    learned:
      "Bench tests isolated residual instability to gearbox backlash and motor mismatch; a matched-motor retest is next.",
    githubUrl: "https://github.com/AniketT0008/pid-self-balancing-robot",
    year: "2026",
  },
  {
    id: "bare-metal-avr",
    title: "Bare-Metal AVR Firmware",
    summary:
      "Register-level embedded C to configure a microcontroller output, build firmware images, and program the board through its serial bootloader.",
    category: "Robotics",
    tags: ["cpp", "embedded-c"],
    problem:
      "Understand the path from a register-level change to firmware running on a microcontroller.",
    approach:
      "Configured an output, built ELF and Intel HEX images, and programmed the board through its serial bootloader.",
    learned:
      "A small firmware change still depends on the complete build and flashing path.",
    year: "2026",
  },
];

export function getTagById(id: string): ProjectTag | undefined {
  return allTags.find((tag) => tag.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function projectsByCategory(): Record<ProjectCategory, Project[]> {
  return projectCategories.reduce(
    (acc, category) => {
      acc[category] = projects.filter((project) => project.category === category);
      return acc;
    },
    {} as Record<ProjectCategory, Project[]>
  );
}

export function tagsByCategory(): Record<TagCategory, ProjectTag[]> {
  const categories: TagCategory[] = [
    "Embedded",
    "Vision & AI",
    "Robotics",
    "Web",
    "Algorithms",
    "Learning",
  ];

  return categories.reduce(
    (acc, category) => {
      acc[category] = allTags.filter((tag) => tag.category === category);
      return acc;
    },
    {} as Record<TagCategory, ProjectTag[]>
  );
}
