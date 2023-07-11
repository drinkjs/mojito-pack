import { useRef, useEffect } from "react";
import * as echarts from "echarts";

export interface ChartProps<T=any>{
  option?: echarts.EChartsCoreOption;
	style?: React.CSSProperties;
  className?:string,
  theme?:string,
  data?:T
}

export default function ChartContainer({option, style, className, theme, ...restProps}: ChartProps) {
	const container = useRef<HTMLDivElement | null>(null);
  const chart = useRef<echarts.ECharts | null>(null);

	useEffect(() => {
		if (container.current) {
			chart.current = echarts.init(container.current, theme || "dark");
      option && chart.current.setOption(option);
		}
	}, []);

  useEffect(()=>{
    option && chart.current?.setOption(option);
  }, [option]);

  useEffect(()=>{
    chart.current?.resize();
  }, [style, className])

	return <div {...restProps} className={className} style={{width:"100%", height:"100%", ...style}} ref={container}></div>;
}
