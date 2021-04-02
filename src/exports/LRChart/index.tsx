import * as React from "react";
import { merge } from "lodash";
import * as echarts from "echarts";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

const ecStat = require("echarts-stat");

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
}

echarts.registerTransform(ecStat.transform.regression);

export default (props: Props) => {
  const { data, option, ...restProps } = props;

  const opt = {
    dataset: [
      {
        source: data,
      },
      {
        transform: {
          type: "ecStat:regression",
          // 'linear' by default.
          // config: { method: 'linear', formulaOn: 'end'}
        },
      },
    ],
    // title: {
    //   text: "Linear Regression",
    //   subtext: "By ecStat.regression",
    //   sublink: "https://github.com/ecomfe/echarts-stat",
    //   left: "center",
    // },
    legend: {
      bottom: 5,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "scatter",
        type: "scatter",
      },
      {
        name: "line",
        type: "line",
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: "circle",
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 },
      },
    ],
  };

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
