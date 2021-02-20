import React from 'react';
import PieChart from './index'

const conf = require("./declare.json")

export default {
  title: 'Echarts/饼图',
  component: PieChart,
};

const Template = (args) => <PieChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: conf.props.data.default
};