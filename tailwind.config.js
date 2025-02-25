/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], 
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blinkCaret: {
          '0%, 100%': {
            borderColor: 'transparent',
          },
          '50%': {
            borderColor: '#ff914d',
          },
        },
      },
      animation: {
        typing: 'typing 4s infinite alternate, blinkCaret .7s step-end infinite',
      },
    },
  },
  plugins: [
 
  ],
 
  
}


