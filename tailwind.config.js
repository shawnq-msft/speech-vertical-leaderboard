/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azure: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#0078d4",
          600: "#106ebe",
          700: "#005a9e",
          900: "#003e6b",
        },
      },
    },
  },
  plugins: [],
};
