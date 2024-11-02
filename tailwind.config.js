import { defaults } from "autoprefixer"
import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.sky[500],
          hover: colors.sky[100],
        },
        secondary: {
          DEFAULT: "#1d9bf0",
          hover: "rgba(29, 155, 240, 0.9)",
          border: colors.blue[900],
          text: colors.blue[100],
          100: "#1d9bf0"
        },
        dark: {
          DEFAULT: colors.black,
          hover: "hover:bg-gray-500",
          100: colors.gray[100],
          text: colors.neutral[300],
        }
      },
      fontFamily: {
        body: ['Manrope']
      }
    },
  },
  plugins: [],
  darkMode: "class"
}

