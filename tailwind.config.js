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
        darkGreen:'#10744F',
      }
    },
  },
  plugins: [],
}