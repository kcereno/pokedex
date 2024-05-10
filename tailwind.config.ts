import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        iphone: '431px',
      },
    },
  },
  plugins: [],
} satisfies Config;
