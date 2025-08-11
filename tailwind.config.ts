// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D7352A", // slightly deep red for the top stripe
        },
      },
    },
  },
  plugins: [],
};
export default config;
