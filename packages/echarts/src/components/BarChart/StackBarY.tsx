import { merge } from "lodash-es";
import { useMemo } from "react";
import * as echarts from "echarts";
import { CreatePack } from "@mojito/react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-y-category-stack.webp"


type StackBarYData = {
  category: string[]
  values: Array<{
    stack:string,
    name: string,
    data: number[]
  }>
};

interface StackBarYProps extends ChartProps<StackBarYData> {

}

function MultipleBar({
  data,
  option,
  ...restProps
}: StackBarYProps) {
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
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: data?.category,
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
    name: "堆叠条形图",
    category: "柱状图",
    cover,
    props: {
      data: {
        name: "数据",
        description:`{
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