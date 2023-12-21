/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/*.{js,jsx}',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rojo4: '#301210',
        rojo3: '#421115',
        rojo2: '#56131C',
        rojo1: '#CE676E',
        blanco1: 'C6C6C6',
        gris1: '#706F6D',
        gris2: '#292824',
        gris3: '#171614',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

