/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: {
          DEFAULT: '#121212',
          dark: '#66AAF9',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#fff',
          }, // light theme colors
        },
        dark: {
          colors: {
            background: '#121212',
          }, // light theme colors
        },
      },
    }),
  ],
};
