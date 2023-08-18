import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@drinkjs/mojito-react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-simple.webp"
import echarts from "echarts";

type BarChartData = {
	name: string;
	value: number;
};

interface BarChartProps extends ChartProps<BarChartData[]> {
	colors?:string[] 
}

function BarChart({
	data = [],
	colors,
	option,
	...restProps
}: BarChartProps) {
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
				type: "category",
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
					type: "bar",
					itemStyle: {
						color: colors ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: colors[0] },
							{ offset: 1, color: colors[1] }
						]) : undefined
					},
				},
			],
		};
		return merge(opt, option);
	}, [data, option, colors]);

	return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(
	BarChart,
	{
		name: "基本柱状图",
		category: "柱状图", 
		cover,
		props: {
			colors: {
				name:"颜色",
				type:"array",
			},
			data: {
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
			options: {
				name: "配置",
				type: "object",
				description: "Echarts配置，具体参考echarts官网"
			},
		},
	}
)