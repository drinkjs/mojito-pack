import * as React from "react";
import * as echarts from "echarts";
import { merge } from "lodash";
import { Skeleton } from "antd";
import ChartBox, { ChartBoxProps } from "../../components/ChartBox";

interface ChartData {
  name: string;
  data: { category: string; value: number }[];
}

interface ItemColor {
  [category: string]: string;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
  dataloading?: boolean;
  itemColors?: ItemColor;
}

export default (props: Props) => {
  const { data, option, itemColors, dataloading, ...restProps } = props;
  const _data = [...data] || [];
  _data.reverse();

  const legend: string[] = [];
  const series: any = [];
  let categoryData: string[] = [];
  const seriesObj = {};

  // 图例
  _data.forEach((v, index) => {
    categoryData.push(v.name);
    v.data.forEach((v2) => {
      if (!seriesObj[v2.category]) {
        seriesObj[v2.category] = {
          name: v2.category,
          type: "bar",
          data: [v2.value],
          itemStyle: {
            color: itemColors ? itemColors[v2.category] : undefined,
          },
        };
      } else {
        seriesObj[v2.category].data.push(v2.value);
      }
    });
  });

  Object.keys(seriesObj).forEach((key) => {
    series.push(seriesObj[key]);
  });

  const opt = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {
    //     data: ['确诊', '康复', '死亡'],
    // },
    grid: {
      left: "1%",
      right: "1%",
      bottom: "1%",
      top: "1%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: categoryData,
      // axisLabel: {
      //   color: "#ffffff",
      // },
    },
    series,
  };
  return (
    <Skeleton active loading={dataloading}>
      <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />
    </Skeleton>
  );
};
