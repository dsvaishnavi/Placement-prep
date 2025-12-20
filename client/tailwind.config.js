/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand Core */
        primary: '#0B3C8A',        // Main brand blue (headers, icons)
        primarySoft: '#EAF2FF',    // Light blue card backgrounds
        primaryAccent: '#2F6BFF',  // Progress bars, highlights

        /* Neutrals */
        background: '#F6F8FC',    // Page background
        surface: '#FFFFFF',       // Card surface
        border: '#E3E8F2',         // Card borders
        muted: '#6B7280',         // Secondary text

        /* Status */
        success: '#16A34A',
        warning: '#F59E0B',
        info: '#2563EB'
      },
      keyframes: {
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '50%': {
            transform: 'translate3d(0, -20px, 0)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        dataFlow: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '100%': {
            backgroundPosition: '100% 50%',
          },
        },
        'spin-slow': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        pulse: 'pulse 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'data-flow': 'dataFlow 4s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}