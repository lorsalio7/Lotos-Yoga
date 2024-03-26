/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.html",
    "./app/**/*.js"
  ],
  darkMode: "class",
  theme: {
    screens: {
      "tallxxs": { "raw": "(min-height: 320px)"},
      "tallxs": { "raw": "(min-height: 375px)"},
      "tallsm": { "raw": "(min-height: 425px)"},
      "tallmd": { "raw": "(min-height: 768px)"},
      "talllg": { "raw": "(min-height: 1024px)"},
      "tallxl": { "raw": "(min-height: 1280px)"},
      "xss-min-h-740": { "raw": "(min-width: 360px) and (min-height: 740px)"},
      "xxs": { "min": "320px" },
      "xs": { "min": "375px" },
      "sm": { "min": "425px" },
      "md": { "min": "768px" },
      "lg": { "min": "1024px" },
      "xl": { "min": "1280px" },
      "xxl": { "min": "1536px" },
      "xxxl": { "min": "1920px" },
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
      "black-60": "#00000099",
      "black-50": "#00000080",
      "black-20": "#00000033",
      "black-10": "#0000001a",
      "white": "#fff",
      "blue": "#0000ff",
      "dawn-pink": "#faf5f4",
      "dawn-pink-90": "#faf5f4e6",
      "tan-hide": "#f78e69",
      "hot-pink": "#fc65a1",
      "silver": "#c8c4c3",
      transparent: "transparent"
    },
    extend: {
      maxWidth: {
        mw: "1650px",
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
      },
      backgroundImage: {
        "gradient-to-45": "linear-gradient(45deg, var(--tw-gradient-stops))",
      },
      boxShadow: {
        button: "0 0 50px #0000001a",
      }
    },
  },
  plugins: [],
}

