/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        // 'dark-gary-bg': '#374151',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
