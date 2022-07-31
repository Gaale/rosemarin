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
        'top-img2': "url('./images/orange.jpg')",
        'top-img3': "url('./images/rosemary.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}
