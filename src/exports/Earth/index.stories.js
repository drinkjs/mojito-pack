import React from 'react';
import Earth from './index'
import covid2019 from "./covid2019.json"

const barData = covid2019.map((v)=>{
  return {
    lat: v.coordinates.latitude,
    lng: v.coordinates.longitude,
    value: v.stats.confirmed,
  }
})

export default {
  title: 'TEST/Earth',
  component: Earth,
};

const Template = (args) => <div style={{width:800,height:600, background:"#123"}}><Earth {...args} /></div>;

export const Primary = Template.bind({});
Primary.args = {
  barData
};