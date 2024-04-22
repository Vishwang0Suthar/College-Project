const path = require("path")
const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,ts,tsx,jsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {

        beige: {
          100: "#FBFADA"
        },
        greenDark: {
          50: "#12372a"
        }

      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}

