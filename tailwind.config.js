/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"], // Enables dark mode with a "class" strategy
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Scans files for Tailwind classes

  theme: {
    extend: {
      borderRadius: {
        // Custom border radius
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Theming with ShadCN tokens
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          800: "#1f2937",
          900: "#111827",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        // Add custom shadows for cards, popovers, etc.
        card: "0 4px 8px rgba(0, 0, 0, 0.1)",
        popover: "0 4px 16px rgba(0, 0, 0, 0.2)",
      },
      spacing: {
        // Custom spacing tokens
        18: "4.5rem",
        26: "6.5rem",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
