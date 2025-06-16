/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF1744',
        secondary: '#1E88E5',
        accent: '#FFEB3B',
        surface: {
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#b4b4b4',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#2a2a2a',
          900: '#121212'
        }
      },
      fontFamily: {
        display: ['Bungee', 'cursive'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'speed-lines': 'speed-lines 0.1s linear infinite',
        'engine-vibrate': 'engine-vibrate 0.05s linear infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate'
      },
      keyframes: {
        'speed-lines': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-20px)' }
        },
        'engine-vibrate': {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(1px, 0)' },
          '50%': { transform: 'translate(0, 1px)' },
          '75%': { transform: 'translate(-1px, 0)' },
          '100%': { transform: 'translate(0, -1px)' }
        },
        'neon-pulse': {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' }
        }
      }
    },
  },
  plugins: [],
}