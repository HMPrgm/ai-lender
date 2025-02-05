import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },
      colors: {
        dark_1: "#1E1E2A",
        dark_2: "#363644",
        dark_3: "#535461",
        dark_4: "#9A9A9E",
        light_1: "#FFFFFF",
        light_2: "#C4C4C4",
        primary: "#17AA36",
        secondary: "#9BD1A4",
      },
    },
  },
  plugins: [],
} satisfies Config;
