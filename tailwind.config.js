/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
        aspectRatio: {
            '16/9': [16, 9],
        },
    },
  },
  plugins: [],
}
