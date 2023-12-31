import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#FFE429',
        red: '#FF0000',
        cyan: '#5AF5FF',
        black: '#2F2F2F',
        white: '#FFFFFF',
        'dark-gray': '#9E9E9E',
        gray: '#F6F6F6',
        'light-gray': '#F9F9F9',
        blue: '#0038FF',
        orange: '#FF5C00',
        green: '#00CC21',
      },
      lineHeight: {
        '12': '3rem',
      },
      borderWidth: {
        '1': '1px',
      },
      height: {
        '22.5': '5.5625rem',
        '42.5': '10.625rem',
        '122': '30.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xs: '1rem',
        sm: '1.15rem',
        base: '1.25rem',
        xl: '1.45rem',
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
