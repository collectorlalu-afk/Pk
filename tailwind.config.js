/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        card: "#0a0a0a",
        primary: {
          DEFAULT: "#ffffff",
          hover: "#e5e5e5",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#737373",
          foreground: "#a3a3a3",
        },
        border: "#262626",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { 'box-shadow': '0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.05)' },
          'to': { 'box-shadow': '0 0 15px rgba(255, 255, 255, 0.2), 0 0 25px rgba(255, 255, 255, 0.1)' }
        }
      }
    },
  },
  plugins: [],
}
