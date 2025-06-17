/** @type { import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  verbose: true,

  // --- LINES ADDED FROM YOUR package.json ---

  // Runs our global setup file before any tests are executed.
  // This is essential for connecting to the test database.
  setupFilesAfterEnv: [
    './src/__tests__/config/setup.ts'
  ],

  // Increases the default timeout to prevent tests from failing
  // during long database operations.
  testTimeout: 8000,

  // Helps detect open handles (like unclosed DB connections)
  // that can cause tests to hang.
  detectOpenHandles: true,
};