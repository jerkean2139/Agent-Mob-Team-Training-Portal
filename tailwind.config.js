/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6A6A4B',
        secondary: '#3A3A3A',
        accent: '#FFFFD5',
      },
    },
  },
  plugins: [],
};