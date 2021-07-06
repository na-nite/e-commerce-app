module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {


      backgroundImage: theme => ({
        'auth': "url('home.png')",
        }),
      colors: { 'medium-sea-green': '#48c774', }
    
    },},
  
  variants: {
    extend: {},
  },
  plugins: [],
}
