// vite.config.js
const { resolve } = require("path");

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        secondary: resolve(__dirname, "mondrain/index.html"),
      },
    },
  },
};
