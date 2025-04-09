/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#1a1b26',
          text: '#a9b1d6',
          accent: '#7aa2f7',
          secondary: '#414868',
          success: '#9ece6a',
          error: '#f7768e',
          warning: '#e0af68',
          muted: '#565f89',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} 