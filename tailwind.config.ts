import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#ecebe6",
        graphite: "#15171a",
        sienna: "#b5532f",
        blueprint: "#2d4bff",
        amberglow: "#ffb457",
        mist: "#d8d6cf",
        ash: "#6b6e73",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        brand: "0.16em",
      },
      transitionTimingFunction: {
        crest: "cubic-bezier(0.22, 1, 0.36, 1)",
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        overshoot: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      maxWidth: {
        site: "1440px",
      },
    },
  },
  plugins: [],
} satisfies Config;
