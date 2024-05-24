/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {

      colors:{
        mainGrey:'#ABB3C4',
        mainGreen:'#17A06E',
        lightGreen:'#80C4AB',
        darkGreen:'#10744F',
        mainRed:'#A01749'
      }
    },
  },
  plugins: [],
}