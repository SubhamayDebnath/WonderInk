/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily:{
        'Logo': ['Kalam', 'cursive'],
        'Inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}