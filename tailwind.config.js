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
        'gold':       '#d4af37',
        'gold-light': '#e8cc6a',
        'dark-wood':  '#1a1512',
        'dark-2':     '#221c17',
        'dark-3':     '#2a221b',
        'card-bg':    '#14110e',
        'footer-bg':  '#0d0a07',
        'cream':      '#f5f0e6',
        'leather':    '#6b4423',
      },
      fontFamily: {
        main:    ['Montserrat', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      letterSpacing: {
        'luxury': '0.25em',
        'widest2': '0.35em',
      },
    },
  },
  plugins: [],
};
