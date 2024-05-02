// vite.config.js
const { resolve } = require("path");

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        generator: resolve(__dirname, "generator/index.html"),
      },
    },
  },
};
