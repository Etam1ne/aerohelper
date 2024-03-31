import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#2474ee',
        'main-gray': '#f5f5f5',
        'main-darkgray': '#989fa6',
        'main-white': '#ffffff',
        'main-darkblue': '#1e5cbe',
      },
    },
  },
  plugins: [],
};
export default config;
