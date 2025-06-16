/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Tell Jest to use ts-jest for .ts files
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Where to look for *.test.ts files
  roots: ['<rootDir>/server/src'],

  // Which file extensions to try
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Transform any .ts file with ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Match any .test.ts file
  testMatch: ['**/*.test.ts'],
};
