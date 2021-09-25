const React = require('react');
const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17'); // 配置的识别器，必须要有的， 加强Enzyme的功能
Enzyme.configure({
  adapter: new Adapter()
});