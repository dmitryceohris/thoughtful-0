import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"]
      },
      colors: {
        ink: "#18181b",
        canvas: "#f4f6f0",
        surface: "#ffffff",
        paper: "#fffdf8",
        line: "#d9e1dc",
        muted: "#626f6b",
        sage: "#4d6d5a",
        copper: "#b96f3e",
        lake: "#315f82",
        amber: "#f0cf87"
      },
      boxShadow: {
        soft: "0 16px 42px -30px rgba(24, 24, 27, 0.32)",
        medium: "0 24px 70px -46px rgba(24, 24, 27, 0.38)",
        strong: "0 34px 90px -54px rgba(24, 24, 27, 0.48)"
      }
    }
  },
  plugins: []
};

export default config;
