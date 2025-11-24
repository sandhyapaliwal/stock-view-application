/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#0f172a',  // Slate-900: dark professional background
        'surface': '#1e293b',    // Slate-800: for cards/containers
        'primary': '#38bdf8',    // Sky-400: for buttons and highlights
        'primary-dark': '#0284c7',
        'text-main': '#f1f5f9',  // Light text for dark background
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
        hover: '0 6px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
