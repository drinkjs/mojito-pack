import { merge } from "lodash-es";
import { useMemo } from "react";
import * as echarts from "echarts";
import { CreatePack } from "@mojito/react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-stack.webp"

type StackBarData = {
  category: string[]
  values: Array<{
    stack:string,
    name: string,
    data: number[]
  }>
};

interface StackBarProps extends ChartProps<StackBarData> {

}

function MultipleBar({
  data,
  option,
  ...restProps
}: StackBarProps) {
  const opts = useMemo(() => {
    const opt = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      // legend: {},
      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      //   containLabel: true
      // },
      xAxis: [
        {
          type: 'category',
          data: data?.category
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
      ],
      series: data?.values.map(({stack, name, data}) => ({
        type: 'bar',
        emphasis: {
          focus: "series"
        },
        stack,
        name,
        data
      }))
    };
    return merge(opt, option);
  }, [data, option]);

  return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(
  MultipleBar,
  {
    name: "堆叠柱状图",
    category: "柱状图",
    cover,
    props: {
      data: {
        name: "数据",
        description:
      `{
          category:string[],
          values: Array<{
            stack:string,
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
              stack:"1",
              data: [18203, 23489, 29034, 104970, 131744]
            },
            {
              stack:"1",
              name: '2012',
              data: [19325, 23438, 31000, 121594, 134141]
            },
            {
              name: 'xxx',
              stack:"2",
              data: [18203, 23489, 29034, 104970, 131744]
            },
            {
              stack:"2",
              name: 'yyy',
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