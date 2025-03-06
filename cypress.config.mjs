// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000',
//     specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
//     supportFile: false,
//   },
// });

// cypress.config.mjs
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
