import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "27": "27%",
        "43": "43%",
      },
      fontFamily: {
        sans: ["var(--font-quicksankd)"],
      },
      colors: {
        dark_jungle_green: "#071E22",
        myrtle_green: "#1D7874",
        wintergreen_dream: "#679289",
        peach_crayola: "#FAC095",
        red_pigment: "#EE2E31",
      },
    },
  },
  plugins: [],
} satisfies Config;
