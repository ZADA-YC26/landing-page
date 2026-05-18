/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'near-black': '#05030A',
        's1': '#0F0C1A',
        's2': '#1A1628',
        's3': '#252035',
        'muted': '#6B6680',
        'subtle': '#A09BBF',
        'neon-cyan': '#00E5FF',
        'electric-violet': '#9D00FF',
        'acid-lime': '#CCFF00',
        'sem-success': '#00E676',
        'sem-warning': '#FFEA00',
        'sem-danger': '#FF1744',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'card-glow-lime': 'linear-gradient(135deg, rgba(204,255,0,0.08) 0%, rgba(204,255,0,0.02) 100%)',
        'card-glow-cyan': 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(0,229,255,0.02) 100%)',
        'card-glow-violet': 'linear-gradient(135deg, rgba(157,0,255,0.1) 0%, rgba(157,0,255,0.02) 100%)',
      },
      fontWeight: {
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'blob': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'scale(1)' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', transform: 'scale(1.08)' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 10s ease-in-out infinite',
        'ticker': 'ticker 25s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
    },
  },
  plugins: [],
}

