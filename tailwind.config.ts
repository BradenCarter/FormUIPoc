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
        background: "#00FFFF", // Updated background color to cyanW
        foreground: "var(--foreground)",
        pageBackground: "#2A363B",
      },
    },
  },
  plugins: [],
} satisfies Config;
