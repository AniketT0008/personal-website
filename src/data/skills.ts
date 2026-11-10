/**
 * Skills grouped by category
 *
 * Derived from tech used across https://github.com/AniketT0008 projects.
 * TODO: add/remove pills as your stack grows.
 */

export type SkillCategory =
  | "Languages"
  | "Vision & AI"
  | "Software"
  | "Robotics & embedded";

export type Skill = {
  id: string;
  label: string;
  category: SkillCategory;
};

export const skillCategoryColors: Record<
  SkillCategory,
  { text: string; bg: string }
> = {
  Languages: { text: "text-sky-300", bg: "bg-sky-400/15" },
  "Vision & AI": { text: "text-violet-300", bg: "bg-violet-400/15" },
  Software: { text: "text-emerald-300", bg: "bg-emerald-400/15" },
  "Robotics & embedded": { text: "text-[#fdbf57]", bg: "bg-[#fdbf57]/15" },
};

export const skills: Skill[] = [
  // Languages
  { id: "python", label: "Python", category: "Languages" },
  { id: "cpp", label: "C/C++", category: "Languages" },
  { id: "java", label: "Java", category: "Languages" },
  { id: "ts", label: "TypeScript", category: "Languages" },
  { id: "js", label: "JavaScript", category: "Languages" },
  // Vision and AI
  { id: "tensorflow", label: "TensorFlow", category: "Vision & AI" },
  { id: "pytorch", label: "PyTorch", category: "Vision & AI" },
  { id: "opencv", label: "OpenCV", category: "Vision & AI" },
  { id: "mediapipe", label: "MediaPipe", category: "Vision & AI" },
  { id: "numpy", label: "NumPy", category: "Vision & AI" },
  { id: "gemini", label: "Gemini API", category: "Vision & AI" },
  // Software and tools
  { id: "nextjs", label: "Next.js", category: "Software" },
  { id: "fastapi", label: "FastAPI", category: "Software" },
  { id: "supabase", label: "Supabase", category: "Software" },
  { id: "git", label: "Git", category: "Software" },
  { id: "vercel", label: "Vercel", category: "Software" },
  { id: "altium", label: "Altium Designer", category: "Software" },
  { id: "inventor", label: "Autodesk Inventor", category: "Software" },
  { id: "fusion", label: "Fusion 360", category: "Software" },
  // Robotics and embedded systems
  { id: "esp32", label: "ESP32", category: "Robotics & embedded" },
  { id: "arduino", label: "Arduino", category: "Robotics & embedded" },
  { id: "embedded-c", label: "Embedded C", category: "Robotics & embedded" },
  { id: "bare-metal", label: "Bare-metal programming", category: "Robotics & embedded" },
  { id: "i2c", label: "I²C", category: "Robotics & embedded" },
  { id: "uart", label: "UART", category: "Robotics & embedded" },
  { id: "pid", label: "PID control", category: "Robotics & embedded" },
];

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Vision & AI",
  "Software",
  "Robotics & embedded",
];

export function skillsByCategory(): Record<SkillCategory, Skill[]> {
  return skillCategories.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<SkillCategory, Skill[]>
  );
}
