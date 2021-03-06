const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  // purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      gray: colors.trueGray,
    },
    extend: {
      gridTemplateRows: {
        hamburger: 'auto 1fr auto auto',
        '1fr-auto': '1fr auto',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      animation: ['hover'],
      translate: ['group-hover'],
      transitionDuration: ['hover'],
      transitionProperty: ['hover'],
      transitionTimingFunction: ['hover'],
    },
  },
  plugins: [],
}
