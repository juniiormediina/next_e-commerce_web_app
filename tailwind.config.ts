import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f9fafb",
        primary: "#22c55e",
        accent: "#38bdf8"
      }
    }
  },
  plugins: []
};

export default config;
