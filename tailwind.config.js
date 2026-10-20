/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette sampled from the official logo / business card (#F6E3DD background, rose-gold lettering)
        blush: {
          50: "#FCF6F3",
          100: "#F6E3DD", // exact logo background
          200: "#EFD0C7",
          300: "#E3B5A8",
        },
        rosegold: {
          DEFAULT: "#B5785A",
          light: "#D09A7E",
          dark: "#8A5540",
        },
        ink: "#2A2426",
        stone: {
          warm: "#7D6F69",
        },
        terracotta: "#C47E72",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Amiri"', "Georgia", "serif"],
        sans: ['"Jost"', '"Noto Naskh Arabic"', "system-ui", "sans-serif"],
        arabic: ['"Amiri"', '"Noto Naskh Arabic"', "serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        pop: "pop 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
