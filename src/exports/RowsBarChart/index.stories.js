import React from "react";
import Chart from "./index";
const conf = require("./declare.json");
const data = require("./data.json");

data.sort((a, b)=>{
  return b.cases - a.cases
})

export default {
  title: "Echarts/条形图",
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

const chartData = data.slice(0, 20).map(v =>{
  return {
    name: v.country,
    data: [
      {
        category: "确诊",
        value: v.cases,
      },
      {
        category: "康复",
        value: v.recovered,
      },
      {
        category: "死亡",
        value: v.deaths,
      },
    ]
  }
})

export const Primary = Template.bind({});
Primary.args = {
  styles: {
    width: "800px",
    height: "600px",
  },
  itemColors: {
    "确诊":"#d4b106",
    "康复":"#5b8c00",
    "死亡":"#a8071a",
  },
  // itemColors: conf.props.itemColors.default,
  data: chartData,
};
