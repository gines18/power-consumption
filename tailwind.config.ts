import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#E4E1E4', // Add your custom color here
        'custom-green': '#3D5D6D'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    flowbite.plugin()
  ],
};
export default config;
