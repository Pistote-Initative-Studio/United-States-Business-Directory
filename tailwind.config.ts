import type { Config } from "tailwindcss";

const config: Config = {
  // no `content` needed in v4
  theme: {
    extend: {
      // example customization
      colors: {
        brand: {
          DEFAULT: "#0ea5e9",
          dark: "#0369a1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
