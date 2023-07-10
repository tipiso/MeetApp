/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      grayBg: "url('../images/GrayBG.png')",
      headerGirl: "url('../images/HappyGirl.png')",
      pinkHeaderFigure: "url('../images/PinkHeaderFigure.png')",
      blueHeaderFigure: "url('../images/BlueHeaderFigure.png')",
      signUpImg: "url('../images/SignUpImg.png')",
    },
    colors: {
      gray50: '#F9F9F9',
      gray100: '#666666',
      gray150: '#333333',
      pink: '#FFB6C1',
      blue: '#ADD8E6',
    },
    fontFamily: {
      sans: ['Poppins', 'Arial', 'sans-serif'],
    },
    screens: {
      xl: '1440px',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
};
