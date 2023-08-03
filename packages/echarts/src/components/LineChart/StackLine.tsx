import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import cover from "./line-stack.webp"

type StackLineData = {
	category: string[]
  values: Array<{
    stack:string,
    name: string,
    data: number[]
  }>
};

interface StackLineProps extends ChartProps<StackLineData> {
	smooth?: boolean;
}

function AreaLine({
	data,
	smooth,
	option,
	...restProps
}: StackLineProps) {
	const opts = useMemo(() => {
		const opt = {
      backgroundColor:"transparent",
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      // },
      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '3%',
      //   containLabel: true
      // },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data?.category
      },
      yAxis: {
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
      },
      series: data?.values?.map(({stack, name, data}) => ({
        type: 'line',
        stack,
        name,
        smooth,
        data
      }))
    };
		return merge(opt, option);
	}, [data, smooth, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	AreaLine,
	{
		name: "堆叠折线图",
		category:"折线图",
    cover,
		props: {
			data:{
				name: "数据",
				description:
      `{
          category:string[],
          values: Array<{
            stack:string,
            name:string,
            data:number[]
          }>
        }`,
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
			smooth:{
				name: "平滑",
				type:"boolean",
			},
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
);