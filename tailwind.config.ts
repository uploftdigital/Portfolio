import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#030303",
        "blue-accent": "#1a6bff",
        "blue-deep": "#0040cc",
        "blue-glow": "#3d8aff",
        "text-primary": "#f0f0f0",
        "text-muted": "#888888",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
