import ChartContainer, { ChartProps } from "../common/ChartContainer";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { CreatePack } from "@mojito/react-pack";

type ScatterChartData = {
	name: string;
	value: number;
};

interface ScatterChartProps extends ChartProps<ScatterChartData[]> {

}

function ScatterChart({
	data = [],
	option,
	...restProps
}: ScatterChartProps) {
	const opts = useMemo(() => {
		const opt = {
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
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
          type: 'scatter'
        }
      ]
    };
		if(option){
			return merge(opt, option);
		}
		return opt;
	}, [data, option]);

	return <ChartContainer {...restProps} option={opts} />;
}


export default CreatePack(
	ScatterChart,
	{
		name: "基础散点图",
		props: {
			data:{
				name: "数据",
				description: '图表数据[{name:"类型", value:100}, ...]',
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
      options:{
				name: "配置",
				type: "object",
        description:"Echarts配置，具体参考echarts官网"
			},
		},
	}
);