/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#97ad48', // Cookie themed green for balance or maybe a warm brown?
          800: '#5d3f34', // Dark chocolate
          900: '#3e2a23', // Espresso
        },
        cookie: {
          DEFAULT: '#8b5e34', // Brown
          light: '#bc8a5f',
          dark: '#603808',
          cream: '#fefae0',
        }
      },
      fontFamily: {
        'display': ['Outfit', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
