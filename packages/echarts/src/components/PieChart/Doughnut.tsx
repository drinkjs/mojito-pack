import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import cover from "./pie-doughnut.webp"

type DoughnutData = {
	name: string;
	value: number;
};

interface DoughnutProps extends ChartProps<DoughnutData[]> {
  radius?:Array<string | number>
}

function PieChart({
	data = [],
  radius,
	option = {},
	...restProps
}: DoughnutProps) {
	const opts = useMemo(() => {
		const opt = {
      backgroundColor:"transparent",
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          data
        }
      ]
    }
		return merge(opt, option);
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	PieChart,
	{
		name: "环形图",
    category:"饼图",
    cover,
		props: {
      radius:{
        name:"半径",
        default:["50%","80%"],
        type:"array"
      },
			data:{
				name: "数据",
				description: '图表数据[{name:"类型", value:100}, ...]',
				type: "array",
				default: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
			},
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
);