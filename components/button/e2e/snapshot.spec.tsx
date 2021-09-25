// e2e 端对端测试
import React from "react";
import ReactDOMServer from "react-dom/server";
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import Button from '..';

describe('测试Button快照', () => {
  it('测试快照是否正确', async() => {
    // 打开一个页面
    await jestPuppeteer.resetPage();
    // 打开一个网页
    await page.goto(`file://${process.cwd()}/tests/index.html`);
    // 启动一个html renderToString的意识转换成string
    const html = ReactDOMServer.renderToString(<Button>Button</Button>);
    await page.evaluate(innerHTML => {
        document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);

    // 生成一张快照
    const image = await page.screenshot();
    // 比较新的快照和老的快照是否相同
    expect(image).toMatchSnapshot();
  })
})