const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: process.env.JEST_ENV === 'dom' ? 'jsdom' : 'node',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).ts?(x)',
    '**/?(*.)+(test|spec).ts?(x)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  roots: ['<rootDir>/src', '<rootDir>/electron', '<rootDir>/tests'],
  moduleNameMapper: {
    '^electron$': '<rootDir>/tests/mocks/electronMock.ts',
  },
};
