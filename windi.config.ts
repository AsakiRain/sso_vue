import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "global-light": "url('/img/back.jpeg')",
      },
      backgroundColor: {
        light: "rgba(255, 255, 255, 1)",
        dark: "rgba(23, 23, 26, 1)",
        "dark-1": "rgba(35, 35, 36, 1)",
        "dark-2": "rgba(42, 42, 43, 1)",
        "dark-3": "rgba(49, 49, 50, 1)",
        "dark-pop": "rgba(55, 55, 57, 1)",
        hover: "rgba(229, 231, 235, 1)",
        "dark-hover": "rgba(52, 52, 53, 1)",
      },
      textColor: {
        title: "rgba(30, 33, 41, 1)",
        passage: "rgba(89, 89, 105, 1)",
        subtext: "rgba(135, 144, 156, 1)",
        disable: "rgba(202, 205, 212, 1)",
        "dark-title": "rgba(255, 255, 255, 0.9)",
        "dark-passage": "rgba(255, 255, 255, 0.7)",
        "dark-subtext": "rgba(255, 255, 255, 0.5)",
        "dark-disable": "rgba(255, 255, 255, 0.3)",
        link: "rgba(69, 84, 255, 1)",
      },
      borderColor: {
        light: "rgba(229, 230, 235, 1)",
        dark: "rgba(51, 51, 53, 1)",
      },
    },
  },
  shortcuts: {
    "rain-link":
      "cursor-pointer text-black no-underline transition-colors hover:(text-link bg-hover) text-title dark:(text-dark-title) dark:hover:(text-link bg-dark-hover)",
    "rian-inline-link": "py-0 px-4",
    "rain-btn-link": "h-8 leading-8 rounded",
    "rain-block-link": "px-4 py-3",
  },
});
