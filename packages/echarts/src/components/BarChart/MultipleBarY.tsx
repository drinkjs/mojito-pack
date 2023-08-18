import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-y-category.webp";

type MultipleBarData = Array<{
	name: string;
	color?: string;
	data: number[];
}>;

interface MultipleBarProps extends ChartProps<MultipleBarData> {
	category: string[];
}

function MultipleBarY({
	data,
	category,
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
				data: [...category].reverse(),
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
			series: data?.map(({ name, data, color }) => ({
				type: "bar",
				name,
				data,
				itemStyle: {
					color,
				},
			})),
		};
		return merge(opt, option);
	}, [data, option, category]);

	return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(MultipleBarY, {
	name: "分类条形图",
	category: "柱状图",
	cover,
	props: {
		category: {
			name: "分类",
			type: "array",
			default: ["Brazil", "Indonesia", "USA", "India", "China"],
		},
		data: {
			name: "数据",
			description: "Array<{ name:string, data:number[], color?:string }>",
			type: "array",
			default: [
				{
					name: "2011",
					data: [18203, 23489, 29034, 104970, 131744],
				},
				{
					name: "2012",
					data: [19325, 23438, 31000, 121594, 134141],
				},
			],
		},
		options: {
			name: "配置",
			type: "object",
			description: "Echarts配置，具体参考echarts官网",
		},
	},
});
