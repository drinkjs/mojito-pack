import React from 'react';
import Image from './index'

export default {
  title: 'Test/Image',
  component: Image,
};

const Template = (args) => <Image {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src:"",
};