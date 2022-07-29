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
        'rufina-regular': ['Rufina-Regular', 'sans-serif']
      },
    },
  },
  plugins: [require("daisyui")],
}
