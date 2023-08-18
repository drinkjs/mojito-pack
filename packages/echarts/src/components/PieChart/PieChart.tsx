import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import cover from "./pie-simple.webp"

type PieChartData = {
	name: string;
	value: number;
};

interface PieCharProps extends ChartProps<PieChartData[]> {
  radius?:string | number
}

function PieChart({
	data = [],
  radius,
	option,
	...restProps
}: PieCharProps) {
	const opts = useMemo(() => {
		const opt = {
      backgroundColor:"transparent",
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   // orient: 'vertical',
      //   // top: 'middle',
      //   bottom: 10,
      //   left: "center",
      //   data: _data.map(v => v.name),
      // },
      series: [
        {
          type: "pie",
          radius,
          center: ["50%", "50%"],
          selectedMode: "single",
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }
		return merge(opt, option);
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	PieChart,
	{
		name: "基础饼图",
    category:"饼图",
    cover,
		props: {
      radius:{
        name:"半径",
        default:"80%",
        type:"string"
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