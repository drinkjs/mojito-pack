import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
  itemSize?:number;
  itemColor?:string
}

export default (props: Props) => {
  const { data, option, itemSize, itemColor, ...restProps } = props;

  const opt = {
    tooltip: {
      trigger: "item",
      formatter: "{c}"
    },
    // legend: {
    //   // orient: 'vertical',
    //   // top: 'middle',
    //   bottom: 10,
    //   left: "center",
    //   data: _data.map(v => v.name),
    // },
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: itemSize || 10,
        data,
        itemStyle:{
          color: itemColor || undefined
        },
        type: "scatter",
      },
    ],
    ...option,
  };

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
