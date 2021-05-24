module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {colors: {
      'medium-sea-green': '#48c774',
    }},},
  
  variants: {
    extend: {},
  },
  plugins: [],
}
