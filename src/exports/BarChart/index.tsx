import * as React from "react";
import * as echarts from "echarts";
import {merge} from 'lodash';
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
  linearGradient?:string[]
}

export default (props: Props) => {
  const { data, option, linearGradient=["#ff0000", "#330000"],  ...restProps } = props;
  const _data = data || [];
  const opt = {
    xAxis: {
      type: "category",
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
        type: "bar",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0, color: linearGradient[0]},
                  {offset: 1, color: linearGradient[1]}
              ]
          )
        },
      },
    ],
  }
  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
