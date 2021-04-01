import React from "react";
import Chart from "./index";

export default {
  title: "Echarts/多折线图",
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
      name: "新增",
      data: [
        {
          category: "2/15",
          value: 22,
        },
        {
          category: "2/16",
          value: 50,
        },
        {
          category: "2/17",
          value: 100,
        },
        {
          category: "2/18",
          value: 120,
        },
        {
          category: "2/19",
          value: 67,
        },
        {
          category: "2/20",
          value: 55,
        },
      ],
      color: "#FF0000",
    },
    {
      name: "死亡",
      data: [
        {
          category: "2/15",
          value: 200,
        },
        {
          category: "2/16",
          value: 121,
        },
        {
          category: "2/17",
          value: 121,
        },
        {
          category: "2/18",
          value: 222,
        },
        {
          category: "2/19",
          value: 222,
        },
        {
          category: "2/20",
          value: 1111,
        },
      ],
    },
    {
      name: "康复",
      data: [
        {
          category: "2/15",
          value: 11,
        },
        {
          category: "2/16",
          value: 42,
        },
        {
          category: "2/17",
          value: 140,
        },
        {
          category: "2/18",
          value: 200,
        },
        {
          category: "2/19",
          value: 66,
        },
        {
          category: "2/20",
          value: 57,
        },
      ],
    },
  ],
  smooth: true,
  theme: "dark",
};
