import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@drinkjs/mojito-react-pack";
import cover from "./line-simple.webp"

type LineChartData = {
	name: string;
	value: number;
};

interface LinehartProps extends ChartProps<LineChartData[]> {
	smooth?: boolean;
  itemColor?: string;
}

function LineChart({
	data = [],
	smooth,
	itemColor,
	option,
	...restProps
}: LinehartProps) {
	const opts = useMemo(() => {
		const opt = {
			backgroundColor:"transparent",
			tooltip: {
				trigger: "axis",
			},
			xAxis: {
				type: "category",
				boundaryGap: false,
				data: data.map((v) => v.name),
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
			series: [
				{
					data: data.map((v) => v.value),
					type: "line",
					smooth,
					itemStyle: {
						color: itemColor || undefined,
					},
				},
			],
		};
		return merge(opt, option);
	}, [data, smooth, itemColor, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	LineChart,
	{
		name: "基础折线图",
		category:"折线图",
		cover,
		props: {
			data:{
				name: "数据",
				description: '图表数据[{name:"类型", value:100}, ...]',
				type: "array",
				default: [
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
				],
			},
			smooth:{
				name: "平滑",
				type:"boolean",
			},
			itemColor:{
				name: "线段颜色",
				type:"string",
			},
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
);