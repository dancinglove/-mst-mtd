const path = require('path');
// 提取css文件到单独的文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 当前命令所在的目录
const cwd = process.cwd();
module.exports = {
  mode: 'development', // 开发模式
  devtool: false, // 关闭生成 sourcemap
  entry: {
    mtd: './index.js',
  },
  output: {
    path: path.resolve('dist'), // 输出到dist目录
    filename: '[name].js', // 打包后的文件名 smi
    library: 'mtd', // 打包后库的名字
    libraryTarget: 'umd', // 打包后的模块的格式 支持 umd amd cmd commonjs commonjs2 window 都能使用
  },
  externals: { // 组件库其实是不需要 打包我们的react和react-dom进去的
    react: { // 外部依赖
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 指定我们的扩展名
    // alias: {
    //   antdesign: cwd,
    // },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 把这些css收集起来，后面通过插件写入到单独的mtd.css里面去
          {
            loader: 'css-loader', // 处理@import和url
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader', // 添加前缀
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
        ],
      },
      // 多的的环节
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
      {// 在webpack5里面 file-loader 和 url-loader 已经废弃了
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset', // 静态文件已经不需要配置了loader了，内置了，
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};