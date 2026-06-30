import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0E14",
          secondary: "#111827",
          card: "#151C28",
          elevated: "#1A2233",
          hover: "#1F2B3D",
        },
        accent: {
          green: "#00E599",
          greenDim: "#00E59940",
          blue: "#3B82F6",
          amber: "#F59E0B",
          red: "#EF4444",
          purple: "#8B5CF6",
          cyan: "#06B6D4",
        },
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          tertiary: "#64748B",
          muted: "#475569",
        },
        border: {
          subtle: "#1E293B",
          DEFAULT: "#2D3B4F",
          focus: "#00E59960",
        },
        // Plantiverse brand palette (from official identity guidelines)
        brand: {
          dark:   "#536a38",
          mid:    "#859276",
          light:  "#d4e4c2",
          yellow: "#f1b900",
          green:  "#719241",
          blue:   "#0079b7",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Montserrat", "Arial", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", "0.875rem"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 229, 153, 0.15)",
        "glow-sm": "0 0 12px rgba(0, 229, 153, 0.1)",
        card: "0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)",
        elevated: "0 4px 24px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
