const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      gray: colors.trueGray,
    },
    extend: {
      gridTemplateRows: {
        hamburger: 'auto 1fr auto',
        '1fr-auto': '1fr auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
