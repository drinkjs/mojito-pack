import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-y-category.webp"


type MultipleBarData = {
  category: string[]
  values: Array<{
    name: string,
    data: number[]
  }>
};

interface MultipleBarProps extends ChartProps<MultipleBarData> {

}

function MultipleBarY({
  data,
  option,
  ...restProps
}: MultipleBarProps) {
  const opts = useMemo(() => {
    const opt = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
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
      yAxis: {
        type: "category",
        data: data?.category,
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
      series: data?.values.map(({ name, data }) => ({ type: "bar", name, data })),
    };
    return merge(opt, option);
  }, [data, option]);

  return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(
  MultipleBarY,
  {
    name: "分类条形图",
    category: "柱状图",
    cover,
    props: {
      data: {
        name: "数据",
        description:
      `{
          category:string[],
          values: Array<{
            name:string,
            data:number[]
          }>
        }
        `,
        type: "object",
        default: {
          category: ['Brazil', 'Indonesia', 'USA', 'India', 'China'],
          values: [
            {
              name: '2011',
              data: [18203, 23489, 29034, 104970, 131744]
            },
            {
              name: '2012',
              data: [19325, 23438, 31000, 121594, 134141]
            },
          ]
        },
      },
      options: {
        name: "配置",
        type: "object",
        description: "Echarts配置，具体参考echarts官网"
      },
    },
  }
)