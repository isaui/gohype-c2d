import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: '#007FFF',
        "primary-2": "#F3F9FF",
        "background": "#F8F8F8",
        secondary: '#606060',
        "yellow-0": '#FAF8E8',
        "blue-0": '#DDE8FF',
        "indigo-0": '#AEBBFF',
        "gray-0":"#BFBFBF",
        "gray-1":"#F2F2F2"
      },
      textColor: {
        primary: '#282828',
        secondary: '#606060',
        tertiary: '#FF7A00',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config