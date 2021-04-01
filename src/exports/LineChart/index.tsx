import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface LineChartProps extends ChartBoxProps {
  data: ChartData[];
  smooth: boolean;
  itemColor?: string;
}

export default (props: LineChartProps) => {
  const { option, data, smooth, itemColor, ...restProps } = props;
  const _data = data || [];

  const opt = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: _data.map((v) => v.name),
    },
    yAxis: {
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
    series: [
      {
        data: _data.map((v) => v.value),
        type: "line",
        smooth,
        itemStyle: {
          color: itemColor || undefined,
        },
      },
    ],
  };

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
