import React from 'react';
import Chart from './index'

// const data = require("./data.json")

export default {
  title: 'Echarts/堆叠柱状图',
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
      name: "直接访问",
      stack: '广告',
      data: [
        {
          category: "周一",
          value: 100,
        },
        {
          category: "周二",
          value: 200,
        },
        {
          category: "周三",
          value: 150,
        },
        {
          category: "周四",
          value: 180,
        },
        {
          category: "周五",
          value: 50,
        },
      ],
    },
    {
      name: "邮件营销",
      stack: '广告',
      data: [
        {
          category: "周一",
          value: 66,
        },
        {
          category: "周二",
          value: 500,
        },
        {
          category: "周三",
          value: 88,
        },
        {
          category: "周四",
          value: 66,
        },
        {
          category: "周五",
          value: 100,
        },
      ],
    },
    {
      name: "联盟广告",
      stack: '广告',
      data: [
        {
          category: "周一",
          value: 444,
        },
        {
          category: "周二",
          value: 500,
        },
        {
          category: "周三",
          value: 32,
        },
        {
          category: "周四",
          value: 456,
        },
        {
          category: "周五",
          value: 210,
        },
      ],
    },
    {
      name: "百度",
      stack: '搜索引擎',
      color: "#ff00ff",
      data: [
        {
          category: "周一",
          value: 444,
        },
        {
          category: "周二",
          value: 500,
        },
        {
          category: "周三",
          value: 32,
        },
        {
          category: "周四",
          value: 456,
        },
        {
          category: "周五",
          value: 210,
        },
      ],
    },
    {
      name: "谷歌",
      stack: '搜索引擎',
      data: [
        {
          category: "周一",
          value: 444,
        },
        {
          category: "周二",
          value: 500,
        },
        {
          category: "周三",
          value: 32,
        },
        {
          category: "周四",
          value: 456,
        },
        {
          category: "周五",
          value: 210,
        },
      ],
    },
  ],
  theme: "dark",
};