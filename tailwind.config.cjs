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
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars = typeof value === 'string' ? { [`--color${colorGroup}-${colorKey}`]: value } : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
