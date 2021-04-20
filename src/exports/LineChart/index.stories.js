import React from 'react';
import Chart from './index'

const conf = require("./declare.json")
const data = require("./data.json")

const chartData = Object.keys(data).map(key => ({name:key, value: data[key]}))

export default {
  title: 'Echarts/折线图',
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: chartData,
  smooth: true,
  theme: "dark",
  itemColor:"#ff0000",
  option: {
    series: [
      {
        showSymbol: false,
      //   areaStyle: {
      //     color:"#ff0000"
      // },
      }
    ]
  }
};