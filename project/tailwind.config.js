/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'omnitrix-green': {
          100: '#d0ffca',
          200: '#a1ff95',
          300: '#72ff60',
          400: '#43f52b',
          500: '#14db00',
          600: '#10b700',
          700: '#0c9300',
          800: '#086f00',
          900: '#044b00',
        },
        'omnitrix-black': {
          100: '#d1d1d1',
          200: '#a3a3a3',
          300: '#747474',
          400: '#464646',
          500: '#181818',
          600: '#131313',
          700: '#0e0e0e',
          800: '#0a0a0a',
          900: '#050505',
        },
        'omnitrix-gray': {
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c2c2c2',
          400: '#ababab',
          500: '#9b9b9b',
          600: '#6e6e6e',
          700: '#474747',
          800: '#2b2b2b',
          900: '#0f0f0f',
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s infinite',
        'rotate-snap': 'rotate-snap 0.6s ease-out',
        'diamond-transform': 'diamond-transform 0.5s forwards',
        'hourglass-transform': 'hourglass-transform 0.5s forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px #14db00)' },
          '50%': { filter: 'drop-shadow(0 0 15px #14db00)' },
        },
        'rotate-snap': {
          '0%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(20deg)' },
          '60%': { transform: 'rotate(-10deg)' },
          '80%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'diamond-transform': {
          '0%': { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
          '100%': { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
        },
        'hourglass-transform': {
          '0%': { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
          '100%': { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
        },
      },
      fontFamily: {
        'ben10': ['Arial', 'sans-serif'],
      },
      boxShadow: {
        'omnitrix-glow': '0 0 20px rgba(20, 219, 0, 0.7)',
        'omnitrix-inner': 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
};