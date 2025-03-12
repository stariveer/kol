/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\.ts$': ['ts-jest', {
      useESM: true
    }]
  },
  testTimeout: 10000 // 设置全局测试超时时间为 10 秒
}