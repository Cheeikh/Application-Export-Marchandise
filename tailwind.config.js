/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '10p': '10%', // left: 10%
        '16p': '16%', // top: 16%
        '53vw': '53vw', // width: 53vw
      },
    },
  },
  plugins: [],
}



