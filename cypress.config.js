const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // your dev URL
    specPattern: "cypress/e2e/**/*.spec.js", // look here for test files
    supportFile: "cypress/support/e2e.js",
  },
});