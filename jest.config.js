/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "weapons/**/*.js",
    "players/**/*.js",
    "!**/*.test.js"
  ],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
