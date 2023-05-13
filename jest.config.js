module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/test/Unit/Calculator/**/*.spec.ts'],
      // additional configuration specific to unit tests...
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/test/Integration/Calculator/**/*.spec.ts'],
      // additional configuration specific to integration tests...
    },
  ],
};
