module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleFileExtensions: ["js", "ts", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
};
