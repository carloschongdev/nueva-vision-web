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
        primary: {
          950: "#0f0519",
          900: "#1a0a24",
          800: "#2d1240",
          700: "#3f1959",
          600: "#521f73",
          500: "#6b278b",
          400: "#8a3dab",
          300: "#9461a9",
          200: "#b98acc",
          100: "#dfc4ec",
          50:  "#f5eefa",
        },
        accent: {
          500: "#9461a9",
          400: "#a97cbf",
          300: "#c09dd5",
        },
        stone: {
          50: "#faf9fb",
          100: "#f3f0f7",
          200: "#e8e2f0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "slide-up":   "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":    "fadeIn 0.6s ease forwards",
        "slide-left": "slideLeft 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "float":      "float 4s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
