import React from 'react';
import Chart from './index'
const conf = require("./declare.json")
const data = require("./data.json");

data.sort((a, b)=>{
  return b.cases - a.cases
})

const formatData = data.map(v =>{
  return {name:v.country, value:v.cases}
})

export default {
  title: 'Echarts/环形图',
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles: {
    width: "500px",
    height: "300px",
  },
  data: formatData,
  option: {
    color: [
      "#290000",
      "#510000",
      "#900000",
      "#c80200",
      "#ee7070",
      "#FF0000",
      "#ffc0c0",
      "#ffdfe0",
      "#cc8020"
    ],
  },
};