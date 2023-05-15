import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     maxWidth:{
      '27':'27%',
      '43':'43%',
     } ,
      fontFamily: {
        sans: ["var(--font-quicksankd)"],
      },
      colors: {
        eclipse: "#3C3B3D",
        manatee: "#8D8C92",
        wild_blue_yonder: "#7A89B8",
        moonstone_blue: "#73A9C2",
      },
    },
  },
  plugins: [],
} satisfies Config;
