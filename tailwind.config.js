/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        gujarati: ['Shruti', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
