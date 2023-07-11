import { merge } from "lodash-es";
import { useMemo } from "react";
import * as echarts from "echarts";
import { CreatePack } from "@mojito/react-pack";
import ChartContainer, { ChartProps } from "../common/ChartContainer";

type BarChartData = {
	name: string;
	value: number;
};

interface BarChartProps extends ChartProps<BarChartData[]> {
	itemColors?: string[];
}

function BarChart({
	data = [],
	itemColors = ["#2378f7", "#83bff6"],
	option,
	...restProps
}: BarChartProps) {
	const opts = useMemo(() => {
		const opt = {
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
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: itemColors[0] },
							{ offset: 1, color: itemColors[1] },
						]),
					},
				},
			],
		};
		if(option){
			return merge(opt, option);
		}
		return opt;
	}, [data, itemColors, option]);

	return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(
	BarChart,
	{
		name: "基础柱状图",
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
			itemColors:{
				name: "柱体颜色",
				type: "array",
				default: ["#2378f7", "#83bff6"],
			},
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
)