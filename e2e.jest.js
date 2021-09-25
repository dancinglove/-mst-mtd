module.exports = {
    verbose: true,
    testEnvironment: 'jest-environment-puppeteer', // 这个环境适合走 e2e的测试
    setupFiles: ['./tests/setup.js'],
    preset: 'jest-puppeteer',
    testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx'],
};