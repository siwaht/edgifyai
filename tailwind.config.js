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
        'obsidian-light': '#0a0f1a',
        'electric-cyan': '#00FFFF',
        'electric-cyan-dark': '#00d4ff',
        'lavender-glow': '#E6E6FA',
        'purple-glow': '#7c3aed',
        'surface': {
          50: 'rgba(255, 255, 255, 0.02)',
          100: 'rgba(255, 255, 255, 0.04)',
          200: 'rgba(255, 255, 255, 0.06)',
          300: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
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
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 255, 255, 0.1)',
        'glow': '0 0 30px rgba(0, 255, 255, 0.15)',
        'glow-lg': '0 0 60px rgba(0, 255, 255, 0.2)',
        'glow-xl': '0 0 100px rgba(0, 255, 255, 0.25)',
        'inner-glow': 'inset 0 0 30px rgba(0, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #030712 0%, #0a0f1a 25%, #030712 50%, #0f172a 75%, #030712 100%)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
