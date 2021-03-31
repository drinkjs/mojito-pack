import React from 'react';
import BarChart from './index'
const conf = require("./declare.json")
const data = require("./data.json");

const top10Country = ["China", "USA", "UK", "Canada", "Japan", "South Africa", "Australia", "Brazil", "Algeria"];

let formatData = data.map(v =>{
  const timelineKeys = Object.keys(v.timeline);
  return {name: v.country, value: v.timeline[timelineKeys[timelineKeys.length - 1]]}
});

formatData.sort((a, b)=>{
  return b.value - a.value;
});

formatData = formatData.slice(0, 10);

export default {
  title: 'Echarts/柱状图',
  component: BarChart,
};

const Template = (args) => <BarChart {...args} styles={{width:"500px",height:"500px"}} />;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: formatData,
};