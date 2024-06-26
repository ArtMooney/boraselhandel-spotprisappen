/** @type {import("tailwindcss").Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        straw_light: ["Strawford Light Webfont", "sans-serif"],
        straw_bold: ["Strawford Bold Webfont", "sans-serif"],
      },
      gridTemplateColumns: {
        thin: "3rem 1fr 3rem",
        slim: "0.25fr 1fr 0.25fr",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
