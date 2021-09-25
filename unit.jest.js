module.exports = {
    verbose: true, // 显示日志
    testEnvironment: 'jsdom', // 运行 测试环境 是一个jsdom
    setupFiles: ['./tests/setup.js'], // 测试之前先走一下初始化文件
    testMatch: ['**/__test__/**/*.(spec|test).(js|ts|jsx|tsx)'], // 文件匹配模式 会去找任何unit文件下的 含有spec或者test的文件
    collectCoverage: true, // 收集覆盖率
    collectCoverageFrom: [
      'components/**/*.(js|ts|jsx|tsx)',
      '!components/**/*.stories.(js|ts|jsx|tsx)',
      '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
    ],
  };