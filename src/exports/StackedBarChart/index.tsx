import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  data: { category: string; value: number }[];
  stack: string;
  color?: string;
}

interface StackedBarChartProps extends ChartBoxProps {
  data: ChartData[];
}

export default (props: StackedBarChartProps) => {
  const { option, data, theme, ...restProps } = props;
  const _data = data || [];

  const legend: string[] = [];
  const series: any = [];
  let xAxisData: string[] = [];

  // 图例
  _data.forEach((v, index) => {
    legend.push(v.name);
    series.push({
      name: v.name,
      type: "bar",
      data: v.data.map((v2) => v2.value),
      stack: v.stack,
      itemStyle: {
        color: v.color,
      },
    });
    if (index === 0) {
      xAxisData = v.data.map((v2) => v2.category);
    }
  });

  const opt = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: legend,
    },
    // grid: {
    //   left: "3%",
    //   right: "4%",
    //   bottom: "3%",
    //   containLabel: true,
    // },
    xAxis: [
      {
        type: "category",
        data: xAxisData,
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
        },
      },
    ],
    // series: [
    // {
    //   name: "直接访问",
    //   type: "bar",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [320, 332, 301, 334, 390, 330, 320],
    // },
    // {
    //   name: "邮件营销",
    //   type: "bar",
    //   stack: "广告",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [120, 132, 101, 134, 90, 230, 210],
    // },
    // {
    //   name: "联盟广告",
    //   type: "bar",
    //   stack: "广告",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [220, 182, 191, 234, 290, 330, 310],
    // },
    // {
    //   name: "视频广告",
    //   type: "bar",
    //   stack: "广告",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [150, 232, 201, 154, 190, 330, 410],
    // },
    // {
    //   name: "搜索引擎",
    //   type: "bar",
    //   data: [862, 1018, 964, 1026, 1679, 1600, 1570],
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   markLine: {
    //     lineStyle: {
    //       type: "dashed",
    //     },
    //     data: [[{ type: "min" }, { type: "max" }]],
    //   },
    // },
    // {
    //   name: "百度",
    //   type: "bar",
    //   barWidth: 5,
    //   stack: "搜索引擎",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [620, 732, 701, 734, 1090, 1130, 1120],
    // },
    // {
    //   name: "谷歌",
    //   type: "bar",
    //   stack: "搜索引擎",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [120, 132, 101, 134, 290, 230, 220],
    // },
    // {
    //   name: "必应",
    //   type: "bar",
    //   stack: "搜索引擎",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [60, 72, 71, 74, 190, 130, 110],
    // },
    // {
    //   name: "其他",
    //   type: "bar",
    //   stack: "搜索引擎",
    //   // emphasis: {
    //   //     focus: 'series'
    //   // },
    //   data: [62, 82, 91, 84, 109, 110, 120],
    // },
    // ],
    series,
  };

  return (
    <ChartBox
      {...restProps}
      option={option ? merge(opt, option) : opt}
      theme={theme}
    />
  );
};
