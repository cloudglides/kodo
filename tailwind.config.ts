import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#131513',
        secondary: '#0b0d0b',
        'text-muted': '#9CA49C',
        coral: {
          50: '#fef6f4',
          100: '#fde9e4',
          200: '#fbd6cd',
          300: '#f8baab',
          400: '#f3937f',
          500: '#DE7356',
          600: '#d8613f',
          700: '#b64e2f',
          800: '#95442a',
          900: '#7a3c28',
          950: '#421c11',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
