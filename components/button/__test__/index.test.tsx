import React from 'react';
import { mount } from 'enzyme';
import Button from '..';

describe('测试Button组件', () => {
  it('测试Button组件是否能够正确的挂在', () => {
    expect(() => mount(<Button>Button</Button>)).not.toThrow();
  });
})