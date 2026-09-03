/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07080B',
          900: '#0E0F14',
          850: '#12141B',
          800: '#161822',
          700: '#1D212E',
          600: '#282D3E',
          500: '#434A62',
          400: '#757E9A',
          300: '#A4ADC6',
          200: '#D5DCEB',
          100: '#F1F4F9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        mono: ['monospace'],
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(180deg, rgba(26, 29, 40, 0.6) 0%, rgba(18, 20, 28, 0.8) 100%)',
        'metallic-banner': 'linear-gradient(105deg, #181B26 0%, #2A2F40 40%, #1A1D28 70%, #2E3448 100%)',
      },
    },
  },
  plugins: [],
}
