/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a37c6b', // Muted aesthetic brown/gold
          600: '#8c6b5d',
          700: '#70564a',
          800: '#544038',
          900: '#382b25',
        },
        gold: {
          light: '#f9f1e1',
          DEFAULT: '#d4af37',
          dark: '#aa8c2c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Elegant touch for luxury brand
      },
      boxShadow: {
        'glow-primary': '0 4px 14px 0 rgba(163, 124, 107, 0.39)',
        'glow-primary-lg': '0 6px 20px rgba(163, 124, 107, 0.23)',
        'soft-dark': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.08)',
        'badge': '0 2px 10px rgba(0, 0, 0, 0.08)',
        'btn-dark': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
