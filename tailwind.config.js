/* eslint-disable no-undef */
import flowbitePlugin from "flowbite/plugin";
import prelinePlugin from "preline/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
      },
    },
  },
  plugins: [flowbitePlugin, prelinePlugin],
};
