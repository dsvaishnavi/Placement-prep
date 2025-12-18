/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#0f2b63',
          'dark': '#0a1f4a',
          'light': '#1f4b99',
        },
      },
    },
  },
  plugins: [],
}

