/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#030712',
        'obsidian-deep': '#000000', // True black for depth
        'obsidian-light': '#0f172a',
        'electric-cyan': '#00F0FF', // Slightly warmer cyan
        'electric-cyan-dim': 'rgba(0, 240, 255, 0.7)',
        'electric-cyan-dark': '#00a3cc',
        'lavender-glow': '#E0E7FF',
        'lavender-mute': '#a5b4fc',
        'luxury-gold': '#d4af37',
        'surface': {
          50: 'rgba(255, 255, 255, 0.03)',
          100: 'rgba(255, 255, 255, 0.05)',
          200: 'rgba(255, 255, 255, 0.08)',
          300: 'rgba(255, 255, 255, 0.12)',
          500: 'rgba(255, 255, 255, 0.5)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'aurora': 'aurora 20s linear infinite',
        'blob': 'blob 10s infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '24px',
        xl: '40px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 255, 255, 0.1)',
        'glow': '0 0 30px rgba(0, 255, 255, 0.15)',
        'glow-lg': '0 0 60px rgba(0, 255, 255, 0.2)',
        'glow-xl': '0 0 100px rgba(5, 255, 255, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(0, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #030712 0%, #0a0f1a 25%, #030712 50%, #0f172a 75%, #030712 100%)',
        'aurora': 'linear-gradient(to right, #000000, #130f40, #000000)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        aurora: {
          '0%': { backgroundPosition: '50% 50%, 50% 50%' },
          '100%': { backgroundPosition: '350% 50%, 350% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
