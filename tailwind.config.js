/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep Twilight - Primary brand color
        "deep-twilight": {
          50: "#e6e7fe",
          100: "#cecefd",
          200: "#9c9efc",
          300: "#6b6dfa",
          400: "#393cf9",
          500: "#080cf7",
          600: "#0609c6",
          700: "#050794",
          800: "#030563",
          900: "#020231",
          950: "#010223",
        },
        // French Blue - Secondary/Accent color
        "french-blue": {
          50: "#e6f1ff",
          100: "#cde2fe",
          200: "#9bc5fd",
          300: "#69a8fc",
          400: "#378bfb",
          500: "#056efa",
          600: "#0458c8",
          700: "#034296",
          800: "#022c64",
          900: "#011632",
          950: "#010b19",
        },
        // Background colors
        "background-light": "#f8fafc",
        "background-dark": "#0f172a",
        "card-light": "#ffffff",
        "card-dark": "#1e293b",
        // Semantic colors
        background: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        inverse: "rgb(var(--inverse) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        
        primary: "#080cf7",
        secondary: "#056efa",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};