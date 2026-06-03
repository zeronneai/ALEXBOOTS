/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './constants.ts',
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#d4af37',
        'accent-gold': '#d4af37',
        'dark-wood': '#0f0c08',
        'card-bg': '#14110e',
        'text-light': '#f0f0f0',
      },
      fontFamily: {
        main: ['Montserrat', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
};
