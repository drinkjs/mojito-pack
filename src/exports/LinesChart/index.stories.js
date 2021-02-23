import React from 'react';
import Chart from './index'

const data = require("./data.json")

export default {
  title: 'Echarts/多折线图',
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles: {
    width: "500px",
    height: "300px",
  },
  data: [
    {
      type: "新增",
      value: [10, 11, 13, 11, 12, 12, 9],
      color: "#FF0000",
    },
    {
      type: "死亡",
      value: [1, 2, 2, 5, 3, 2, 60],
      color: "#510000",
    },
    {
      type: "康复",
      value: [100, 25, 20, 50, 3, 28, 60],
      color: "#ffc0c0",
    },
  ],
  xAxisData: ["2/15", "2/16", "2/17", "2/18", "2/19", "2/20", "2/21"],
};