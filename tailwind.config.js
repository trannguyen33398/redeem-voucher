/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EEF1FB',
        brand: '#2525F6',
        playful: '#AFFA1F',
        calm: '#F2F50F',
        peaceful: '#D9E2EC',
        skyblue: '#B8C0FF',
        confident: '#EEBDFF',
        smooth: '#0D1942',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
