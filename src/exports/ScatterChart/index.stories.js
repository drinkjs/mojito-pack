import React from 'react';
import Chart from './index'

const conf = require("./declare.json")

export default {
  title: 'Echarts/散点图',
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: conf.props.data.default,
  itemSize:30,
  itemColor:"#FF00FF",
};