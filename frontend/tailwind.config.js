/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: "oklch(var(--primary))",
        accent: "oklch(var(--accent))",
        border: "oklch(var(--border))",
        ring: "oklch(var(--ring))",
      },
    },
  },
  plugins: [],
}
