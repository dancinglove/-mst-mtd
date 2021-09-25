module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false', // 是否无头， 意思是否弹出index页面
  },
  browserContext: 'default',
};