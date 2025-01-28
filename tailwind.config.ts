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
        background: "#0D1117", // Darker background color
        foreground: "#1A202C", // Darker foreground color, closer to black
        pageBackground: "#2D3748", // Darker page background
        primary: "#3182CE", // Blue primary color
        neutral: "#E2E8F0", // Light neutral color
        base200: "#4A5568", // Dark base color
      },
    },
  },
  plugins: [],
} satisfies Config;
