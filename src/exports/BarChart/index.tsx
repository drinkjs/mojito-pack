import * as React from "react";
import {merge} from 'lodash';
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
    xAxis: {
      type: "category",
      data: _data.map((v) => v.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: _data.map((v) => v.value),
        type: "bar",
      },
    ],
  }
  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
