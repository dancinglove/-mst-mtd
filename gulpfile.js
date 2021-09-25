const gulp = require('gulp'); // 定义执行任务的
const path = require('path'); // 处理路径的
const rimraf = require('rimraf'); // 删除 rm -rf
const ts = require('gulp-typescript'); // 把ts编译成js
const babel = require('gulp-babel'); // 把es6+ 转换成 es5的
const merge2 = require('merge2'); // 合并流 可以把2个流合并成一个流
const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
    noUnusedParameters: true, // 不能有未使用的参数
    noUnusedLocals: true, // 不能有未使用的本地变量
    strictNullChecks: true, // 严格null检查
    target: 'es6', // 编译目标
    jsx: 'preserve', // jsx如何处理preserve 保留不做处理 react变成React.createElement()
    moduleResolution: 'node', // 模块的查找规则 node
    declaration: true, // 生成声明文件 xxx.d.ts
    allowSyntheticDefaultImports: true, // 允许 默认倒入
    ...compilerOptions,
  };
  // bable 的处理方式
  const babelConfig = require('./babel.config');
  // 准备好需要编译文件
  const source = [
    'components/**/*.{js,ts,jsx,tsx}', // glob 文件匹配模式
    '!components/**/*.stories.{js,ts,jsx,tsx}', // ！是排除的意思
    '!components/**/e2e/*',
    '!components/**/unit/*',
  ];

  // 当前根目录下的components 也就是我们MTD目录下的components文件夹
  const base = path.join(process.cwd(), 'components');
  // 获取目录路径
  function getProjectPath(filePath) {
    return path.join(process.cwd(), filePath);
  }
  const libDir = getProjectPath('lib'); // 对应build之后的es5目录
  const esDir = getProjectPath('es'); // 对应build之后的es6的目录
  // gulp.task 定义任务
  gulp.task('compile-with-es', (done) => { // done的意思是回调用任务，也就是异步的任务
    console.log('Compile to es...');
    compile(false).on('finish', done);
  });
  
  gulp.task('compile-with-lib', (done) => {
    console.log('Compile to js...');
    compile().on('finish', done);
  });
  // 这一步的意思是 gulp.parallel 是同步执行['compile-with-es', 'compile-with-lib']两个任务
  gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));
  // 执行编译 gulp 只是编译（转译），不进行打包，会保留文件的结构不会变
  function compile(modules) {
    const targetDir = modules === false ? esDir : libDir;
    // 删除老的内容
    rimraf.sync(targetDir);
    // gulp.src(source) 把文件的匹配模式传禁区
    // 最终的结果是会把我们的ts转成js，并且会返回2个流，一个是js对的流，一个流是类型声明文件x.d.ts
    const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig));
    // 
    const dtsFilesStream = dts.pipe(gulp.dest(targetDir));
    let jsFilesStream = js;
    if (modules) {
      jsFilesStream = js.pipe(babel(babelConfig));
    }
    jsFilesStream = jsFilesStream.pipe(gulp.dest(targetDir));
    return merge2([jsFilesStream, dtsFilesStream]);
  }

