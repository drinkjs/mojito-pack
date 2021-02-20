import * as React from "react";
import * as echarts from "echarts";

const { useState, useRef, useEffect } = React;

export interface ChartBoxProps {
  option?: any;
  onCreated?: (echar: echarts.ECharts) => void;
  styles?:React.CSSProperties
  className?:string
}

export default ({ option, onCreated, styles, ...restProps }: ChartBoxProps) => {
  const [chart, setChart] = useState<echarts.ECharts>();
  const targetRef = useRef();

  useEffect(() => {
    const myChart = echarts.init(targetRef.current);
    myChart.setOption(option);
    setChart(myChart);
    if (onCreated) {
      onCreated(myChart);
    }
    return () => {
      if(myChart){
        myChart.clear();
        myChart.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (chart) chart.setOption(option);
  }, [option, chart]);

  useEffect(() => {
    if (chart) chart.resize();
  }, [chart, styles]);

  return (
    <div ref={targetRef} {...restProps} style={{width:"100%",height:"100%", ...styles}} ></div>
  );
};
