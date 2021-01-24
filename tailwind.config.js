module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled'],
      borderColor: ['disabled'],
      margin: ['first'],
    },
  },
  plugins: [],
};
