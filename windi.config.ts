import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "global-light": "url('/img/back.jpeg')",
      },
    },
  },
  shortcuts: {
    "rain-link":
      "cursor-pointer text-black no-underline transition-colors hover:(text-blue-600 bg-gray-200)",
    "rian-inline-link": "py-0 px-4",
    "rain-btn-link": "h-8 leading-8 rounded",
    "rain-block-link": "px-4 py-3",
  },
});
