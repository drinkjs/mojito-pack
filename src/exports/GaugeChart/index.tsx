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
      formatter: "{a} <br/>{b} : {c}%",
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "业务指标",
        type: "gauge",
        detail: { formatter: "{value}%" },
        data: _data,
      },
    ],
  };
  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
