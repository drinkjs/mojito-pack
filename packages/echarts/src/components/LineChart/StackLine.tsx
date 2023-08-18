import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@drinkjs/mojito-react-pack";
import cover from "./line-stack.webp";

type StackLineData = Array<{
	stack: string;
	name: string;
	data: number[];
  color?:string
}>;

interface StackLineProps extends ChartProps<StackLineData> {
	smooth?: boolean;
	category: string[];
}

function AreaLine({ data, smooth, option, category, ...restProps }: StackLineProps) {
	const opts = useMemo(() => {
		const opt = {
			backgroundColor: "transparent",
			tooltip: {
				trigger: "axis",
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
				type: "category",
				boundaryGap: false,
				data: category,
			},
			yAxis: {
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
			series: data?.map(({ stack, name, data, color }) => ({
				type: "line",
				stack,
				name,
				smooth,
				data,
        itemStyle:{
          color
        }
			})),
		};
		return merge(opt, option);
	}, [data, smooth, option, category]);

	return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(AreaLine, {
	name: "堆叠折线图",
	category: "折线图",
	cover,
	props: {
    category: {
			name: "分类",
			type: "array",
			default: ["Brazil", "Indonesia", "USA", "India", "China"],
		},
		data: {
			name: "数据",
			description: `Array<{ stack:string, name:string, data:number[] }>`,
			type: "array",
			default: [
					{
						stack: "stack1",
            name: "2020",
						data: [11203, 20489, 20034, 14970, 11744],
            color:"#ff11ff"
					},
					{
						stack: "stack1",
						name: "2021",
						data: [19325, 23438, 31000, 121594, 134141],
					},
					{
						name: "2022",
						stack: "stack2",
						data: [18203, 23489, 29034, 104970, 131744],
					},
					{
            name: "2023",
						stack: "stack2",
						data: [19325, 23438, 31000, 121594, 134141],
					},
				],
		},
		smooth: {
			name: "平滑",
			type: "boolean",
		},
		options: {
			name: "配置",
			type: "object",
			description: "Echarts配置，具体参考echarts官网",
		},
	},
});
