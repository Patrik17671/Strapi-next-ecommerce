/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: false,
    colors: {
      'gray': {
        200: '#F7F7F7'
      },
      'blue': {
        500: '#3964B2'
      },
      'white': '#F1F1F1',
      'black': '#222'
    }
  },
  corePlugins: {
    container: false,
},
  plugins: [
    require( 'tailwindcss' ),
    require( 'precss' ),
    require( 'autoprefixer' )
  ],
  
}
