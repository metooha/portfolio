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
        'walmart-blue-100': '#0053E2',
        'walmart-warning': '#FFC220',
        'walmart-green': '#2A8703',
        'walmart-text': '#2E2F32',
        'walmart-text-subtle': '#74767C',
        'walmart-text-inverse': '#FFFFFF',
        'walmart-bg': '#FFFFFF',
        'walmart-bg-subtle': '#F8F8F8',
        'walmart-border': '#BABBBE',
        'walmart-border-activated': '#0053E2',
        'walmart-divider': '#E3E4E5',
      },
      fontFamily: {
        'everyday-sans': ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'bogle': ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '16px' }],
        'body-small': ['14px', { lineHeight: '20px' }],
        'body-medium': ['16px', { lineHeight: '24px' }],
        'heading-small': ['18px', { lineHeight: '24px', fontWeight: '700' }],
      },
      borderRadius: {
        'walmart': '4px',
        'walmart-lg': '8px',
        'walmart-round': '1000px',
      },
      boxShadow: {
        'walmart': '0 -1px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 2px 1px rgba(0, 0, 0, 0.15)',
        'walmart-button': '0 1px 2px 0 rgba(0, 0, 0, 0.15), 0 -1px 2px 0 rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}
