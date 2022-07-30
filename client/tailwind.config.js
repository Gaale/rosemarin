/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'PoiretOne': ['PoiretOne-Regular', 'sans-serif'],
        'oxy-regular': ['Oxygen-Regular', 'sans-serif'],
        'oxy-bold': ['Oxygen-Bold', 'sans-serif'],
        'oxy-light': ['Oxygen-Light', 'sans-serif'],
        'rufina-bold': ['Rufina-Bold', 'sans-serif'],
        'rufina-regular': ['Rufina-Regular', 'sans-serif'],
        'alex-brush': ['AlexBrush-Regular', 'sans-serif'],
      },
      backgroundImage: {
        'top-img': "url('./images/dishes.jpg')",
      },
      gridTemplateColumns: {
        // Простая сетка из 16 столбцов
        '16': 'repeat(16, minmax(0, 1fr))',

        // Сложная конфигурация столбца для конкретного сайта
        'footer': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [require("daisyui")],
}
