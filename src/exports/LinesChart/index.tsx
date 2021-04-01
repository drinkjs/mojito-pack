import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  data: { category: string; value: number }[];
  color?: string;
}

interface LinesProps extends ChartBoxProps {
  data: ChartData[];
  smooth: boolean;
}

export default (props: LinesProps) => {
  const { option, data, smooth, theme, ...restProps } = props;
  const _data = data || [];

  const legend: string[] = []; 
  const series: any = [];
  let xData: string[] = [];

  // 图例
  _data.forEach((v, index) => {
    legend.push(v.name);
    series.push({
      name: v.name,
      type: "line",
      data: v.data.map((v) => v.value),
      smooth,
      itemStyle: {
        color: v.color,
      },
    });
    if (index === 0) {
      xData = v.data.map((v) => v.category);
    }
  });

  const opt = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legend, // ["分类1", "分类2", "分类3"],
      icon: "rect",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xData, // ["2/15", "2/16", "2/17", "2/18", "2/19", "2/20", "2/21"],
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: "{value}",
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
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
