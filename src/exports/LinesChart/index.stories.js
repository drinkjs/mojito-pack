import React from 'react';
import Chart from './index'

const conf = require("./declare.json")

export default {
  title: 'Echarts/多折线图',
  component: Chart,
};

const Template = (args) => <div style={{width:"100%",height:"100%", background:"#000"}}> <Chart {...args} /></div>;

export const Primary = Template.bind({});
Primary.args = {
  styles:{
    width:"500px",
    height:"300px"
  },
  data: conf.props.data.default
};