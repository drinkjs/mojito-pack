import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { MojitoComponentProps } from "@mojito/react-pack/dist";
import styles from "./index.module.css";
export interface ChartProps<T=any> extends MojitoComponentProps {
  option?: echarts.EChartsCoreOption;
	style?: React.CSSProperties;
  className?:string,
  theme?:string,
  data?:T
} 

export default function ChartContainer({option, style, className, theme, __style, ...restProps}: ChartProps) {
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
  }, [style, __style?.width, __style?.height, className])

	return <div {...restProps} className={`${styles.root} ${className}`} style={{...style}} ref={container} />;
}
