import * as React from "react";
import {merge} from 'lodash';
import ChartBox, {ChartBoxProps} from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
  radius?: []
}

const defaultData = [
  {
    name: "Mon",
    value: 120,
  },
  {
    name: "Tue",
    value: 200,
  },
  {
    name: "Wed",
    value: 150,
  },
  {
    name: "Thu",
    value: 80,
  },
  {
    name: "Fri",
    value: 70,
  },
  {
    name: "Sat",
    value: 110,
  },
  {
    name: "Sun",
    value: 130,
  },
];

export default (props: Props) => {
  const { option, data, radius=["70%","90%"], ...restProps } = props;
  const _data = data || defaultData;

  const opt = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    series: [
      {
        type: "pie",
        radius,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: _data,
      },
    ],
  };

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
