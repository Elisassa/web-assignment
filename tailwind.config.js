/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/home.html",
    "./views/About.html",
    "./views/404.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}

