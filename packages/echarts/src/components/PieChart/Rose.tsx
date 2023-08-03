import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";
import cover from "./pie-roseType-simple.webp"

type RoseData = {
	name: string;
	value: number;
};

interface RoseProps extends ChartProps<RoseData[]> {
  radius?:Array<string | number>
}

function PieChart({
	data = [],
  radius,
	option = {},
	...restProps
}: RoseProps) {
	const opts = useMemo(() => {
		const opt = {
      backgroundColor:"transparent",
      series: [
        {
          type: 'pie',
          radius,
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data
        }
      ]
    };
		return merge(opt, option);
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	PieChart,
	{
		name: "南丁格尔玫瑰图",
    category:"饼图",
    cover,
		props: {
      radius:{
        name:"半径",
        default:["30%","100%"],
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