/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',
        'primary-hover': '#4f46e5',
        'dark-bg': '#111827',
        'dark-card': '#1f2937',
      },
    },
  },
  plugins: [],
}