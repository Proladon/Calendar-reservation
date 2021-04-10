const {colors} = require('tailwindcss/defaultTheme')
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      ...colors,
      skyblue:{
        100: '#AAD8EA'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
