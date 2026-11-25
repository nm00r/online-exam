/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#155DFC',
        'primary-dark': '#1047C8',
        heading: '#1F2937',
        muted: '#374151',
        subtext: '#6B7280',
        border: '#E5E7EB',
        error: '#DC2626',
        'panel-from': '#F5F9FF',
        'panel-to': '#C6E0FF',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
