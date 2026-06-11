/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#FDF7F4",
        cocoa: "#502310",
        clay: "#904935",
        biscuit: "#EACAB3",
        mint: "#10B981",
        amber: "#F59E0B",
        danger: "#EF4444"
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: ["Nunito", "Aptos", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        card: "0 14px 36px rgba(80, 35, 16, 0.10)",
        button: "0 14px 24px rgba(144, 73, 53, 0.22)"
      }
    }
  },
  plugins: []
};
