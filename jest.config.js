module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
