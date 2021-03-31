import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  type: string;
  value: number[];
  color?: string;
}

interface LinesProps extends ChartBoxProps {
  data: ChartData[];
  xData: string[];
}

export default (props: LinesProps) => {
  const { option, data, xData, theme, ...restProps } = props;
  const _data = data || [];

  const legend: string[] = [];
  const series: any = [];

  // 图例
  _data.forEach((v) => {
    legend.push(v.type);
    series.push({
      name: v.type,
      type: "bar",
      data: v.value,
      itemStyle: {
        color: v.color,
      },
    });
  });

  const opt = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: legend, // ["分类1", "分类2", "分类3"],
      textStyle: {
        color:
          theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
      },
      icon: "rect",
    },
    xAxis: {
      type: "category",
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
