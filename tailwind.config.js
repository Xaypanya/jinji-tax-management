/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Lao', 'sans-serif'],
        pops: ['Poppins', 'cursive']
      },
      colors: {
        primary: {
          DEFAULT: '#02044A'
        },
        secondary: {
          DEFAULT: '#25CD89'
        },
        third: {
          DEFAULT: '#4A497C'
        },
        fourth: {
          DEFAULT: '#171a5d'
        }
      }
    }
  },
  plugins: [],
}
