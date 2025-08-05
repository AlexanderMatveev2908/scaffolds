import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue_pmr: "#6366f1",
        purple_pmr: "#8b5cf6",

        green_sec: {
          0: "#dcfce7",
          1: "#16a34a",
        },

        blue_sec: {
          0: "#dbeafe",
          1: "#2563eb",
        },

        white_sec: "#f9fafb",

        gray_sec: {
          0: "#e5e7eb",
          1: "#ced4da",
          2: "#9ca3af",
          3: "#4b5563",
        },

        black_sec: "#111827",
      },
    },
  },
  plugins: [],
};

export default config;
