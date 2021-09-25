// babel 配置
module.exports = {
  presets: [
    '@babel/preset-react', // 把es6编译成es5
    [
      '@babel/preset-env',
      {
          modules: 'auto',
          targets: { // 编译的兼用目标
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'], // 最新的2个版本
          },
        },
      ],
    ],
  plugins: [
    [
      '@babel/plugin-transform-typescript', // 支持ts
      {
        isTSX: true,
      },
    ],
    ['@babel/plugin-transform-runtime'], // 提供一些编译的运行时
  ],
};