/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F8F7F4',
        navy: '#0F1D35',
        'navy-mid': '#1B2A4A',
        'navy-light': '#263B5E',
        gold: '#C9A84C',
        'gold-dark': '#A8892E',
        'gold-light': '#E4CA6A',
        slate: '#94A3B8',
        border: '#E2E0DB',
        'border-light': '#E2E0DB',
        'score-high': '#16A34A',
        'score-mid': '#CA8A04',
        'score-low': '#DC2626',
      },
    },
  },
  plugins: [],
};
