// tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gujarati: ['Shruti', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        en: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
