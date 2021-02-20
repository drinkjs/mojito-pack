import React from 'react';
import BarChart from './index'
const conf = require("./declare.json")
export default {
  title: 'Echarts/柱状图',
  component: BarChart,
};

const Template = (args) => <BarChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: conf.props.data.default
};