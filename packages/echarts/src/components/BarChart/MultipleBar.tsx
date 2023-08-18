import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@drinkjs/mojito-react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-label-rotation.webp";

type MultipleBarData = Array<{
	name: string;
	data: number[];
}>;

interface MultipleBarProps extends ChartProps<MultipleBarData> {
	category: string[];
}

function MultipleBar({ data, option, category, ...restProps }: MultipleBarProps) {
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
			series: data?.map(({ name, data }) => ({
				type: "bar",
				name,
				data,
			})),
		};
		return merge(opt, option);
	}, [data, option, category]);

	return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(MultipleBar, {
	name: "分类柱状图",
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
