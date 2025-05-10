/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        english: ['Inter', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
        gujarati: ['Noto Sans Gujarati', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
