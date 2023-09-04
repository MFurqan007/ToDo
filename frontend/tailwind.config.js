/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'blackrgba': 'rgba(0, 0, 0, 0.10)',
      }
    },
  },
  plugins: [],
}
