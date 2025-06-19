/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        vw: '0.9vw',
        "10xl": '10rem'
      },
      // Haz que el z index agregar 9999
      zIndex: {
        '9999': '9999',
      },
      height:{
        "1/10": '10%',
        "12/100": '12%',
        "2/10": '20%',
        "3/10": '30%',
        "4/10": '40%',
        "5/10": '50%',
        "6/10": '60%',
        "7/10": '70%',
        "8/10": '80%',
        "9/10": '90%',
        "95/100": '95%',
      },
      width:{
        "1/10": '10%',
        "12/100": '12%',
        "2/10": '20%',
        "3/10": '30%',
        "4/10": '40%',
        "42/100": '42%',
        "5/10": '50%',
        "6/10": '60%',
        "7/10": '70%',
        "8/10": '80%',
        "9/10": '90%',
        "95/100": '95%',
      },
      screens: {
        '3xl': '2040px',
      }
    },
    darkMode: "class",
    plugins: [],
  },
}