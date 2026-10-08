/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        hero: "#6b8aa5",
        ink: "#101418",
        cream: "#f4f1ea"
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"]
      }
    }
  },
  plugins: []
};
