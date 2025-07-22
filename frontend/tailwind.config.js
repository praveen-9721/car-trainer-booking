// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 5s linear infinite',
        fadeUp: 'fadeUp 1.2s ease-out',
        typing: 'typing 6s steps(80, end)',
        blink: 'blink 0.8s step-end infinite',
        sparkle: 'sparkle 3s infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 2px #facc15)' },
          '100%': { filter: 'drop-shadow(0 0 12px #facc15)' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#fff' },
        },
        sparkle: {
          '0%': { left: '-75%' },
          '50%': { left: '100%' },
          '100%': { left: '100%' },
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['rtl'], // ✅ RTL display variant
    },
  },
  plugins: [],
};
