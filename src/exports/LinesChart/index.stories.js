import React from "react";
import Chart from "./index";
const data = require("./data.json");

export default {
  title: "Echarts/多折线图",
  component: Chart,
};
const cases = {
  name:"新增确诊",
  data: []
}
const deaths = {
  name:"新增死亡",
  data: []
}
const recovered = {
  name:"新增康复",
  data: []
}
const objKeys = Object.keys(data.cases);
objKeys.forEach((key, i)=>{
  if(i > 0){
    cases.data.push({
      category: key,
      value: (data.cases[key] - data.cases[objKeys[i-1]]) / 1000
    });
    deaths.data.push({
      category: key,
      value: (data.deaths[key] - data.deaths[objKeys[i-1]]) / 1000
    });
    recovered.data.push({
      category: key,
      value: (data.recovered[key] - data.recovered[objKeys[i-1]]) / 1000
    })
  }
});

const chartData = [cases, recovered, deaths];


const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles: {
    width: "500px",
    height: "300px",
  },
  data: chartData,
  smooth: true,
  theme: "dark",
};
