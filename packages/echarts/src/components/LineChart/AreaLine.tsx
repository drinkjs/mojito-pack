import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import cover from "./area-basic.webp"

type AreaLineData = {
	name: string;
	value: number;
};

interface AreaLineProps extends ChartProps<AreaLineData[]> {
	smooth?: boolean;
}

function AreaLine({
	data = [],
	smooth,
	option,
	...restProps
}: AreaLineProps) {
	const opts = useMemo(() => {
		const opt = {
      backgroundColor:"transparent",
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth,
          areaStyle: {}
        }
      ]
    };
		return merge(opt, option);
	}, [data, smooth, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	AreaLine,
	{
		name: "基础面积图",
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
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
);