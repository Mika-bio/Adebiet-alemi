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
        burgundy: {
          DEFAULT: "#4A0E1F",
          50: "#FDF2F4",
          100: "#F9E4E9",
          200: "#F0C4D0",
          300: "#E09AAD",
          400: "#C45F7A",
          500: "#9B2D4A",
          600: "#7A1F38",
          700: "#4A0E1F",
          800: "#3A0B18",
          900: "#2A0812",
        },
        cream: {
          DEFAULT: "#F7F1E8",
          50: "#FFFDF9",
          100: "#F7F1E8",
          200: "#EFE6D6",
          300: "#E4D5BA",
          400: "#D4C09A",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8D48B",
          dark: "#8B7019",
        },
      },
      fontFamily: {
        serif: ["var(--font-pt-serif)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 4px 20px rgba(74, 14, 31, 0.15), 0 1px 3px rgba(74, 14, 31, 0.1)",
        soft: "0 2px 12px rgba(74, 14, 31, 0.08)",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(ellipse at top, rgba(201, 162, 39, 0.06), transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
