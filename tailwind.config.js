/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.html",
    "./app/**/*.js"
  ],
  darkMode: "class",
  theme: {
    screens: {
      "sm": { "min": "425px" },
      "md": { "min": "768px" },
      "lg": { "min": "1024px" },
      "xl": { "min": "1280px" },
      "xxl": { "min": "1536px" },
    },
    container: {
      center: false,
      padding: {
        sm: "15px",
      }
    },
    fontFamily: {
      "sans": ["Inter", "sans-serif"],
    },
    colors: {
      "black": "#000",
      "white": "#fff",
      "blue": "#0000ff",
      "dawn-pink": "#faf5f4",
      transparent: "transparent"
    },
    extend: {
      maxWidth: {
        mw: "1420px",
      },
      gridTemplateRows: {
        "header": "auto auto auto",
      },
      gridTemplateColumns: {
        header: "1fr 1fr 1fr 1fr",
      }
    },
  },
  plugins: [],
}

