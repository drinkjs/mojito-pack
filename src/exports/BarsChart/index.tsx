import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  data: { category: string; value: number }[];
  color?: string;
}

interface BarsProps extends ChartBoxProps {
  data: ChartData[];
}

export default (props: BarsProps) => {
  const { option, data, theme, ...restProps } = props;
  const _data = data || [];

  const legend: string[] = [];
  const series: any = [];
  let xData: string[] = [];

  // 图例
  _data.forEach((v, index) => {
    legend.push(v.name);
    series.push({
      name: v.name,
      type: "bar",
      data: v.data.map((v) => v.value),
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
      axisLabel: {
        formatter: "{value}",
      },
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
