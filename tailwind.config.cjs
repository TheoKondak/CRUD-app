const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
        secondary: colors.teal,
        tertiary: colors.violet,
        white: '#ffffff',
        black: '#000000',
        danger: colors.red,
        success: colors.green,
        slate: colors.slate,
      },
      fontSize: {
        xs: '14px',
        xxs: '13px',
        xxxs: '12px',
      },
      fontFamily: {
        'roboto-condensed': ['"Roboto Condensed"', 'cursive'],
      },
    },
  },
  plugins: [],
};
