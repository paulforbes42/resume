// https://jestjs.io/docs/configuration

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.jsx',
    '!src/**/*.test.jsx',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      statements: 100,
      functions: 100,
      lines: 100,
    },
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  globals: {
    $dirname: 'dist',
  },
};
