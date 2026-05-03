import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
