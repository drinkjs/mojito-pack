import * as React from "react";
import {merge} from 'lodash';
import ChartBox, {ChartBoxProps} from "../../components/ChartBox";

interface ChartData {
  name: string,
  value: number,
}

interface Props extends ChartBoxProps{
  data: ChartData[]
}

export default (props: Props) => {
  const { data, option, ...restProps } = props;
  const _data = data || [];

  const opt = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    // legend: {
    //   // orient: 'vertical',
    //   // top: 'middle',
    //   bottom: 10,
    //   left: "center",
    //   data: _data.map(v => v.name),
    // },
    series: [
      {
        type: "pie",
        radius: "90%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: _data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
    ...option,
  }

  return (
    <ChartBox
      {...restProps}
      option={option ? merge(opt, option) : opt}
    />
  );
};