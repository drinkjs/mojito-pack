import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  type: string;
  value: number[];
  color?: string;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
  xAxisData: string[];
}

export default (props: Props) => {
  const { option, data, xAxisData, ...restProps } = props;
  const _data = data || [];

  const legend: string[] = [];
  const series:any = [];

  // 图例
  _data.forEach((v) => {
    legend.push(v.type);
    series.push({
      name: v.type,
      type: "line",
      data: v.value,
      smooth: true,
      itemStyle: {
        color: v.color,
      },
    });
  });

  const opt = {
    title: {
      text: "过去7天全球趋势",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legend, // ["新增", "死亡", "康复"],
      textStyle: {
        color: "#fff",
      },
      icon: "rect",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData, // ["2/15", "2/16", "2/17", "2/18", "2/19", "2/20", "2/21"],
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.5)",
        },
      },
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
        lineStyle: {
          color: "rgba(255,255,255,0.5)",
        },
      },
      axisTick: {
        show: true,
      },
    },
    series,
  };

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
