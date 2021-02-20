import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
}

export default (props: Props) => {
  const { data, option, ...restProps } = props;
  const _data = data || [];
  const opt = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: _data.map(v => v.name),
    },
    series: [
      {
        type: "bar",
        data: _data.map(v => v.value),
      },
    ],
  };
  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
