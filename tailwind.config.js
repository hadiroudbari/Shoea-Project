/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: '#e9e9e9',
        tag: '#343a40',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
