/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        wheat: "#E8A33D",
        clay: "#C1502E",
        soil: "#3D2B1F",
        leaf: "#5B8C51",
        cream: "#FBF6EE",
        ink: "#2B2118",
        muted: "#6B5B4D",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(61,43,31,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
