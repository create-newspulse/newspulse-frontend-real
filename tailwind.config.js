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
      colors: {
        'royal-blue': {
          DEFAULT: '#4169E1',
          light: '#87CEEB',
        },
        'dark-gray': '#333333',
        'light-gray': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
