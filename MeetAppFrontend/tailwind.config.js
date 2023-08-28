/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Arial', 'sans-serif'],
    },
    screens: {
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        grayBg: "url('../images/GrayBG.png')",
        headerGirl: "url('../images/HappyGirl.png')",
        signInImg: "url('../images/SignInImg.png')",
        registerImg: "url('../images/RegisterImg.png')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
    base: true,
  },
};
