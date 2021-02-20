import React from 'react';
import TestView from './index'

export default {
  title: 'TEST/testView',
  component: TestView,
};

const Template = (args) => <TestView {...args} />;

export const Primary = Template.bind({});
Primary.args = {};