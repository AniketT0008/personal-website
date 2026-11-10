import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#07090c",
          elevated: "#0e1218",
          muted: "#161c24",
        },
        fg: {
          DEFAULT: "#f2f4f7",
          muted: "rgba(242,244,247,0.68)",
          subtle: "rgba(242,244,247,0.42)",
        },
        signal: {
          DEFAULT: "#e7b66d",
        },
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
