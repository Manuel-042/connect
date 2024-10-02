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
        secondary: {
          DEFAULT: colors.blue[700],
          hover: colors.blue[800],
          border: colors.blue[900],
          text: colors.blue[100]
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

