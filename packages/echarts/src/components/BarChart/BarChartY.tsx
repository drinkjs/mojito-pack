import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@drinkjs/mojito-react-pack";
import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import cover from "./bar-negative2.webp"

type BarChartY = {
	name: string;
	value: number;
};

interface BarChartYProps extends ChartProps<BarChartY[]> {}

function BarChartYProps({
	data = [],
	option,
	...restProps
}: BarChartYProps) {
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
      yAxis: {
        type: 'category',
        data: data.map((v) => v.name),
				axisLine: {
					show: true,
				},
				axisTick: {
					show: true,
				},
      },
      series: [
        {
          type: 'bar',
          data: data.map((v) => v.value)
        },
      ]
    };
		return merge(opt, option);
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}

export default CreatePack(
	BarChartYProps,
	{
		name: "基础条形图",
		category: "柱状图", 
		cover,
		props: {
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