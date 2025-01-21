module.exports = {
  mode: 'jit',
  purge: ['./src//**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#080AEF',
      primaryHover: '#0507A7',
      secondary: '#8A07BD',
      secondaryHover: '#600484',
      white: '#FFFFFF',
      back: '#F3F3F0',
      black: '#000000',
      // rgba(0, 0, 0, 0.12) ->color is black and opacity is 0.12
    },
    extend: {},
    screens: {
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
