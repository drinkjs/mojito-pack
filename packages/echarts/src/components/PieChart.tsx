import ChartContainer, { ChartProps } from "../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";

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
          radius: "85%",
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
		if(option){
			return merge(opt, option);
		}
		return opt;
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	PieChart,
	{
		name: "基础散点图",
		props: {
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