import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#10233f",
        primary: "#1769e0",
        skysoft: "#edf6ff",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(24, 64, 118, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;
