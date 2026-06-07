/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
        },
        accent: {
          blue: "#0ea5e9",
          purple: "#a855f7",
          green: "#22c55e",
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        glow: {
          'from': { 'box-shadow': '0 0 5px #6366f1, 0 0 10px #6366f1' },
          'to': { 'box-shadow': '0 0 20px #6366f1, 0 0 30px #6366f1' }
        }
      }
    },
  },
  plugins: [],
}
