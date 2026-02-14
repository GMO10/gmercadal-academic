/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAF9F6',
        navy: '#1B2A4A',
        'navy-light': '#2C4066',
        gold: '#8B6914',
        'gold-dark': '#6B5010',
        'gold-light': '#B8941E',
        slate: '#64748B',
        border: '#E2E0DB',
        'score-high': '#16A34A',
        'score-mid': '#CA8A04',
        'score-low': '#DC2626',
      },
    },
  },
  plugins: [],
};
