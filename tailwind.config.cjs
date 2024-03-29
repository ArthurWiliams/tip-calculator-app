const DEFAULT_THEME = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,vue}"],
  theme: {
    colors: {
      cyan: {
        100: "hsl(189, 41%, 97%)",
        200: "hsl(185, 41%, 84%)",
        300: "hsl(173, 61%, 77%)",
        400: "hsl(184, 14%, 56%)",
        500: "hsl(172, 67%, 45%)",
        800: "hsl(186, 14%, 43%)",
        900: "hsl(183, 100%, 15%)",
      },
      white: "hsl(0, 0%, 100%)",
      red: "hsl(10, 91%, 54%)",
    },
    fontFamily: {
      mono: ["Space Mono", "monospace"],
    },
    borderRadius: {
      ...DEFAULT_THEME.borderRadius,
      md: "0.32rem",
    },
    extend: {},
  },
  plugins: [],
};
