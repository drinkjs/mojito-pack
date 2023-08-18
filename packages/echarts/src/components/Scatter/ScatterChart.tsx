import ChartContainer, { ChartProps } from "../../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@drinkjs/mojito-react-pack";
import cover from "./scatter-simple.webp"

interface ScatterChartProps extends ChartProps<[number, number][]> {
  symbolSize?:number
}

function ScatterChart({
	data = [],
  symbolSize,
	option,
	...restProps
}: ScatterChartProps) {
	const opts = useMemo(() => {
		const opt = {
      backgroundColor:"transparent",
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize,
          data,
          type: 'scatter'
        }
      ]
    };
		return merge(opt, option);
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	ScatterChart,
	{
		name: "基础散点图",
    category:"散点图",
    cover,
		props: {
			data:{
				name: "数据",
				description: '图表数据[[number, number]]',
				type: "array",
				default: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
			},
      symbolSize: {
        name:"点大小",
        type:"number",
        default: 10,
      },
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
);