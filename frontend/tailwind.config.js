/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#F9FAFB',
          card: '#FFFFFF',
          primary: '#2563EB',
          success: '#16A34A',
          danger: '#DC2626',
          text: '#0F172A',
        },
        dark: {
          bg: '#020617',
          card: '#0F172A',
          primary: '#3B82F6',
          success: '#22C55E',
          danger: '#EF4444',
          text: '#E5E7EB',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        flash: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        flash: 'flash 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

