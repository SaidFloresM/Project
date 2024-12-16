/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.{js,css}",
    "./src/**/*.{js,css}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4e54c8',
        secondary: '#8f94fb'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}