import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          50: "#E4E7E7",
          100: "#CCD1D1",
          200: "#99A3A3",
          300: "#667070",
          400: "#383D3D",
          500: "#0A0B0B",
          600: "#070808",
          700: "#050505",
          800: "#050505",
          900: "#020303",
          950: "#000000",
        },
        pur: {
          50: "#F8ECF7",
          100: "#F1DAEF",
          200: "#E3B5DF",
          300: "#D793D0",
          400: "#C96EC0",
          500: "#BB49AF",
          600: "#98398F",
          700: "#732B6C",
          800: "#4A1C46",
          900: "#250E23",
          950: "#130711",
        },
        /**color for bg color of header (secondary) + body (main) */
        body: {
          "main-bg": "#0A0B0B",
          "secondary-bg": "#1E2126",
        },
        /** color gradient for button */
        gradient: {
          "main-bg-1": "#e70a5455",
          "main-bg-2": "#0055D155",
          "bg-button-1": "#4682B4",
          "bg-button-2": "#32CD32",
          "bg-button-3": "#C6156655",
          "bg-button-4": "#214ABF55",
          "bg-button-animate-1": "#ee7755",
          "bg-button-animate-2": "#C6156655",
          "bg-button-animate-3": "#214ABF55",
          "bg-button-animate-4": "#23d5ab",
        },
        gray: {
          icon: "#35393F",
          "hover-icon": "#1F2125",
          "hover-border": "#cbd5e1",
        },
      },
      /** Color linegradient for button */
      backgroundImage: ({ theme }) => ({
        "gradient-primary": `linear-gradient(135deg, ${theme(
          "colors.gradient.bg-button-1"
        )}, ${theme("colors.gradient.bg-button-2")})`,
        "gradient-secondary": `linear-gradient(135deg, ${theme(
          "colors.gradient.bg-button-3"
        )}, ${theme("colors.gradient.bg-button-4")})`,
        "gradient-third": `linear-gradient(-45deg, ${theme(
          "colors.gradient.bg-button-animate-1"
        )}, ${theme("colors.gradient.bg-button-animate-2")}, ${theme(
          "colors.gradient.bg-button-animate-3"
        )}, ${theme("colors.gradient.bg-button-animate-4")})`,
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }),
      /** Animate bg change color */
      keyframes: {
        "gradient-animation": {
          "0%": {
            "background-size": "400% 400%",
            "background-position": "0% 50%",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "100% 50%",
          },
          "100%": {
            "background-size": "400% 400%",
            "background-position": "0% 50%",
          },
        },
      },
      /**Animate change color - animate-gradient + name of backgroundtheme */
      animation: {
        gradient: "gradient-animation 22s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
