/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'walmart-blue': '#0053E2',
        'walmart-dark-blue': '#001E60',
        'walmart-yellow': '#FFC220',
        'walmart-text': '#2E2F32',
        'walmart-subtle': '#74767C',
        'walmart-border': '#909196',
        'walmart-light-blue': '#E9F1FE',
        'walmart-light-bg': '#E6F1FC',
        'onepay-blue': '#33BBFF',
        'onepay-dark': '#1E1E1E',
      },
      fontFamily: {
        'sans': ['Everyday Sans UI', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
        'bogle': ['Bogle', '-apple-system', 'Roboto', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
      },
      borderRadius: {
        'lg': '8px',
      },
      maxWidth: {
        'mobile': '375px',
      },
    },
  },
  plugins: [],
}
