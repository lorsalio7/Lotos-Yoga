/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.html",
    "./app/**/*.js"
  ],
  darkMode: "class",
  theme: {
    screens: {
      "xs": { "min": "375px" },
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
      "black-50": "#00000080",
      "white": "#fff",
      "blue": "#0000ff",
      "dawn-pink": "#faf5f4",
      "dawn-pink-90": "#faf5f4e6",
      "tan-hide": "#f78e69",
      "hot-pink": "#fc65a1",
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
      },
      transitionProperty: {
        "top":  "top",
        "transform": "transform",
        "width": "width"
      },
      transitionTimingFunction: {
        "linear": "linear",
      }
    },
  },
  plugins: [],
}

