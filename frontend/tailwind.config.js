/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rcb-primary': '#CF2F2F',
        'mi-primary': '#004BA0',
        'csk-primary': '#F7A35C',
      }
    },
  },
  plugins: [],
}