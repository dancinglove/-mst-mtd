### 实现自己的组件库

#### 技术栈
- 框架 react
- 测试 jest + enzyme
- 检查 eslint
- 打包 webpack + gulp（build 样式 gulp更快？） gulp可以只是编译，但是不打包
- 文档 bisheng
- 钩子 husky

#### 源码目录
.husky git 钩子
_site 网站
components 组件
docs
dist webpack 打包生成的文件 dist里面文件是打包好的es5，可以在浏览器中使用
es gulp 打包es6
lib gulp 打包出来的es5
scripts 脚本
site 组件预览项目
tests 测试
typings 类型定义

#### 使用gulp的必要性？ 为了适应不同的应用环境
并且webpack 是打包dist的目录的，bundle方案
gulp编译lib 和 es 保留目录层级，便于按需加载

#### 安装react依赖项
```
yarn add react react-dom
```
#### 安装react的typescript声明
```
yarn add @types/react @types/react-dom -D
```
#### 安装wenpack
```
yarn add webpack webpack-cli webpack-dev-server -D
```
#### 安装eslint
```
yarn add @typescript-eslint/parser eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y eslint-config-airbnb --dev
```
### 安装 prettier
```
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
```
#### 安装husky
```
yarn add husky
```
#### 安装babel
```
yarn add @babel/core @babel/preset-react @babel/preset-env  @babel/runtime @babel/plugin-transform-typescript @babel/plugin-transform-runtime -D
```
#### 安装typescript
```
yarn add typescript @types/node -D
```

#### 安装样式处理相关
```
yarn add mini-css-extract-plugin babel-loader css-loader autoprefixer postcss-loader less-loader less -D
```


#### 问题记录
- 为什么不用ts-loader来处理ts，而是用babel-loader来处理？ 原因：ts-loader比较慢 现在一般都是使用 babel-loader来处理
- .babelrc 和 babel.config.js是什么关系？ 两个都是一样
- 组件库需要做 polyfill 吗？ 看兼容的环境，可以参考我们的 antd的兼容
- 为什么不是用style-loader？ style-loader 一般是开发时使用的，上线和组件库一般是不会使用的。并且这里是被mini-css-extract-plugin替代了
- webpack5 还需要配置cache-loader 吗？ 不再需要了，因为已经内置了
- 导出和导入的时候使用 type 字段的原因是 方便编译，方便treeshaking

#### 搭建storybook
- storybook[https://storybook.js.org/]是一个用于开发UI组件的开源工具，是UI组件的开发环境
- @storybook/react是React的运行环境
- @storybook/addon-essentials是storybook最好插件的合集
```
yarn add @storybook/react   @storybook/addon-essentials --dev
```

##### 搭建一个自己的storybook 而不是使用命令的方式
- 在根目录下建一个 .storybook\main.js 文件
配置文件
```
module.exports = {
    // 如果查找故事 mdx 可以在md文件中使用jsx
    stories: [
        "../components/Introduction.stories.mdx",
        "../components/Install.stories.mdx",
        "../components/Components.stories.mdx",
        "../components/**/*.stories.mdx",
        "../components/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    // 插件
    addons: ['@storybook/addon-essentials'],
};
```

然后配置我们的 Introduction Install Components 等文件
```

```

#### 文档启动命令
```
"scripts": {
  "start": "start-storybook -p 6000",
  "docs-build": "build-storybook"
},
```


#### 单测 jest
```
yarn add jest @types/jest  @wojtekmaj/enzyme-adapter-react-17 puppeteer @types/puppeteer jest-environment-puppeteer  @types/jest-environment-puppeteer jest-puppeteer  jest-image-snapshot @types/jest-image-snapshot --dev
yarn add enzyme  @types/enzyme  --dev
```



#### 编译发布 gulp
```
yarn add rimraf gulp gulp-typescript gulp-babel merge2 --dev
```
添加命令
{
+ "main": "lib/index.js",
+ "module": "es/index.js",
+ "unpkg": "dist/antd.js",
+ "typings": "lib/index.d.ts",
+ "files": [
+   "dist",
+   "es",
+   "lib"
+ ],
  script: {
    "compile": "gulp compile" // yarn compile的时候会执行gulp文件中的compile任务task
  }
}
- npm version patch
- npm publish
- cat ~/.npmrc



初始化ts  tsc --init
```
{
  "compilerOptions": {
    "strictNullChecks": true,
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "jsx": "react",
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "target": "es6",
    "lib": ["dom", "es2017"],
    "skipLibCheck": true,
    "types": ["node"]
  },
  "exclude": ["node_modules", "lib", "es"]
}
```


#### 持续集成
- [Travis CI](https://app.travis-ci.com/) 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器
```
language: node_js # 语言是nodejs
node_js: # 版本号呢 是stable
  - "stable"
cache:  # 缓存目录是node_modules
  directories:
  - node_modules
env:  # 环境变量给的是 CI=true
  - CI=true
install:
  - yarn config set registry https://registry.npm.taobao.org
  - yarn install
script:
  - npm run build-storybook # 编译文档目录
  - npm version patch # 改变版本号
deploy: # 部署
  # 部署 静态网站
  - provider: pages
    skip_cleanup: true
    github_token: $GITHUB_TOKEN
    local_dir: storybook-static
    on:
      branch: master
  # 部署 到npm
  - provider: npm
    email: zhang_renyang@126.com
    api_key: "$NPM_TOKEN"
    skip_cleanup: true
    on:
      branch: master
```



