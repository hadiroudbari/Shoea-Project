/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: '#e9e9e9',
        search: '#828282',
        tag: '#343a40',
        sneaker_1: '#607d8a',
        sneaker_2: '#9d28ac',
        sneaker_3: '#7a5448',
        sneaker_4: '#1a96f0',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
