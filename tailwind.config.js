/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': { 'max': '500px' },  // Use 'max' instead of 'max-width'
      },
    },
  },
  plugins: [],
}
