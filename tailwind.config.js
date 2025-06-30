/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NeoSansArabicLight: ['NeoSansArabicLight', 'Arial', 'sans-serif'],
        NeoSansArabicRegular: ['NeoSansArabicRegular', 'Arial', 'sans-serif'],
        NeoSansArabicMedium: ['NeoSansArabicMedium', 'Arial', 'sans-serif'],
        NeoSansArabicBold: ['NeoSansArabicBold', 'Arial', 'sans-serif'],
        NeoSansArabicBlack: ['NeoSansArabicBlack', 'Arial', 'sans-serif'],
        NeoSansArabicUltra: ['NeoSansArabicUltra', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],

};
