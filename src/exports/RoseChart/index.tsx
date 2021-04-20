import * as React from "react";
import { merge } from "lodash";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
  radius?: []
}

export default (props: Props) => {
  const { data, option, radius=["25%","90%"], ...restProps } = props;
  const _data = data || [];

  const opt = {
    tooltip: {
      trigger: "item",
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
        roseType: "radius",
        radius,
        center: ["50%", "50%"],
        selectedMode: "single",
        data: _data,
        labelLine: {
          show: false
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
