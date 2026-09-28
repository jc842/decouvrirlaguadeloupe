/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e1ede6',
          200: '#c5ddd0',
          300: '#9ec4b1',
          400: '#71a58c',
          500: '#4f876e',
          600: '#3c6c57',
          700: '#2f5545',
          800: '#264438',
          900: '#1e382e',
          950: '#0f1f19',
        },
        earth: {
          50: '#fbf7f4',
          100: '#f5ede6',
          200: '#ebd9cb',
          300: '#dcbea8',
          400: '#ca9b7f',
          500: '#bc7e5f',
          600: '#ae684f',
          700: '#91523f',
          800: '#764336',
          900: '#61392f',
          950: '#341c17',
        },
        base: {
          50: '#FAF9F6',
          100: '#F4F2EC',
          200: '#E7E4DC',
          300: '#D5D0C3',
          400: '#A8A293',
          500: '#787162',
          600: '#575144',
          700: '#443F35',
          800: '#292520',
          900: '#1C1917',
          950: '#0C0A09',
        },
      }
    },
  },
  plugins: [typography],
};
