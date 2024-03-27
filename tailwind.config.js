/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/home.ejs",
    "./views/About.ejs",
    "./views/404.ejs"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}

