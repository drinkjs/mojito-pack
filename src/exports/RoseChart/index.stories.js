import React from 'react';
import PieChart from './index'

const conf = require("./declare.json")
const data = require("./data.json")

const chartData = data.map(v => ({name:v.state, value: v.cases}))

export default {
  title: 'Echarts/南丁格尔玫瑰图',
  component: PieChart,
};

const Template = (args) => <PieChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: chartData,
  theme: "dark",
};