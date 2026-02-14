/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ivory: '#FAFAF7',
        ink: '#1A1A2E',
        accent: '#2D5A7B',
        'accent-light': '#3A7CA5',
        muted: '#6B7280',
        border: '#E5E5E0',
        'score-high': '#16A34A',
        'score-mid': '#CA8A04',
        'score-low': '#DC2626',
      },
    },
  },
  plugins: [],
};
