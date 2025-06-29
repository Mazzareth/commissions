/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(24, 24, 33, 0.6)',
        // Extend palette for glass border/accents (used via Tailwind classes)
        'primary-dark': '#181821',
        'secondary-dark': '#232336',
        'accent-violet': '#8b5cf6',
      },
      boxShadow: {
        glass: "0 4px 32px 0 rgba(0,0,0,0.20)",
      },
      borderColor: {
        glass: "rgba(255,255,255,0.10)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.6s cubic-bezier(0.4,0,0.2,1) both',
        slideUp: 'slideUp 0.7s cubic-bezier(0.4,0,0.2,1) both',
      },
    },
  },
  plugins: [],
};